import { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, Warehouse, CheckCircle2, ChevronDown, Phone, MessageCircle, Loader2, Send } from "lucide-react";
import { propertyService } from "../services/propertyService";
import { leadService } from "../services/leadService";
import { userService } from "../services/userService";
import { Property } from "../types";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [publisher, setPublisher] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      if (!id) return;
      try {
        const data = await propertyService.getById(id);
        if (data) {
          setProperty(data);
          const userData = await userService.getUser(data.userId);
          setPublisher(userData);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  const handleSubmitLead = async (e: FormEvent) => {
    e.preventDefault();
    if (!property || !id) return;
    setSubmitting(true);
    try {
      await leadService.create({
        propertyId: id,
        publisherId: property.userId,
        name,
        email,
        message,
      });
      setSubmitted(true);
    } catch (error) {
      alert("Error al enviar el mensaje. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
        <p className="text-secondary font-medium animate-pulse">Cargando detalles premium...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
        <h2 className="text-3xl font-bold text-primary">Propiedad no encontrada</h2>
        <p className="text-secondary text-center max-w-md">Lo sentimos, la propiedad que buscas no existe o ha sido dada de baja.</p>
        <Link to="/search" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Ver otras propiedades</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      {/* Bento Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[400px] md:h-[600px] gap-4 rounded-2xl overflow-hidden mb-12">
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
          <img src={property.images[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
        </div>
        <div className="hidden md:block relative group overflow-hidden transition-all hover:flex-[2]">
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
            <span className="text-white font-bold">Ver galería completa</span>
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
              {property.isFeatured && <span className="bg-blue-100 text-primary-light px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-blue-200">DESTACADO</span>}
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">{property.status}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-2 leading-tight">{property.title}</h1>
                <div className="flex items-center text-secondary gap-2 transition-colors hover:text-primary">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>
              <div className="text-left md:text-right bg-slate-50 p-4 md:bg-transparent rounded-2xl md:p-0">
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
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              Leer más <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-primary">El Barrio</h3>
              <a href="#" className="text-primary font-bold hover:underline text-sm">Explorar Guía de la Zona</a>
            </div>
            <div className="h-[400px] bg-slate-200 rounded-3xl overflow-hidden relative border border-slate-200 group">
               <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-1000"
                alt="Map Placeholder"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white scale-100 group-hover:scale-125 transition-transform duration-500">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Contact Form */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-50">
                {publisher?.image ? (
                  <img src={publisher.image} className="w-full h-full object-cover" alt="Agente" />
                ) : (
                  <div className="text-primary font-bold text-xl">{publisher?.name?.charAt(0) || "P"}</div>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-primary leading-tight">{publisher?.name || "Asesor Inmobiliario"}</h4>
                <p className="text-sm font-medium text-secondary">{publisher?.id === "system_admin" ? "Agente Premium" : "Publicador Verificado"}</p>
              </div>
            </div>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 p-8 rounded-2xl text-center border border-green-100"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-green-900 mb-2">¡Mensaje Enviado!</h4>
                <p className="text-green-700 text-sm leading-relaxed">Hemos enviado tus datos al publicador. Se pondrán en contacto contigo pronto.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-green-800 text-sm font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmitLead}>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-primary ml-1">Nombre Completo</label>
                  <input 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-400 bg-slate-50/50" 
                    placeholder="Tu nombre" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-primary ml-1">Correo Electrónico</label>
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-400 bg-slate-50/50" 
                    placeholder="tu@email.com" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-primary ml-1">Mensaje</label>
                  <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-400 min-h-[120px] bg-slate-50/50" 
                    placeholder="Estoy interesado en..." 
                  />
                </div>
                <button 
                  disabled={submitting}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-light transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Contactar al Asesor <Send className="w-5 h-5" /></>}
                </button>
              </form>
            )}

            <div className="flex items-center gap-4 py-4 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-slate-200 text-secondary font-bold text-sm hover:bg-slate-50 transition-colors">
                <Phone className="w-4 h-4" /> Llamar
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-slate-200 text-secondary font-bold text-sm hover:bg-slate-50 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
            </div>
            
            <p className="text-center text-[10px] text-secondary font-medium tracking-tight uppercase opacity-50">Respuesta promedio: 2 horas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, value, label }: { icon: ReactNode, value: string, label: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-1">
      <div className="text-primary mb-2">{icon}</div>
      <div className="text-2xl font-bold text-slate-900 leading-none mb-1">{value}</div>
      <div className="text-[10px] text-secondary uppercase font-bold tracking-tight opacity-70">{label}</div>
    </div>
  );
}
