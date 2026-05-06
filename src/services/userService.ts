import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export const userService = {
  async createUserProfile(uid: string, data: { name: string, email: string, role: 'admin' | 'publicador' }) {
    try {
      await setDoc(doc(db, 'users', uid), {
        ...data,
        status: 'active',
        createdAt: serverTimestamp(),
      });
      
      // Default to Basic Plan for new Publicadores
      if (data.role === 'publicador') {
        await this.assignPlan(uid, 'plan_basico'); // Assuming this ID exists or will be created
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${uid}`);
    }
  },

  async getUser(uid: string) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      return snap.exists() ? snap.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    }
  },

  async getAllUsers() {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'users');
    }
  },

  async updateUserStatus(uid: string, status: 'active' | 'inactive') {
    try {
      await updateDoc(doc(db, 'users', uid), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
    }
  },

  async assignPlan(userId: string, planId: string) {
    try {
      await setDoc(doc(db, 'userPlans', userId), {
        userId,
        planId,
        active: true,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `userPlans/${userId}`);
    }
  },

  async getUserPlan(userId: string) {
    try {
      const snap = await getDoc(doc(db, 'userPlans', userId));
      if (snap.exists()) {
        const userPlan = snap.data();
        const planSnap = await getDoc(doc(db, 'plans', userPlan.planId));
        return { ...userPlan, plan: planSnap.exists() ? planSnap.data() : null };
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `userPlans/${userId}`);
    }
  },

  async getAllPlans() {
    try {
      const snapshot = await getDocs(collection(db, 'plans'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'plans');
    }
  }
};
