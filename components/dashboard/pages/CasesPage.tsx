
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  Edit2, 
  Trash2, 
  Clock, 
  Play, 
  Pause,
  Briefcase,
  CheckCircle2,
  Timer,
  ChevronRight,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Modal from '../shared/Modal';
import Dropdown from '../shared/Dropdown';
import { cn } from '../../../lib/utils';

type CaseStatus = 'چالاک' | 'چاوەڕوان' | 'داخراو';

interface Case {
  id: string;
  client: string;
  clientPhone?: string;
  clientEmail?: string;
  type: string;
  status: CaseStatus;
  updated: string;
  trackedTime: number; // in seconds
}

const initialCasesData: Case[] = [
  { id: 'C-0584', client: 'کۆمپانیای بازرگانیی هێمن', clientPhone: '07709876543', clientEmail: 'info@hemn.co', type: 'بازرگانی', status: 'داخراو', updated: '2024-05-20', trackedTime: 4500 },
  { id: 'C-0601', client: 'ئارام خالید', clientPhone: '07501234567', clientEmail: 'aram.k@email.com', type: 'مەدەنی', status: 'چالاک', updated: '2024-07-28', trackedTime: 1200 },
  { id: 'C-0602', client: 'شیلان ئەحمەد', clientPhone: '07515554433', clientEmail: 'shilan.a@email.com', type: 'خێزانی', status: 'چاوەڕوان', updated: '2024-07-25', trackedTime: 0 },
  { id: 'C-0603', client: 'حکومەتی هەرێم', clientPhone: '0661112233', clientEmail: 'gov@krg.org', type: 'کارگێڕی', status: 'چالاک', updated: '2024-07-29', trackedTime: 86400 },
  { id: 'C-0605', client: 'ئاسۆ عەبدوڵا', clientPhone: '07500001122', clientEmail: 'aso.a@email.com', type: 'تاوانی', status: 'داخراو', updated: '2024-06-15', trackedTime: 500 },
];

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const CaseForm: React.FC<{ caseData?: Case | null; onSave: (data: Case) => void; onCancel: () => void }> = ({ caseData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Case>(caseData || { id: `C-0${Math.floor(Math.random() * 1000)}`, client: '', type: '', status: 'چالاک', updated: new Date().toISOString().split('T')[0], trackedTime: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
       <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">ناسنامەی کەیس</label>
            <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full bg-gray-50 border border-surface-border rounded p-3 text-brand-accent font-mono text-sm focus:outline-none" readOnly/>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">موکیل</label>
            <input type="text" name="client" value={formData.client} onChange={handleChange} required className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" placeholder="ناوی موکیل..." />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">جۆری کەیس</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" placeholder="بۆ نموونە: مەدەنی، تاوانی..." />
          </div>
           <div>
            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">بارودۆخ</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all appearance-none text-sm">
                <option value="چالاک">چالاک</option>
                <option value="چاوەڕوان">چاوەڕوان</option>
                <option value="داخراو">داخراو</option>
            </select>
          </div>
       </div>
       <div className="pt-4 flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 py-3 bg-gray-100 text-text-main font-bold rounded hover:bg-gray-200 transition-all text-sm">لابردن</button>
        <button type="submit" className="flex-1 py-3 bg-brand-primary text-white font-bold rounded hover:bg-brand-primary/90 transition-all text-sm shadow-sm">پاشەکەوت</button>
       </div>
    </form>
  )
}

const CasesPage: React.FC<{ onViewClient?: (id: string) => void; onViewMatter?: (id: string) => void }> = ({ onViewClient, onViewMatter }) => {
  const [cases, setCases] = useState(initialCasesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [activeTimerCaseId, setActiveTimerCaseId] = useState<string | null>(null);
  const [manualTime, setManualTime] = useState({ hours: 0, mins: 0 });

  const totalTrackedTime = cases.reduce((acc, c) => acc + c.trackedTime, 0);

  useEffect(() => {
    let interval: any;
    if (activeTimerCaseId) {
      interval = setInterval(() => {
        setCases(prev => prev.map(c => c.id === activeTimerCaseId ? { ...c, trackedTime: c.trackedTime + 1 } : c));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimerCaseId]);

  const handleAddCase = () => {
    setEditingCase(null);
    setIsModalOpen(true);
  };

  const handleEditCase = (caseItem: Case) => {
    setEditingCase(caseItem);
    setIsModalOpen(true);
  };
  
  const handleSaveCase = (caseData: Case) => {
    if (editingCase) {
      setCases(cases.map(c => c.id === caseData.id ? { ...caseData, updated: new Date().toISOString().split('T')[0] } : c));
    } else {
      setCases([caseData, ...cases]);
    }
    setIsModalOpen(false);
    setEditingCase(null);
  }

  const handleDeleteCase = (id: string) => {
    if (window.confirm('ئایا دڵنیایت لە سڕینەوەی ئەم کەیسە؟')) {
      setCases(cases.filter(c => c.id !== id));
      if (activeTimerCaseId === id) setActiveTimerCaseId(null);
    }
  };

  const handleResetTimer = (id: string) => {
    setCases(cases.map(c => c.id === id ? { ...c, trackedTime: 0 } : c));
    if (activeTimerCaseId === id) setActiveTimerCaseId(null);
  };

  const handleLogTime = () => {
    if (editingCase) {
        const extraSecs = (manualTime.hours * 3600) + (manualTime.mins * 60);
        setCases(prev => prev.map(c => c.id === editingCase.id ? { ...c, trackedTime: c.trackedTime + extraSecs } : c));
        setIsTimeModalOpen(false);
        setManualTime({ hours: 0, mins: 0 });
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">کەیسەکان</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی کەیسە یاساییەکان و چاودێریکردنی کات و بارودۆخ.</p>
        </div>
        <motion.button 
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddCase} 
          className="flex items-center bg-brand-accent text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-sm"
        >
          <Plus className="w-4 h-4 ml-2" />
          <span>زیادکردنی کەیس</span>
        </motion.button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'کۆی کەیسەکان', value: cases.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'کەیسە چالاکەکان', value: cases.filter(c => c.status === 'چالاک').length, icon: Play, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'کاتی گشتی', value: formatDuration(totalTrackedTime).split(':')[0] + ' ک', icon: Timer, color: 'text-brand-accent', bg: 'bg-blue-50' },
          { label: 'داخراوەکان', value: cases.filter(c => c.status === 'داخراو').length, icon: CheckCircle2, color: 'text-gray-400', bg: 'bg-gray-50' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={stat.label} 
            className="bg-white border border-surface-border p-5 rounded flex items-center gap-4 shadow-sm"
          >
            <div className={cn("p-2.5 rounded border", stat.bg, stat.color.replace('text', 'border').replace('600', '100'))}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</p>
              <p className="text-xl font-bold text-text-main font-mono">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded border border-surface-border flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="گەڕان بەدوای کەیس، موکیل، یان جۆر..." 
            className="w-full bg-gray-50 border border-surface-border rounded py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand-accent text-text-main text-sm font-medium transition-all" 
          />
        </div>
        <button className="p-2.5 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Cases Grid/Table */}
      <div className="bg-white rounded border border-surface-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50 text-[9px] font-bold uppercase tracking-widest text-text-muted border-b border-surface-border">
                <th className="p-5">کەیس</th>
                <th className="p-5">موکیل</th>
                <th className="p-5">بارودۆخ</th>
                <th className="p-5">کاتی تۆمارکراو</th>
                <th className="p-5 text-center">کردارەکان</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              <AnimatePresence mode="popLayout">
                {cases.map((caseItem) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={caseItem.id} 
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="p-5">
                        <div className="flex flex-col">
                          <span 
                            onClick={() => onViewMatter?.(caseItem.id)}
                            className="font-mono text-brand-accent font-bold text-base cursor-pointer hover:underline"
                          >
                            #{caseItem.id}
                          </span>
                          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{caseItem.type}</span>
                        </div>
                    </td>
                    <td className="p-5">
                      <Dropdown 
                        align="left"
                        dropdownClassName="w-64"
                        trigger={
                          <div className="font-bold text-text-main text-sm hover:text-brand-accent transition-colors cursor-pointer">{caseItem.client}</div>
                        }
                      >
                        <div className="p-4 space-y-4 text-right">
                          <div className="flex items-center gap-3 justify-end">
                            <div>
                              <p className="text-sm font-bold text-text-main">{caseItem.client}</p>
                              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">موکیل</p>
                            </div>
                            <div className="w-10 h-10 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                              {caseItem.client.charAt(0)}
                            </div>
                          </div>
                          
                          <div className="space-y-2 pt-2 border-t border-surface-border">
                            {caseItem.clientPhone && (
                              <div className="flex items-center justify-end gap-2 text-xs text-text-muted">
                                <span className="font-mono">{caseItem.clientPhone}</span>
                                <Phone className="w-3.5 h-3.5" />
                              </div>
                            )}
                            {caseItem.clientEmail && (
                              <div className="flex items-center justify-end gap-2 text-xs text-text-muted">
                                <span className="truncate">{caseItem.clientEmail}</span>
                                <Mail className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>

                          <button 
                            onClick={() => onViewClient?.(caseItem.id)}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 text-[10px] font-bold uppercase tracking-widest text-brand-primary rounded border border-surface-border transition-all"
                          >
                            بینینی پڕۆفایل
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </Dropdown>
                      <div className="text-[9px] text-text-muted font-bold">نوێکراوەتەوە: {caseItem.updated}</div>
                    </td>
                    <td className="p-5">
                      <span className={cn(
                        "px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border",
                        caseItem.status === 'چالاک' ? 'bg-green-50 text-green-600 border-green-100' : 
                        caseItem.status === 'چاوەڕوان' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-gray-50 text-gray-400 border-gray-100'
                      )}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                              "font-mono text-base font-bold px-2 py-1 rounded border",
                              activeTimerCaseId === caseItem.id ? 'bg-blue-50 text-brand-accent border-blue-200 animate-pulse' : 'bg-gray-50 text-gray-400 border-gray-100'
                            )}>
                                {formatDuration(caseItem.trackedTime)}
                            </div>
                            <button 
                                onClick={() => setActiveTimerCaseId(activeTimerCaseId === caseItem.id ? null : caseItem.id)}
                                className={cn(
                                  "w-8 h-8 flex items-center justify-center rounded transition-all shadow-sm",
                                  activeTimerCaseId === caseItem.id ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                )}
                                title={activeTimerCaseId === caseItem.id ? "ڕاگرتن" : "دەستپێکردن"}
                            >
                                {activeTimerCaseId === caseItem.id ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4 fill-current"/>}
                            </button>
                            {caseItem.trackedTime > 0 && (
                              <button 
                                onClick={() => handleResetTimer(caseItem.id)}
                                className="w-7 h-7 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-red-500 rounded transition-all"
                                title="سفرکردنەوە"
                              >
                                <Clock className="w-3.5 h-3.5" />
                              </button>
                            )}
                        </div>
                    </td>
                    <td className="p-5">
                       <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => onViewMatter?.(caseItem.id)} 
                            className="w-8 h-8 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-brand-accent hover:border-brand-accent/30 rounded transition-all"
                            title="بینینی وردەکاری"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => { setEditingCase(caseItem); setIsTimeModalOpen(true); }} 
                            className="w-8 h-8 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-brand-accent hover:border-brand-accent/30 rounded transition-all"
                            title="تۆمارکردنی کاتی دەستی"
                          >
                            <Timer className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditCase(caseItem)} 
                            className="w-8 h-8 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-brand-primary hover:border-brand-primary/30 rounded transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCase(caseItem.id)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-red-500 hover:border-red-500/30 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCase ? "دەستکاریکردنی کەیس" : "زیادکردنی کەیسی نوێ"}>
        <CaseForm caseData={editingCase} onSave={handleSaveCase} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <Modal isOpen={isTimeModalOpen} onClose={() => setIsTimeModalOpen(false)} title="تۆمارکردنی کاتی دەستی">
        <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded border border-surface-border">
              <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted mb-1">کەیسی دیاریکراو</p>
              <p className="text-brand-primary font-bold text-lg">#{editingCase?.id}</p>
              <p className="text-text-muted text-xs font-medium">{editingCase?.client}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">کاتژمێر</label>
                    <input 
                      type="number" 
                      min="0"
                      value={manualTime.hours} 
                      onChange={(e)=>setManualTime({...manualTime, hours: parseInt(e.target.value)||0})} 
                      className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">خولەک</label>
                    <input 
                      type="number" 
                      min="0"
                      max="59"
                      value={manualTime.mins} 
                      onChange={(e)=>setManualTime({...manualTime, mins: parseInt(e.target.value)||0})} 
                      className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                    />
                </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button onClick={() => setIsTimeModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-text-main font-bold rounded hover:bg-gray-200 transition-all text-sm">لابردن</button>
              <button onClick={handleLogTime} className="flex-1 py-3 bg-brand-accent text-white font-bold rounded hover:bg-blue-700 transition-all text-sm shadow-sm">زیادکردن</button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default CasesPage;
