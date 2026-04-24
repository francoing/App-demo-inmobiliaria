import { Search as SearchIcon, MapPin, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { PROPERTIES } from "../data";
import { PropertyCard } from "../components/PropertyCard";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function SearchPage() {
  const [activeType, setActiveType] = useState('Casa');

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex gap-12 py-12">
      {/* Sidebar Filters */}
      <aside className="w-72 flex-shrink-0 hidden lg:block">
        <div className="sticky top-28 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Filtros</h2>
            <div className="space-y-8">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary block">Ubicación</label>
                <div className="relative">
                  <input 
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" 
                    placeholder="Ciudad, C.P. o Barrio" 
                    type="text" 
                  />
                  <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
              </div>
              
              {/* Price */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-secondary block">Rango de Precio</label>
                <div className="flex gap-4 items-center">
                  <input className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" placeholder="Mín" type="text" />
                  <span className="text-slate-400">—</span>
                  <input className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" placeholder="Máx" type="text" />
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-secondary block">Tipo de Propiedad</label>
                <div className="space-y-3">
                  {['Casa', 'Apartamento', 'Condominio'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={activeType === type}
                        onChange={() => setActiveType(type)}
                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" 
                      />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary-light transition-all">
                Aplicar Filtros
              </button>
              <button className="w-full text-secondary text-sm font-semibold hover:text-primary transition-colors">
                Restablecer todo
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <section className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Propiedades Disponibles</h1>
            <p className="text-secondary mt-2">Mostrando 1.248 casas en Seattle, WA</p>
          </div>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-sm font-medium text-secondary">Ordenar por:</span>
            <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer p-0 pr-6">
              <option>Más recientes</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
          {/* Duplicate for demo */}
          {PROPERTIES.map((prop) => (
            <PropertyCard key={`${prop.id}-copy`} property={prop} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex justify-center items-center gap-2">
          <button className="p-2 rounded-lg text-secondary hover:bg-slate-100 transition-colors disabled:opacity-30" disabled>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm">1</button>
          <button className="w-10 h-10 rounded-lg text-secondary hover:bg-slate-100 font-bold text-sm transition-colors">2</button>
          <button className="w-10 h-10 rounded-lg text-secondary hover:bg-slate-100 font-bold text-sm transition-colors">3</button>
          <span className="px-2 text-secondary">...</span>
          <button className="w-10 h-10 rounded-lg text-secondary hover:bg-slate-100 font-bold text-sm transition-colors">42</button>
          <button className="p-2 rounded-lg text-secondary hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
