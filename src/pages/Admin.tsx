import { Search, Filter, Edit2, CloudUpload } from "lucide-react";
import { PROPERTIES } from "../data";

export default function AdminPage() {
  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Propiedades</h1>
          <p className="text-secondary">Gestiona y realiza el seguimiento de tus listados inmobiliarios activos.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all w-full md:w-64 shadow-sm" 
              placeholder="Buscar..." 
            />
          </div>
          <button className="px-4 py-2 border border-slate-200 bg-white text-secondary rounded-lg font-bold text-sm hover:bg-slate-50 flex items-center shadow-sm">
            <Filter className="w-4 h-4 mr-2" /> Filtros
          </button>
        </div>
      </header>

      {/* Stats Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-wider">Propiedad</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PROPERTIES.slice(0, 3).map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-4">
                      <img src={prop.images[0]} className="w-16 h-12 rounded-lg object-cover shadow-sm" alt="" />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{prop.title}</p>
                        <p className="text-[10px] text-secondary font-medium">Hace 2 días</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-secondary text-xs font-medium">
                    {prop.city}, {prop.state}
                  </td>
                  <td className="px-6 py-5 font-bold text-primary text-sm">
                    ${prop.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100 uppercase">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 flex justify-between items-center text-xs font-bold text-secondary border-t border-slate-200">
          <p>Mostrando 3 de 42 propiedades</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Add Form */}
      <section className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-primary mb-2">Detalles del Listado</h3>
          <p className="text-secondary font-medium text-sm">Completa los detalles para agregar una nueva propiedad al marketplace.</p>
        </div>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-primary pl-1">Título de la Propiedad</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" placeholder="p. ej. Penthouse Moderno al Atardecer" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary pl-1">Precio ($)</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="0.00" type="number" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary pl-1">Ubicación</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Ciudad, Estado" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-primary pl-1">Descripción</label>
              <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px]" placeholder="Describe las características clave..." />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-primary pl-1">Imagen de la Propiedad</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group">
                <CloudUpload className="w-12 h-12 text-slate-300 group-hover:text-primary transition-colors mb-4" />
                <p className="text-sm font-bold text-secondary">Haz clic para subir o arrastra y suelta</p>
                <p className="text-xs text-slate-400 mt-1">PNG o JPG de alta resolución hasta 10MB</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex justify-end space-x-4">
            <button type="button" className="px-8 py-3 bg-white border border-slate-200 text-secondary font-bold text-sm rounded-xl hover:bg-slate-50 transition-all">Cancelar</button>
            <button type="submit" className="px-10 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-md hover:bg-primary-light active:scale-95 transition-all">Guardar Listado</button>
          </div>
        </form>
      </section>
    </div>
  );
}
