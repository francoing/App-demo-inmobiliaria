export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Casa' | 'Apartamento' | 'Condominio' | 'Villa';
  status: 'En Venta' | 'En Alquiler' | 'Exclusivo' | 'Nueva Propiedad';
  description: string;
  images: string[];
  highlights: string[];
  createdAt: string;
}

export interface Agent {
  name: string;
  role: string;
  image: string;
  responseTime: string;
}
