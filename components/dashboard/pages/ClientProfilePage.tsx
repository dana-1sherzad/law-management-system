
import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock, 
  DollarSign, 
  FileText,
  Building2,
  ExternalLink,
  CheckCircle2,
  Plus,
  Lock,
  Scale
} from 'lucide-react';
import { motion } from 'motion/react';
import type { UserRole } from '../../Dashboard';
import { cn } from '../../../lib/utils';

interface ClientProfilePageProps {
  clientId: string;
  onBack: () => void;
  userRole: UserRole;
}

const ClientProfilePage: React.FC<ClientProfilePageProps> = ({ clientId, onBack, userRole }) => {
  const isSecretariat = userRole === 'Secretariat';
  // Mock data for the selected client
  const client = {
    id: clientId,
    name: clientId === '2' ? 'کۆمپانیای بازرگانیی هێمن' : 'ئارام خالید',
    email: clientId === '2' ? 'info@hemn.co' : 'aram.k@email.com',
    phone: clientId === '2' ? '07709876543' : '07501234567',
    address: 'هەولێر، شەقامی ٦٠ مەتری، تەلاری بازرگانی',
    joinedDate: '2023-05-12',
    isCompany: clientId === '2',
    status: 'Active',
    totalCases: 8,
    activeCases: 3,
    totalPaid: '12,500,000',
    pendingBalance: '2,000,000',
    cases: [
      { id: 'C101', title: 'کێشەی زەوی و زار - گەڕەکی بەختیاری', status: 'In Progress', date: '2024-01-15', type: 'Civil' },
      { id: 'C102', title: 'گرێبەستی بازرگانی - دابینکردنی سووتەمەنی', status: 'Completed', date: '2023-11-20', type: 'Commercial' },
      { id: 'C103', title: 'داوای یاسایی دژی کۆمپانیای X', status: 'Pending', date: '2024-02-05', type: 'Litigation' },
    ],
    notes: [
      { id: 1, text: 'موکیلەکە داوای خێراکردنی ڕێکارەکان دەکات.', date: '2024-03-10' },
      { id: 2, text: 'هەموو بەڵگەنامەکان وەرگیراون.', date: '2024-02-28' },
    ]
  };

  const avatarColors = ['bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-rose-600', 'bg-amber-600'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors group"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span className="font-bold text-sm">گەڕانەوە بۆ لیستی موکیلەکان</span>
        </button>
        <div className="flex gap-3">
          {!isSecretariat && (
            <>
              <button className="px-4 py-2 bg-white border border-surface-border rounded text-text-main font-bold hover:bg-gray-50 transition-all text-xs">
                دەستکاریکردن
              </button>
              <button className="px-4 py-2 bg-brand-accent text-white font-bold rounded hover:bg-blue-700 transition-all shadow-sm text-xs">
                کەیسی نوێ
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-surface-border rounded p-8 relative overflow-hidden group shadow-sm">
          <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className={cn(
              "w-24 h-24 md:w-32 md:h-32 rounded flex items-center justify-center text-3xl font-bold text-white shadow-sm border border-white/10 group-hover:scale-105 transition-transform duration-500",
              avatarColors[client.name.charCodeAt(0) % avatarColors.length]
            )}>
              {client.isCompany ? <Building2 className="w-12 h-12" /> : client.name.charAt(0)}
            </div>
            
            <div className="flex-1 text-center md:text-right space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight leading-tight">{client.name}</h1>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold uppercase rounded border border-green-100 tracking-widest">
                  {client.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-text-muted font-bold text-xs">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{client.address}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>ئەندامە لە: {client.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-surface-border rounded p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-bold text-text-main mb-4 flex items-center gap-2 uppercase tracking-widest">
            <DollarSign className="w-4 h-4 text-brand-accent" />
            پوختەی دارایی
          </h3>
          {isSecretariat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 space-y-2 bg-gray-50 rounded border border-surface-border p-4">
              <Lock className="w-8 h-8 opacity-20" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-center">زانیارییە داراییەکان پارێزراون</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded border border-surface-border">
                <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">کۆی پارەی دراو</p>
                <p className="text-xl font-bold text-text-main font-mono">{client.totalPaid} <span className="text-[10px] text-text-muted">دینار</span></p>
              </div>
              <div className="p-4 bg-blue-50 rounded border border-blue-100">
                <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest mb-1">بڕی ماوە (قەرز)</p>
                <p className="text-xl font-bold text-brand-accent font-mono">{client.pendingBalance} <span className="text-[10px] text-brand-accent/60">دینار</span></p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'کۆی کەیسەکان', value: isSecretariat ? '—' : client.totalCases, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'کەیسە چالاکەکان', value: isSecretariat ? '—' : client.activeCases, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'کەیسە تەواوبووەکان', value: isSecretariat ? '—' : client.totalCases - client.activeCases, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'بەڵگەنامەکان', value: isSecretariat ? '—' : '24', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-surface-border p-5 rounded shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={cn("p-2 rounded border", stat.bg, stat.color.replace('text', 'border').replace('600', '100'))}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </div>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-text-main font-mono">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case History */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-main tracking-tight">مێژووی کەیسەکان</h3>
            {!isSecretariat && <button className="text-brand-accent font-bold text-[10px] uppercase tracking-widest hover:underline">بینینی هەمووی</button>}
          </div>
          
          {isSecretariat ? (
            <div className="bg-gray-50 border border-surface-border p-12 rounded flex flex-col items-center justify-center text-gray-300 space-y-3">
               <Lock className="w-10 h-10 opacity-20" />
               <p className="text-[10px] font-bold uppercase tracking-widest">مێژووی کەیسەکان تەنها بۆ پارێزەرانە</p>
            </div>
          ) : (
            <div className="space-y-3">
              {client.cases.map((c) => (
                <div key={c.id} className="bg-white border border-surface-border p-4 rounded hover:border-brand-accent/30 transition-all group shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center border border-surface-border text-brand-accent group-hover:scale-105 transition-transform">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-main group-hover:text-brand-accent transition-colors tracking-tight">{c.title}</h4>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">کۆد: {c.id}</span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">جۆر: {c.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest mb-1 inline-block border",
                        c.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' :
                        c.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-gray-50 text-gray-400 border-gray-100'
                      )}>
                        {c.status}
                      </div>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{c.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Notes & Activity */}
        <div className="space-y-6">
          <div className="bg-white border border-surface-border rounded p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text-main mb-5 flex items-center gap-2 uppercase tracking-widest">
              <FileText className="w-4 h-4 text-brand-accent" />
              تێبینییەکان
            </h3>
            <div className="space-y-5">
              {client.notes.map((note) => (
                <div key={note.id} className="relative pr-4 border-r border-surface-border pb-5 last:pb-0">
                  <div className="absolute top-0 right-[-3px] w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                  <p className="text-xs font-medium text-text-main leading-relaxed mb-1.5">{note.text}</p>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{note.date}</span>
                </div>
              ))}
              <button className="w-full py-2.5 bg-gray-50 border border-surface-border rounded text-text-muted font-bold hover:text-text-main hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest">
                <Plus className="w-3.5 h-3.5" />
                زیادکردنی تێبینی
              </button>
            </div>
          </div>

          <div className="bg-brand-primary p-6 rounded text-white relative overflow-hidden group cursor-pointer shadow-md">
            <div className="relative z-10">
              <h3 className="text-base font-bold mb-1 tracking-tight">پەیوەندی خێرا</h3>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-5">پەیوەندی بکە بە موکیلەوە</p>
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-white/10 rounded flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="w-9 h-9 bg-white/10 rounded flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
            </div>
            <ExternalLink className="absolute bottom-4 left-4 w-8 h-8 opacity-5 group-hover:opacity-10 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
