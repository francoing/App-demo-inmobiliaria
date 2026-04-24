import { Property, Agent } from './types';

export const PROPERTIES: Property[] = [
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
      'https://images.unsplash.com/photo-1600607687940-c52af096999a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600566753190-17f0bcd0a9d4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600566753086-00f18ca4750c?auto=format&fit=crop&q=80&w=600'
    ],
    highlights: ['Domótica (Savant)', 'Acceso por ascensor privado', 'Conserjería 24/7 y Seguridad', 'Bodega climatizada'],
    createdAt: '2024-04-22'
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
    createdAt: '2024-04-18'
  },
  {
    id: '3',
    title: 'Mountain Peak Estate',
    price: 4120000,
    location: '500 Alpine Way',
    city: 'Aspen',
    state: 'CO',
    beds: 6,
    baths: 6.5,
    sqft: 5800,
    type: 'Villa',
    status: 'Exclusivo',
    description: 'Impresionante mansión contemporánea con detalles en madera oscura y gran terraza con vistas a una cordillera panorámica durante el crepúsculo.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'],
    highlights: ['Mountain view', 'Private pool', 'Smart home'],
    createdAt: '2024-04-15'
  },
  {
    id: '4',
    title: 'Azure Vista Estate',
    price: 2890000,
    location: 'Bellevue Waterfront',
    city: 'Bellevue',
    state: 'WA',
    beds: 5,
    baths: 4,
    sqft: 4120,
    type: 'Villa',
    status: 'Nueva Propiedad',
    description: 'Contemporary mediterranean style villa with white walls and blue pool overlooking a valley during a bright sunny day.',
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200'],
    highlights: ['Waterfront', 'Private dock'],
    createdAt: '2024-04-20'
  }
];

export const AGENT: Agent = {
  name: 'Sarah Jenkins',
  role: 'Gerente Senior de Portafolio',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  responseTime: 'Suele responder en 30 minutos'
};
