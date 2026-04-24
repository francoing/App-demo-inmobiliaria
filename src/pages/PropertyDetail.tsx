import { useParams } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, Warehouse, CheckCircle2, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { PROPERTIES, AGENT } from "../data";
import { cn } from "@/src/lib/utils";
import type { ReactNode } from "react";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      {/* Bento Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[400px] md:h-[600px] gap-4 rounded-2xl overflow-hidden mb-12">
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
          <img src={property.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
        </div>
        <div className="hidden md:block relative group overflow-hidden">
          <img src={property.images[1] || property.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Interior 1" />
        </div>
        <div className="hidden md:block relative group overflow-hidden">
          <img src={property.images[2] || property.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Interior 2" />
        </div>
        <div className="hidden md:block relative group overflow-hidden">
          <img src={property.images[3] || property.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Interior 3" />
        </div>
        <div className="hidden md:block relative group overflow-hidden">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 cursor-pointer hover:bg-black/50 transition-colors">
            <span className="text-white font-bold">+12 fotos</span>
          </div>
          <img src={property.images[0]} className="w-full h-full object-cover" alt="More" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header Info */}
          <div className="border-b border-slate-200 pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-blue-100 text-primary-light px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">LISTADO EXCLUSIVO</span>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">{property.status}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-2">{property.title}</h1>
                <div className="flex items-center text-secondary gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-1">Precio de Venta</div>
                <div className="text-4xl font-bold text-primary">${property.price.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBox icon={<Maximize className="w-8 h-8" />} value={property.sqft.toLocaleString()} label="m²" />
            <StatBox icon={<Bed className="w-8 h-8" />} value={property.beds.toString()} label="Habitaciones" />
            <StatBox icon={<Bath className="w-8 h-8" />} value={property.baths.toString()} label="Baños" />
            <StatBox icon={<Warehouse className="w-8 h-8" />} value="3" label="Estacionamiento" />
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Sobre esta Propiedad</h3>
            <div className="text-lg text-secondary leading-relaxed space-y-4">
              <p>{property.description}</p>
              <p>Diseñada por el renombrado arquitecto Marcus Sterling, esta residencia cuenta con espacios de vida de concepto abierto acentuados por techos de 4 metros y acabados artesanales curados.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              Leer más <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Highlights */}
          <div className="bg-slate-50 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-primary">Lo más destacado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {property.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/10" />
                  <span className="text-slate-700">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-primary">El Barrio</h3>
              <a href="#" className="text-primary font-bold hover:underline text-sm">Explorar Guía de la Zona</a>
            </div>
            <div className="h-[400px] bg-slate-200 rounded-2xl overflow-hidden relative border border-slate-200">
               <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Map Placeholder"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Contact Form */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 shadow-2xl p-8 space-y-8">
            <div className="flex items-center gap-4">
              <img src={AGENT.image} className="w-16 h-16 rounded-full object-cover" alt={AGENT.name} />
              <div>
                <h4 className="text-xl font-bold text-primary leading-tight">{AGENT.name}</h4>
                <p className="text-sm font-medium text-secondary">{AGENT.role}</p>
              </div>
            </div>
            
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary">Nombre Completo</label>
                <input className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="Tu nombre" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary">Correo Electrónico</label>
                <input className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="tu@email.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary">Mensaje</label>
                <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 min-h-[100px]" placeholder="Estoy interesado en..." />
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg active:scale-[0.98]">
                Agendar una Visita
              </button>
            </form>

            <div className="flex items-center gap-4 py-4 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-200 text-secondary font-bold text-sm hover:bg-slate-50 transition-colors">
                <Phone className="w-4 h-4" /> Llamar
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-200 text-secondary font-bold text-sm hover:bg-slate-50 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
            </div>
            
            <p className="text-center text-xs text-secondary italic">{AGENT.responseTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, value, label }: { icon: ReactNode, value: string, label: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
      <div className="text-primary mb-2">{icon}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-[10px] text-secondary uppercase font-bold tracking-tight">{label}</div>
    </div>
  );
}
