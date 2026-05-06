export interface Property {
  id: string;
  userId: string;
  title: string;
  price: number;
  location: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Casa' | 'Apartamento' | 'Condominio' | 'Villa';
  status: 'En Venta' | 'En Alquiler' | 'Vendido' | 'Inactivo';
  description: string;
  images: string[];
  highlights: string[];
  isFeatured: boolean;
  createdAt: any;
  updatedAt?: any;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'publicador';
  status: 'active' | 'inactive';
  planId: string;
  image?: string;
  createdAt: any;
}
