
import React, { useEffect, useRef } from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  DollarSign, 
  Folder, 
  BarChart3, 
  Settings, 
  Scale, 
  Calendar, 
  FileText,
  CheckSquare,
  LogOut,
  ShieldCheck,
  FileCode,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Page } from '../Dashboard';
import { cn } from '../../lib/utils';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavLink: React.FC<{ icon: React.ElementType; label: string; active?: boolean; onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={cn(
      "flex items-center w-full px-4 py-3 my-0.5 transition-all duration-200 group relative",
      active 
        ? 'bg-brand-primary text-white font-bold' 
        : 'text-text-muted hover:bg-gray-100 hover:text-text-main'
    )}
  >
    <Icon className={cn(
      "w-4 h-4 transition-transform duration-200",
      active ? 'text-white' : 'text-gray-400 group-hover:text-brand-accent'
    )} />
    <span className="mr-3 text-sm font-medium tracking-tight">{label}</span>
    
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent"
      />
    )}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, activePage, setActivePage }) => {
  const sidebar = useRef<HTMLDivElement>(null);

  const handleLinkClick = (page: Page) => {
    setActivePage(page);
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !sidebarOpen) return;
      if (!sidebar.current.contains(target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);
  
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);


  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={sidebar}
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0),
          width: sidebarOpen ? 280 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 280)
        }}
        className={cn(
          "flex flex-col fixed lg:static z-50 left-0 top-0 h-screen overflow-y-auto bg-white border-l border-surface-border transition-all duration-300 ease-out no-scrollbar shadow-sm",
          !sidebarOpen && "lg:translate-x-0"
        )}
      >
        <div className="flex items-center gap-3 p-6 mb-4 border-b border-surface-border">
          <div className="w-10 h-10 bg-brand-primary rounded flex items-center justify-center">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-brand-primary tracking-tight leading-none">بەڕێوەبەری یاسایی</span>
            <span className="text-[9px] font-bold text-brand-accent uppercase tracking-widest mt-1">Legal Management System</span>
          </div>
        </div>
        
        <nav className="flex-grow py-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-6">سەرەکی</div>
          <NavLink icon={Home} label="داشبۆرد" active={activePage === 'dashboard'} onClick={() => handleLinkClick('dashboard')} />
          <NavLink icon={Briefcase} label="کەیسەکان" active={activePage === 'cases'} onClick={() => handleLinkClick('cases')} />
          <NavLink icon={Users} label="موکیلەکان" active={activePage === 'clients'} onClick={() => handleLinkClick('clients')} />
          <NavLink icon={CheckSquare} label="کارەکان" active={activePage === 'tasks'} onClick={() => handleLinkClick('tasks')} />
          <NavLink icon={DollarSign} label="دارایی" active={activePage === 'finance'} onClick={() => handleLinkClick('finance')} />
          <NavLink icon={ShieldCheck} label="هەژمارە سپێردراوەکان" active={activePage === 'trust-accounts'} onClick={() => handleLinkClick('trust-accounts')} />
          <NavLink icon={Calendar} label="ساڵنامە" active={activePage === 'calendar'} onClick={() => handleLinkClick('calendar')} />
          <NavLink icon={FileCode} label="بەڵگەنامەکان" active={activePage === 'documents'} onClick={() => handleLinkClick('documents')} />
          <NavLink icon={MessageSquare} label="پەیوەندییەکان" active={activePage === 'communication'} onClick={() => handleLinkClick('communication')} />
          <NavLink icon={ShieldAlert} label="پشکنینی ناکۆکی" active={activePage === 'conflict-check'} onClick={() => handleLinkClick('conflict-check')} />
          <NavLink icon={FileText} label="تێبینییەکان" active={activePage === 'notes'} onClick={() => handleLinkClick('notes')} />
          <NavLink icon={Folder} label="ئەرشیف" active={activePage === 'archive'} onClick={() => handleLinkClick('archive')} />
          
          <div className="pt-6 mt-6 border-t border-surface-border">
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-6">بەڕێوەبردن</div>
             <NavLink icon={ShieldCheck} label="تیمی نووسینگە" active={activePage === 'team'} onClick={() => handleLinkClick('team')} />
             <NavLink icon={BarChart3} label="ڕاپۆرتەکان" active={activePage === 'reports'} onClick={() => handleLinkClick('reports')} />
          </div>
        </nav>
        
        <div className="p-4 border-t border-surface-border mt-auto">
          <NavLink icon={Settings} label="ڕێکخستنەکان" active={activePage === 'settings'} onClick={() => handleLinkClick('settings')} />
          
          <div className="mt-4 p-3 bg-gray-50 border border-surface-border flex items-center gap-3 group cursor-pointer hover:bg-gray-100 transition-all">
            <img 
              src="https://ui-avatars.com/api/?name=Lawyer&background=1A2B3C&color=ffffff" 
              className="w-8 h-8 rounded border border-surface-border"
              alt="User"
            />
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold text-text-main truncate">پارێزەر</div>
              <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">بەڕێوەبەر</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
