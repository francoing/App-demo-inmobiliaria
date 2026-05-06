import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const PROPERTIES = [
  {
    id: '1',
    title: 'The Glass Pavilion',
    price: 2450000,
    location: '88 Skyview Terrace, High Ridge Estates',
    city: 'Beverly Hills',
    state: 'CA',
    beds: 4,
    baths: 5,
    sqft: 3200,
    type: 'Villa',
    status: 'Nueva Propiedad',
    description: 'Situado en la cima del prestigioso High Ridge Estates, The Meridian Penthouse ofrece una experiencia de vida inigualable que combina la maestría arquitectónica con impresionantes vistas panorámicas del horizonte de la ciudad y la costa.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=600'
    ],
    highlights: ['Domótica (Savant)', 'Acceso por ascensor privado', 'Conserjería 24/7 y Seguridad', 'Bodega climatizada'],
    isFeatured: true,
    userId: 'system_admin'
  },
  {
    id: '2',
    title: 'Nordic Retreat',
    price: 12000,
    location: '123 Pine St',
    city: 'Seattle',
    state: 'WA',
    beds: 3,
    baths: 3,
    sqft: 2450,
    type: 'Casa',
    status: 'En Alquiler',
    description: 'Casa moderna ultra-minimalista con líneas blancas limpias y acabados de hormigón sobre un vibrante césped verde bajo luz brillante.',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'],
    highlights: ['Eco-friendly', 'Solar panels', 'Open concept'],
    isFeatured: true,
    userId: 'system_admin'
  }
];

const PLANS = [
  { id: 'plan_basico', name: 'Básico', maxProperties: 5, price: 0 },
  { id: 'plan_intermedio', name: 'Intermedio', maxProperties: 20, price: 15900 },
  { id: 'plan_avanzado', name: 'Avanzado', maxProperties: 999, price: 45900 }
];

export async function seed() {
  for (const prop of PROPERTIES) {
    const { id, ...data } = prop;
    await setDoc(doc(db, 'properties', id), { ...data, createdAt: serverTimestamp() });
  }
  for (const plan of PLANS) {
    const { id, ...data } = plan;
    await setDoc(doc(db, 'plans', id), { ...data });
  }
  console.log("Seeding complete");
}
