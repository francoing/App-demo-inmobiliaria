import { Property } from "./types";

export const PROPERTIES: Property[] = [
  {
    id: '1',
    userId: 'system_admin',
    title: 'The Glass Pavilion',
    price: 2450000,
    location: '88 Skyview Terrace, High Ridge Estates',
    city: 'Beverly Hills',
    state: 'CA',
    beds: 4,
    baths: 5,
    sqft: 3200,
    type: 'Villa',
    status: 'En Venta',
    description: 'The Glass Pavilion is a architectural masterpiece...',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'],
    highlights: ['Smart Home'],
    isFeatured: true,
    createdAt: new Date().toISOString()
  }
];

export const AGENT = {
  name: 'Sarah Jenkins',
  role: 'Gerente Senior de Portafolio',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  responseTime: 'Suele responder en 30 minutos'
};
