import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  type DocumentData,
  type Query
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Property } from '../types';

const COLLECTION = 'properties';

export const propertyService = {
  async getAll(filters?: { type?: string, city?: string, minPrice?: number, maxPrice?: number, sort?: string }) {
    try {
      let q: Query<DocumentData> = collection(db, COLLECTION);
      
      const constraints = [];
      if (filters?.type && filters.type !== 'Todos') {
        constraints.push(where('type', '==', filters.type));
      }
      if (filters?.city) {
        constraints.push(where('city', '==', filters.city));
      }
      if (filters?.minPrice !== undefined) {
        constraints.push(where('price', '>=', filters.minPrice));
      }
      if (filters?.maxPrice !== undefined) {
        constraints.push(where('price', '<=', filters.maxPrice));
      }

      if (filters?.sort === 'price_asc') {
        constraints.push(orderBy('price', 'asc'));
      } else if (filters?.sort === 'price_desc') {
        constraints.push(orderBy('price', 'desc'));
      } else {
        constraints.push(orderBy('createdAt', 'desc'));
      }

      q = query(collection(db, COLLECTION), ...constraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION);
    }
  },

  async getFeatured() {
    try {
      const q = query(collection(db, COLLECTION), where('isFeatured', '==', true), limit(6));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION);
    }
  },

  async getById(id: string) {
    try {
      const docRef = doc(db, COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Property;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${COLLECTION}/${id}`);
    }
  },

  async create(data: Partial<Property>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        isFeatured: data.isFeatured ?? false,
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION);
    }
  },

  async update(id: string, data: Partial<Property>) {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION}/${id}`);
    }
  },

  async delete(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION}/${id}`);
    }
  },

  async getByUserId(userId: string) {
    try {
      const q = query(collection(db, COLLECTION), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION);
    }
  }
};
