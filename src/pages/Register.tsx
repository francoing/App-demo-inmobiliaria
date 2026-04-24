import { Link } from "react-router-dom";
import { User, Mail, Lock, CheckCircle2, Chrome } from "lucide-react";
import { motion } from "motion/react";

export default function RegisterPage() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 hero-gradient">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-100 p-10 lg:p-14"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-3">Crea tu cuenta</h1>
          <p className="text-secondary text-sm font-medium">Únete a la red inmobiliaria más exclusiva del país.</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary ml-1">Nombre</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-slate-50 outline-none transition-all placeholder:text-slate-400" 
                  placeholder="Juan"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary ml-1">Apellido</label>
              <input 
                type="text" 
                className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-slate-50 outline-none transition-all placeholder:text-slate-400" 
                placeholder="Pérez"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-slate-50 outline-none transition-all placeholder:text-slate-400" 
                placeholder="juan@ejemplo.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-slate-50 outline-none transition-all placeholder:text-slate-400" 
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 px-1">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" id="terms" />
            <label htmlFor="terms" className="text-xs text-secondary font-medium leading-relaxed">
              Acepto los <Link to="#" className="text-primary font-bold hover:underline">Términos de Servicio</Link> y la <Link to="#" className="text-primary font-bold hover:underline">Política de Privacidad</Link>.
            </label>
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-light shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            Empezar ahora
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">O regístrate con</span>
          </div>
        </div>

        <button className="mt-8 w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-200 font-bold text-secondary hover:bg-slate-50 transition-all">
          <Chrome className="w-5 h-5" />
          Google
        </button>

        <p className="mt-10 text-center text-sm text-secondary font-medium">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">Inicia sesión</Link>
        </p>
      </motion.div>
    </div>
  );
}
