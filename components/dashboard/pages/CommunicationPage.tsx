
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Calendar,
  MoreVertical,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import Modal from '../shared/Modal';

interface CommLog {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'message';
  clientName: string;
  matterId?: string;
  subject: string;
  date: string;
  duration?: string;
  summary: string;
  status: 'Completed' | 'Missed' | 'Scheduled';
}

const initialLogs: CommLog[] = [
  { id: 'L-001', type: 'call', clientName: 'کۆمپانیای هێمن', matterId: 'C-0601', subject: 'گفتوگۆ دەربارەی گرێبەست', date: '2024-07-28 10:30', duration: '15 خولەک', summary: 'موکیل داوای گۆڕانکاری لە بڕگەی ٤ کرد.', status: 'Completed' },
  { id: 'L-002', type: 'meeting', clientName: 'ئارام خالید', matterId: 'C-0602', subject: 'کۆبوونەوەی یەکەم', date: '2024-07-25 14:00', duration: '1 کاتژمێر', summary: 'وەرگرتنی زانیارییە سەرەتاییەکان و واژۆکردنی بریکارنامە.', status: 'Completed' },
  { id: 'L-003', type: 'email', clientName: 'شیلان ئەحمەد', matterId: 'C-0603', subject: 'ناردنی بەڵگەنامەکان', date: '2024-07-22 09:15', summary: 'ئیمەیڵ کرا بۆ داواکردنی وێنەی ناسنامە.', status: 'Completed' },
  { id: 'L-004', type: 'call', clientName: 'ئاسۆ عەبدوڵا', subject: 'بەدواداچوونی کەیس', date: '2024-07-29 11:00', summary: 'پەیوەندی کرا بەڵام وەڵامی نەبوو.', status: 'Missed' },
];

const CommunicationPage: React.FC = () => {
  const [logs] = useState(initialLogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (type: CommLog['type']) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'email': return <Mail className="w-4 h-4 text-red-500" />;
      case 'meeting': return <Users className="w-4 h-4 text-green-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-purple-500" />;
    }
  };

  const filteredLogs = logs.filter(log => 
    log.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    log.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">پەیوەندییەکان</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">تۆمارکردن و بەدواداچوونی هەموو پەیوەندییەکان لەگەڵ موکیلەکان.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-brand-accent text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-sm"
        >
          <Plus className="w-4 h-4 ml-2" />
          <span>تۆمارکردنی نوێ</span>
        </button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-white p-4 rounded border border-surface-border flex items-center gap-4 shadow-sm">
          <div className="relative flex-grow">
            <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="گەڕان بەدوای پەیوەندی، موکیل، یان بابەت..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-surface-border rounded py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand-accent text-text-main text-sm font-medium transition-all" 
            />
          </div>
          <button className="p-2.5 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-white p-4 rounded border border-surface-border flex items-center justify-around shadow-sm">
          <div className="text-center">
            <p className="text-xl font-bold text-text-main font-mono">{logs.length}</p>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">کۆی گشتی</p>
          </div>
          <div className="w-px h-6 bg-gray-100"></div>
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600 font-mono">{logs.filter(l => l.type === 'call').length}</p>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">تەلەفۆن</p>
          </div>
        </div>
      </div>

      {/* Timeline/List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredLogs.map((log, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: i * 0.05 }}
              key={log.id} 
              className="bg-white p-5 rounded border border-surface-border shadow-sm hover:border-brand-accent/30 transition-all group relative overflow-hidden"
            >
              <div className="flex flex-wrap items-start gap-6">
                <div className="flex flex-col items-center">
                   <div className="p-3 bg-gray-50 rounded border border-surface-border group-hover:bg-brand-primary/5 group-hover:border-brand-primary/20 transition-colors">
                      {getIcon(log.type)}
                   </div>
                   <div className="w-px h-full bg-gray-100 mt-2 min-h-[20px]"></div>
                </div>
                
                <div className="flex-1 space-y-3">
                   <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-text-main group-hover:text-brand-accent transition-colors">{log.subject}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {log.clientName}
                          </span>
                          {log.matterId && (
                            <span className="text-[9px] font-mono font-bold text-brand-accent bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                              #{log.matterId}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {log.date}
                        </div>
                        {log.duration && (
                          <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            {log.duration}
                          </div>
                        )}
                      </div>
                   </div>
                   
                   {log.summary && (
                     <div className="p-3 bg-gray-50 rounded border border-surface-border text-sm text-text-main font-medium leading-relaxed">
                        {log.summary}
                     </div>
                   )}
                   
                   <div className="flex items-center justify-between pt-2">
                      <span className={cn(
                        "px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border",
                        log.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                        log.status === 'Missed' ? 'bg-red-50 text-red-600 border-red-100' : 
                        'bg-blue-50 text-blue-600 border-blue-100'
                      )}>
                        {log.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-brand-primary transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-text-main transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="تۆمارکردنی پەیوەندی نوێ">
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">جۆری پەیوەندی</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'call', icon: Phone, label: 'تەلەفۆن' },
                { id: 'email', icon: Mail, label: 'ئیمەیڵ' },
                { id: 'meeting', icon: Users, label: 'کۆبوونەوە' },
                { id: 'message', icon: MessageSquare, label: 'نامە' },
              ].map(type => (
                <button key={type.id} className="flex flex-col items-center gap-2 p-3 bg-white border border-surface-border rounded hover:border-brand-accent hover:bg-brand-primary/5 transition-all group">
                  <type.icon className="w-5 h-5 text-gray-400 group-hover:text-brand-accent" />
                  <span className="text-[9px] font-bold text-text-muted uppercase group-hover:text-text-main">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">موکیل</label>
              <select className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm appearance-none">
                <option>کۆمپانیای هێمن</option>
                <option>ئارام خالید</option>
                <option>شیلان ئەحمەد</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">کەیس (ئارەزوومەندانە)</label>
              <select className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm appearance-none">
                <option>هیچ کام</option>
                <option>#C-0601</option>
                <option>#C-0602</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">بابەت</label>
            <input placeholder="ناونیشانی کورت بۆ پەیوەندییەکە..." className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">پوختەی گفتوگۆ</label>
            <textarea placeholder="چی گوترا؟ چی پێویستە بکرێت؟" className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm h-32 resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-text-main font-bold rounded hover:bg-gray-200 transition-all text-sm">لابردن</button>
            <button className="flex-1 py-3 bg-brand-accent text-white font-bold rounded hover:bg-blue-700 transition-all text-sm shadow-sm">پاشەکەوت</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CommunicationPage;
