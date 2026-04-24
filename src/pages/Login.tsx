import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Chrome } from "lucide-react";
import { motion } from "motion/react";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 hero-gradient">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-100 p-10 lg:p-14"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-3">Bienvenido de nuevo</h1>
          <p className="text-secondary text-sm font-medium">Ingresa tus credenciales para acceder a tu cuenta.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-slate-50 outline-none transition-all placeholder:text-slate-400" 
                placeholder="nombre@ejemplo.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-primary">Contraseña</label>
              <Link to="#" className="text-xs font-bold text-primary-light hover:underline">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-slate-50 outline-none transition-all placeholder:text-slate-400" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-light shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            Iniciar Sesión
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">O continúa con</span>
          </div>
        </div>

        <button className="mt-8 w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-200 font-bold text-secondary hover:bg-slate-50 transition-all">
          <Chrome className="w-5 h-5" />
          Google
        </button>

        <p className="mt-10 text-center text-sm text-secondary font-medium">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-primary font-bold hover:underline">Regístrate gratis</Link>
        </p>
      </motion.div>
    </div>
  );
}
