
import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Globe, 
  Bell, 
  Database, 
  Building2, 
  Lock, 
  CreditCard, 
  ChevronRight,
  Save,
  RefreshCw,
  Trash2,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'firm' | 'security' | 'system'>('profile');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">ڕێکخستنەکان</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی هەژمار، نووسینگە، و ڕێکخستنەکانی سیستەم.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded font-bold text-sm hover:bg-blue-700 transition-all shadow-sm active:scale-95">
          <Save className="w-4 h-4" />
          <span>پاشەکەوتکردنی گۆڕانکارییەکان</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-1">
          {[
            { id: 'profile', label: 'هەژماری من', icon: User },
            { id: 'firm', label: 'پرۆفایلی نووسینگە', icon: Building2 },
            { id: 'security', label: 'ئاسایش و دەسەڵاتەکان', icon: Shield },
            { id: 'system', label: 'ڕێکخستنی سیستەم', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-xl transition-all group",
                activeTab === tab.id ? "bg-brand-accent text-white shadow-md shadow-blue-100" : "text-text-muted hover:bg-gray-50 hover:text-text-main"
              )}
            >
              <div className="flex items-center gap-3">
                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-white" : "text-gray-400 group-hover:text-brand-accent")} />
                <span className="text-sm font-bold">{tab.label}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity", activeTab === tab.id && "opacity-100")} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-surface-border shadow-sm">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-6 pb-8 border-b border-surface-border">
                  <div className="relative group">
                    <img 
                      src="https://ui-avatars.com/api/?name=Lawyer&background=1A2B3C&color=ffffff" 
                      className="w-24 h-24 rounded-2xl border-4 border-gray-50 shadow-sm"
                      alt="Profile"
                    />
                    <button className="absolute -bottom-2 -right-2 p-2 bg-brand-accent text-white rounded-lg shadow-lg hover:scale-110 transition-transform">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-main">پارێزەر ئاراس ئەحمەد</h3>
                    <p className="text-sm text-text-muted font-medium">بەڕێوەبەری گشتی نووسینگە</p>
                    <div className="mt-3 flex items-center gap-2">
                       <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded text-[10px] font-bold uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ناوی تەواو</label>
                    <input defaultValue="ئاراس ئەحمەد" className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ناونیشانی ئیمەیڵ</label>
                    <input defaultValue="aras@lawfirm.com" className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ژمارەی تەلەفۆن</label>
                    <input defaultValue="+964 770 123 4567" className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">پسپۆڕی</label>
                    <input defaultValue="کەیسە مەدەنییەکان" className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'firm' && (
              <motion.div 
                key="firm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-main">لقی نووسینگەکان</h3>
                    <button className="flex items-center gap-2 text-[10px] font-bold text-brand-accent uppercase tracking-widest hover:underline">
                      <Plus className="w-3.5 h-3.5" />
                      زیادکردنی لق
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { name: 'لقی سەرەکی - سلێمانی', address: 'شەقامی سالم، تەلاری سالم', phone: '0770 111 2233', status: 'سەرەکی' },
                      { name: 'لقی هەولێر', address: 'شەقامی ٦٠ مەتری، تەلاری ئیمپایەر', phone: '0750 444 5566', status: 'لاوەکی' },
                    ].map((branch, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl border border-surface-border flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-white rounded-lg border border-surface-border text-brand-accent">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-text-main">{branch.name}</h4>
                            <p className="text-xs text-text-muted font-medium mt-0.5">{branch.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className={cn(
                             "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-widest",
                             branch.status === 'سەرەکی' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-100 text-gray-600 border-gray-200'
                           )}>
                             {branch.status}
                           </span>
                           <button className="p-2 text-gray-400 hover:text-text-main opacity-0 group-hover:opacity-100 transition-all">
                             <Settings className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-surface-border">
                   <h3 className="text-sm font-bold text-text-main uppercase tracking-widest">زانیارییە گشتییەکان</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ناوی نووسینگە</label>
                        <input defaultValue="نووسینگەی پارێزەری ئاراس" className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ژمارەی مۆڵەت</label>
                        <input defaultValue="LIC-2024-001" className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div 
                key="system"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <h3 className="text-sm font-bold text-text-main uppercase tracking-widest flex items-center gap-2">
                        <Globe className="w-4 h-4 text-brand-accent" />
                        زمان و ناوچە
                      </h3>
                      <div className="space-y-4">
                         <div>
                            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">زمانی سەرەکی</label>
                            <select className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all appearance-none">
                               <option>کوردی (سۆرانی)</option>
                               <option>English</option>
                               <option>العربية</option>
                            </select>
                         </div>
                         <div>
                            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">دراوی سەرەکی</label>
                            <select className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all appearance-none">
                               <option>USD ($)</option>
                               <option>IQD (د.ع)</option>
                            </select>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-sm font-bold text-text-main uppercase tracking-widest flex items-center gap-2">
                        <Database className="w-4 h-4 text-brand-accent" />
                        داتا و پاڵپشت (Backup)
                      </h3>
                      <div className="space-y-3">
                         <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-surface-border hover:border-brand-accent transition-all group">
                            <div className="flex items-center gap-3">
                               <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-brand-accent group-hover:rotate-180 transition-all duration-500" />
                               <span className="text-sm font-bold text-text-main">دروستکردنی پاڵپشتی نوێ</span>
                            </div>
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">ئێستا</span>
                         </button>
                         <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-surface-border hover:border-brand-accent transition-all group">
                            <div className="flex items-center gap-3">
                               <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-brand-accent" />
                               <span className="text-sm font-bold text-text-main">گەڕاندنەوەی داتا</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                         </button>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-surface-border">
                   <div className="bg-red-50 border border-red-100 p-6 rounded-2xl space-y-4">
                      <h3 className="text-sm font-bold text-red-600 uppercase tracking-widest flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        ناوچەی مەترسیدار
                      </h3>
                      <p className="text-xs text-red-600/80 font-medium leading-relaxed">
                        سڕینەوەی هەژمار یان داتاکان کارێکی هەمیشەییە و ناتوانرێت بگەڕێنرێتەوە. تکایە دڵنیابەرەوە پێش ئەنجامدانی هەر کارێک لێرە.
                      </p>
                      <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold text-xs hover:bg-red-700 transition-all shadow-sm">
                        سڕینەوەی هەموو داتاکان
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
