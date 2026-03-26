
import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  LogOut, 
  Settings, 
  Users, 
  ChevronDown, 
  Briefcase,
  DollarSign,
  CheckCircle2,
  Clock,
  Plus,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { UserRole, Page } from '../Dashboard';
import { cn } from '../../lib/utils';

import Dropdown from './shared/Dropdown';
import GlobalSearchModal from './shared/GlobalSearchModal';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleLogout: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  setActivePage: (page: Page) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ sidebarOpen, setSidebarOpen, handleLogout, userRole, setUserRole, setActivePage }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 bg-white border-b border-surface-border z-30 shadow-sm">
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        setActivePage={setActivePage} 
      />
      <div className="px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 lg:hidden rounded transition-colors"
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded px-3 py-1.5 border border-surface-border">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ڕۆڵ:</span>
               <span className="text-xs font-bold text-brand-primary">{userRole === 'Lawyer' ? 'پارێزەر' : 'سکرتاریەت'}</span>
            </div>

            {/* Quick Access Dropdown */}
            <div className="hidden md:block h-6 w-px bg-surface-border mx-2"></div>
            
            <Dropdown align="left" trigger={
              <div className="flex items-center gap-2 px-3 py-1.5 text-gray-500 hover:text-brand-accent hover:bg-gray-50 rounded transition-all group">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">دەستپێگەیشتنی خێرا</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
              </div>
            }>
              <div className="p-3 border-b border-surface-border bg-gray-50">
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">بەستەرە خێراکان</p>
              </div>
              <div className="p-1.5">
                <button 
                  onClick={() => setActivePage('cases')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-main hover:bg-brand-accent/5 hover:text-brand-accent transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs font-bold">کەیسەکان</span>
                </button>
                <button 
                  onClick={() => setActivePage('clients')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-main hover:bg-brand-accent/5 hover:text-brand-accent transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold">موکیلەکان</span>
                </button>
                <button 
                  onClick={() => setActivePage('finance')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-main hover:bg-brand-accent/5 hover:text-brand-accent transition-colors"
                >
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs font-bold">دارایی</span>
                </button>
              </div>
              <div className="p-1.5 border-t border-surface-border">
                <button 
                  onClick={() => setActivePage('tasks')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-main hover:bg-brand-accent/5 hover:text-brand-accent transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold">ئەرکەکان</span>
                </button>
              </div>
            </Dropdown>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Quick Create Button */}
            <Dropdown trigger={
              <div className="hidden sm:flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded shadow-sm hover:bg-blue-700 transition-all group">
                <Plus className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">زیادکردن</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
              </div>
            }>
              <div className="p-1.5">
                <button 
                  onClick={() => setActivePage('cases')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-main hover:bg-gray-50 transition-colors"
                >
                  <div className="p-1.5 rounded bg-blue-50 text-blue-600">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold">کەیسی نوێ</span>
                </button>
                <button 
                  onClick={() => setActivePage('clients')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-main hover:bg-gray-50 transition-colors"
                >
                  <div className="p-1.5 rounded bg-purple-50 text-purple-600">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold">موکیلی نوێ</span>
                </button>
                <button 
                  onClick={() => setActivePage('tasks')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-main hover:bg-gray-50 transition-colors"
                >
                  <div className="p-1.5 rounded bg-amber-50 text-amber-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold">ئەرکی نوێ</span>
                </button>
              </div>
            </Dropdown>

            {/* Search */}
            <div className="relative hidden lg:block">
                <Search className="absolute h-3.5 w-3.5 top-2.5 left-3 text-gray-400"/>
                <input 
                    type="button" 
                    value="گەڕان... (Ctrl+K)"
                    onClick={() => setIsSearchOpen(true)}
                    className="w-64 bg-gray-50 border border-surface-border text-text-muted rounded py-2 pl-9 pr-4 text-xs font-bold text-right cursor-pointer hover:bg-gray-100 transition-all"
                />
            </div>

            {/* Notifications */}
             <Dropdown trigger={
               <div className="relative p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-white"></span>
               </div>
             }>
                <div className="p-4 border-b border-surface-border bg-gray-50">
                    <h3 className="text-sm font-bold text-text-main">ئاگادارییەکان</h3>
                </div>
                <div className="max-h-80 overflow-y-auto no-scrollbar">
                    {[
                      { id: 1, title: 'کەیسی #C-0603 نوێکرایەوە', time: '2 کاتژمێر پێش', icon: Briefcase, color: 'text-blue-500' },
                      { id: 2, title: 'پارە وەرگیرا لە موکیل', time: 'دوێنێ', icon: DollarSign, color: 'text-green-500' },
                      { id: 3, title: 'ئەرکێکی نوێ سپێردرا', time: '3 کاتژمێر پێش', icon: CheckCircle2, color: 'text-brand-accent' },
                    ].map((notif) => (
                      <button key={notif.id} className="w-full text-right p-4 hover:bg-gray-50 border-b border-surface-border last:border-0 transition-colors flex gap-3 items-start">
                        <div className={cn("mt-0.5 p-1.5 rounded bg-gray-100", notif.color)}>
                          <notif.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <span className="block text-xs font-bold text-text-main mb-0.5 truncate">{notif.title}</span>
                          <span className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                            <Clock className="w-2.5 h-2.5" />
                            {notif.time}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
                <button 
                  onClick={() => setActivePage('notifications')}
                  className="w-full p-3 text-[9px] font-bold text-brand-accent uppercase tracking-widest bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  بینینی هەموو ئاگادارییەکان
                </button>
             </Dropdown>

            <div className="h-6 w-px bg-surface-border hidden sm:block"></div>

            {/* User menu */}
            <Dropdown trigger={
              <div className="flex items-center gap-3 p-1 hover:bg-gray-100 rounded transition-colors group">
                <img 
                  src="https://ui-avatars.com/api/?name=Lawyer&background=1A2B3C&color=ffffff" 
                  className="w-8 h-8 rounded border border-surface-border"
                  alt="User"
                />
                <div className="hidden md:block text-right">
                  <div className="text-xs font-bold text-text-main leading-none mb-0.5">{userRole === 'Lawyer' ? 'پارێزەر' : 'سکرتاریەت'}</div>
                  <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider">بەڕێوەبەر</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-text-main transition-colors" />
              </div>
            }>
              <div className="p-4 border-b border-surface-border bg-gray-50">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://ui-avatars.com/api/?name=Lawyer&background=1A2B3C&color=ffffff" 
                    className="w-10 h-10 rounded border border-surface-border"
                    alt="User"
                  />
                  <div>
                    <div className="text-sm font-bold text-text-main">{userRole === 'Lawyer' ? 'پارێزەر' : 'سکرتاریەت'}</div>
                    <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider">lawyer@example.com</div>
                  </div>
                </div>
              </div>
              <div className="p-2 space-y-0.5">
                <button 
                  onClick={() => setUserRole(userRole === 'Lawyer' ? 'Secretariat' : 'Lawyer')}
                  className="w-full flex items-center gap-3 p-2.5 rounded text-text-muted hover:text-brand-accent hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold">گۆڕینی ڕۆڵ</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2.5 rounded text-text-muted hover:text-brand-accent hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs font-bold">ڕێکخستنەکان</span>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2.5 rounded text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs font-bold">چوونەدەرەوە</span>
                </button>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
