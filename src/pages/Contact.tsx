import { MapPin, Phone, Mail, Send } from "lucide-react";
import type { ReactNode } from "react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        {/* Left: Info */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight">Ponte en contacto con nuestros expertos.</h1>
            <p className="text-lg text-secondary leading-relaxed">
              Ya sea que estés buscando comprar, vender o invertir, nuestro dedicado equipo está aquí para guiarte en cada paso de tu viaje inmobiliario.
            </p>
          </div>

          <div className="space-y-8">
            <ContactInfoItem 
              icon={<MapPin className="w-5 h-5" />} 
              title="OFICINA" 
              value={<>123 Skyline Plaza, Financial District<br />New York, NY 10004</>} 
            />
            <ContactInfoItem 
              icon={<Phone className="w-5 h-5" />} 
              title="TELÉFONO" 
              value="+1 (555) 234-8890" 
            />
            <ContactInfoItem 
              icon={<Mail className="w-5 h-5" />} 
              title="CORREO ELECTRÓNICO" 
              value="support@estatepro.com" 
            />
          </div>

          {/* Image */}
          <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="Office" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/10"></div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-10 lg:p-16 rounded-[40px] shadow-2xl shadow-primary/5 border border-slate-100">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Nombre</label>
                  <input className="w-full px-6 py-4 rounded-xl border border-slate-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 bg-slate-50 placeholder:text-slate-400" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Correo electrónico</label>
                  <input className="w-full px-6 py-4 rounded-xl border border-slate-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 bg-slate-50 placeholder:text-slate-400" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Teléfono</label>
                <input className="w-full px-6 py-4 rounded-xl border border-slate-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 bg-slate-50 placeholder:text-slate-400" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Mensaje</label>
                <textarea rows={5} className="w-full px-6 py-4 rounded-xl border border-slate-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 bg-slate-50 placeholder:text-slate-400 resize-none" placeholder="¿Cómo podemos ayudarte?" />
              </div>
              <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-light shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                Enviar Mensaje
                <Send className="w-5 h-5" />
              </button>
              <p className="text-xs text-center text-secondary font-medium">
                Al hacer clic en enviar, aceptas nuestra <a href="#" className="text-primary hover:underline">Política de Privacidad</a> y <a href="#" className="text-primary hover:underline">Términos</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, value }: { icon: ReactNode, title: string, value: ReactNode }) {
  return (
    <div className="flex gap-6">
      <div className="bg-blue-50 p-4 rounded-2xl text-primary flex-shrink-0 self-start">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-primary tracking-widest">{title}</p>
        <p className="text-lg text-slate-900 font-medium leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
