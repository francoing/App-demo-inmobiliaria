import { Link, useLocation } from "react-router-dom";
import { Search, Heart, User, Globe, Home, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Comprar', path: '/' },
    { name: 'Alquilar', path: '/search' },
    { name: 'Vender', path: '/contact' },
    { name: 'Agentes', path: '/contact' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-200 shadow-sm">
      <div className="flex justify-between items-center px-6 lg:px-12 h-20 max-w-7xl mx-auto w-full">
        <Link to="/" className="text-xl font-bold tracking-tighter text-primary">
          EstatePro
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "font-medium text-sm transition-colors pb-1 border-b-2 hover:text-primary",
                location.pathname === item.path 
                  ? "text-primary border-primary" 
                  : "text-secondary border-transparent"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
            Iniciar Sesión
          </Link>
          <Link 
            to="/admin" 
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-light transition-all active:scale-95"
          >
            Publicar Propiedad
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <div className="text-xl font-bold tracking-tighter text-primary mb-2">EstatePro</div>
          <p className="text-xs text-secondary">© 2024 EstatePro Marketplace. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs text-secondary">
          <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
          <a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a>
          <a href="#" className="hover:text-primary transition-colors">Política de Cookies</a>
          <a href="#" className="hover:text-primary transition-colors">Contacto</a>
        </div>
        <div className="flex gap-4 mt-8 md:mt-0">
          <div className="p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
             <Globe className="w-5 h-5 text-primary" />
          </div>
          <div className="p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
             <Home className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
       <aside className="h-screen w-64 border-r border-slate-200 bg-white flex flex-col py-6 space-y-2 sticky top-0 hidden lg:flex">
        <div className="px-6 mb-8">
          <Link to="/" className="text-lg font-black text-primary tracking-tighter block">EstatePro</Link>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mt-1">Panel de Administración</p>
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarLink icon={<Home className="w-4 h-4" />} label="Tablero" />
          <SidebarLink icon={<Search className="w-4 h-4" />} label="Propiedades" active />
          <SidebarLink icon={<User className="w-4 h-4" />} label="Prospectos" />
          <SidebarLink icon={<Globe className="w-4 h-4" />} label="Analíticas" />
        </nav>
        <div className="px-6 pt-6 border-t border-slate-100">
           <div className="flex items-center space-x-3 mb-6">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" 
              className="w-10 h-10 rounded-full object-cover"
              alt="Profile"
            />
            <div>
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-xs text-secondary">Manager</p>
            </div>
          </div>
          <button className="w-full py-3 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-light transition-all shadow-md">
            Agregar Propiedad
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: ReactNode, label: string, active?: boolean }) {
  return (
    <a className={cn(
      "flex items-center px-6 py-3 font-semibold transition-all mx-2 rounded-lg text-sm",
      active ? "bg-slate-50 text-primary" : "text-secondary hover:bg-slate-100"
    )}>
      <span className="mr-3">{icon}</span>
      {label}
    </a>
  );
}
