import { useEffect, useState, cloneElement, FormEvent } from "react";
import { Search, Filter, Edit2, CloudUpload, Trash2, Plus, Users, LayoutDashboard, MessageSquare, CreditCard, Loader2, CheckCircle, XCircle } from "lucide-react";
import { propertyService } from "../services/propertyService";
import { userService } from "../services/userService";
import { leadService } from "../services/leadService";
import { useAuth } from "../contexts/AuthContext";
import { Property } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function AdminPage() {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'properties' | 'leads' | 'users' | 'plans'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // Property Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    price: 0,
    location: "",
    city: "",
    type: "Casa",
    description: "",
    images: [""],
    beds: 0,
    baths: 0,
    sqft: 0,
    status: "En Venta"
  });

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user, role, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'properties') {
        const data = role === 'admin' 
          ? await propertyService.getAll() 
          : await propertyService.getByUserId(user!.uid);
        setProperties(data || []);
      } else if (activeTab === 'leads') {
        const data = role === 'admin'
          ? await leadService.getAll()
          : await leadService.getByPublisherId(user!.uid);
        setLeads(data || []);
      } else if (activeTab === 'users' && role === 'admin') {
        const data = await userService.getAllUsers();
        setUsers(data || []);
      } else if (activeTab === 'plans') {
        const data = await userService.getAllPlans();
        setPlans(data || []);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProperty = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await propertyService.create({ ...formData, userId: user.uid });
      setIsAdding(false);
      fetchData();
    } catch (error: any) {
      alert("Error al guardar: " + error.message);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta propiedad?")) {
      await propertyService.delete(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Panel de Control</h1>
          <p className="text-secondary font-medium">Bienvenido, {role === 'admin' ? 'Administrador' : 'Publicador'}.</p>
        </div>
        {!isAdding && activeTab === 'properties' && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" /> Nueva Propiedad
          </button>
        )}
      </header>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
        <TabButton icon={<LayoutDashboard />} label="Propiedades" active={activeTab === 'properties'} onClick={() => setActiveTab('properties')} />
        <TabButton icon={<MessageSquare />} label="Leads" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
        {role === 'admin' && (
          <>
            <TabButton icon={<Users />} label="Usuarios" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
            <TabButton icon={<CreditCard />} label="Planes" active={activeTab === 'plans'} onClick={() => setActiveTab('plans')} />
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl max-w-4xl mx-auto w-full"
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">Detalles del Listado</h3>
                <p className="text-secondary font-medium text-sm">Completa los detalles para agregar una nueva propiedad.</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-8 h-8" />
              </button>
            </div>
            
            <form className="space-y-8" onSubmit={handleSaveProperty}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-primary pl-1">Título de la Propiedad</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400" 
                    placeholder="p. ej. Penthouse Moderno al Atardecer" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-primary pl-1">Precio ($)</label>
                  <input 
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                    placeholder="0.00" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-primary pl-1">Ubicación (Dirección)</label>
                  <input 
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                    placeholder="Calle 123, Barrio X" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-primary pl-1">Ciudad</label>
                  <input 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                    placeholder="Ej: Seattle" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-primary pl-1">Tipo</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none"
                  >
                    <option>Casa</option>
                    <option>Apartamento</option>
                    <option>Condominio</option>
                    <option>Villa</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                   <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider pl-1">Habitaciones</label>
                    <input type="number" value={formData.beds} onChange={(e) => setFormData({...formData, beds: Number(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                   </div>
                   <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider pl-1">Baños</label>
                    <input type="number" value={formData.baths} onChange={(e) => setFormData({...formData, baths: Number(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                   </div>
                   <div className="space-y-2">
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider pl-1">Metros Cuadrados</label>
                    <input type="number" value={formData.sqft} onChange={(e) => setFormData({...formData, sqft: Number(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                   </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-primary pl-1">Descripción</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all min-h-[150px]" 
                    placeholder="Describe las características clave..." 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-primary pl-1">URL de Imagen (Demo)</label>
                  <input 
                    value={formData.images?.[0]}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>
              </div>
              <div className="pt-10 border-t border-slate-100 flex justify-end space-x-4">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)}
                  className="px-8 py-4 text-secondary font-bold text-sm rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-12 py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-light active:scale-95 transition-all"
                >
                  Publicar Listado
                </button>
              </div>
            </form>
          </motion.section>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
                <p className="text-secondary font-medium tracking-wide">Actualizando datos del sistema...</p>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-slate-50/50 border-b border-slate-200">
                      <tr>
                        {activeTab === 'properties' && (
                          <>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Propiedad</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Ubicación</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Precio</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Estado</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest text-right">Acciones</th>
                          </>
                        )}
                        {activeTab === 'leads' && (
                          <>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Prospecto</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Propiedad ID</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Mensaje</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Fecha</th>
                          </>
                        )}
                        {activeTab === 'users' && (
                          <>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Usuario</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Email</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Rol</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Estado</th>
                          </>
                        )}
                        {activeTab === 'plans' && (
                          <>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Nombre</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Límite</th>
                            <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-widest">Precio</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeTab === 'properties' && properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-5">
                              <img src={prop.images[0]} className="w-16 h-12 rounded-xl object-cover shadow-md" alt="" />
                              <div>
                                <p className="font-bold text-primary group-hover:text-primary-light transition-colors">{prop.title}</p>
                                <p className="text-[10px] text-secondary font-bold uppercase tracking-tight">{prop.type}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-secondary text-sm font-medium">
                            {prop.city || prop.location}
                          </td>
                          <td className="px-8 py-5 font-bold text-primary-light text-lg">
                            ${prop.price.toLocaleString()}
                          </td>
                          <td className="px-8 py-5">
                            <Badge status={prop.status} />
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2.5 text-slate-400 hover:text-primary-light hover:bg-primary/5 rounded-xl transition-all">
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProperty(prop.id)}
                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {activeTab === 'leads' && leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/50">
                          <td className="px-8 py-6">
                            <p className="font-bold text-primary">{lead.name}</p>
                            <p className="text-xs text-secondary">{lead.email}</p>
                          </td>
                          <td className="px-8 py-6 text-xs text-slate-500 font-mono">
                            {lead.propertyId}
                          </td>
                          <td className="px-8 py-6 text-sm text-secondary max-w-xs truncate">
                            {lead.message}
                          </td>
                          <td className="px-8 py-6 text-xs font-bold text-slate-400">
                             {lead.createdAt?.toDate().toLocaleDateString()}
                          </td>
                        </tr>
                      ))}

                      {activeTab === 'users' && users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/50">
                          <td className="px-8 py-6 font-bold text-primary">{u.name}</td>
                          <td className="px-8 py-6 text-sm text-secondary">{u.email}</td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                              {u.role}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <Badge status={u.status === 'active' ? 'Activo' : 'Inactivo'} />
                          </td>
                        </tr>
                      ))}

                      {activeTab === 'plans' && plans.map((p) => (
                        <tr key={p.id}>
                          <td className="px-8 py-6 font-bold text-primary">{p.name}</td>
                          <td className="px-8 py-6 font-bold text-secondary">{p.maxProperties === 999 ? 'Ilimitado' : p.maxProperties}</td>
                          <td className="px-8 py-6 font-bold text-primary-light">${p.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {properties.length === 0 && leads.length === 0 && !loading && (
                  <div className="py-20 text-center">
                    <LayoutDashboard className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-secondary font-medium italic">No se encontraron registros para mostrar.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
        active 
          ? 'bg-white text-primary shadow-md' 
          : 'text-secondary hover:text-primary hover:bg-slate-200/50'
      }`}
    >
      {cloneElement(icon as any, { className: "w-4 h-4" })}
      {label}
    </button>
  );
}

function Badge({ status }: { status: string }) {
  const getColors = () => {
    switch (status) {
      case 'Activo': return 'bg-green-50 text-green-700 border-green-100';
      case 'Vendido': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Inactivo': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  return (
    <span className={`px-3 py-1 text-[10px] font-black rounded-full border uppercase tracking-wider ${getColors()}`}>
      {status}
    </span>
  );
}
