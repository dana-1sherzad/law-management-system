
import React, { useState } from 'react';
import { 
  Folder, 
  Search, 
  Filter, 
  History, 
  FileText, 
  Briefcase, 
  Users, 
  Download, 
  RotateCcw,
  MoreVertical,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';

interface ArchivedItem {
  id: string;
  type: 'matter' | 'document' | 'client';
  title: string;
  subtitle: string;
  archivedDate: string;
  reason: string;
  size?: string;
}

const initialArchivedItems: ArchivedItem[] = [
  { id: 'A-001', type: 'matter', title: 'کێشەی زەوی و زار - سلێمانی', subtitle: 'موکیل: ئاسۆ عەبدوڵا', archivedDate: '2023-12-15', reason: 'کەیسەکە کۆتایی هات' },
  { id: 'A-002', type: 'document', title: 'گرێبەستی کۆن - ٢٠٢٢', subtitle: 'کەیسی #C-0450', archivedDate: '2024-01-10', reason: 'بەسەرچوونی ماوە', size: '2.4 MB' },
  { id: 'A-003', type: 'client', title: 'کۆمپانیای ئاسیا', subtitle: 'پەیوەندی کۆتایی هات', archivedDate: '2023-11-20', reason: 'داواکاری موکیل' },
  { id: 'A-004', type: 'matter', title: 'داوای جیابوونەوە', subtitle: 'موکیل: نەزانراو', archivedDate: '2024-02-05', reason: 'کشانەوەی پارێزەر' },
];

const ArchivePage: React.FC = () => {
  const [items] = useState(initialArchivedItems);
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (type: ArchivedItem['type']) => {
    switch (type) {
      case 'matter': return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'document': return <FileText className="w-5 h-5 text-purple-500" />;
      case 'client': return <Users className="w-5 h-5 text-green-500" />;
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-gray-100 rounded-xl border border-surface-border">
              <Folder className="w-6 h-6 text-gray-500" />
           </div>
           <div>
              <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">ئەرشیف</h1>
              <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی کەیسە داخراوەکان و بەڵگەنامە کۆنەکان.</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-surface-border rounded text-text-main font-bold text-sm hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            <span>داگرتنی هەمووی</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded border border-surface-border flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-grow min-w-[300px]">
          <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="گەڕان لە ئەرشیف..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-surface-border rounded py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand-accent text-text-main text-sm font-medium transition-all" 
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="px-4 py-2.5 bg-white border border-surface-border rounded text-text-muted font-bold text-xs hover:text-text-main transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>فلتەر</span>
           </button>
           <button className="px-4 py-2.5 bg-white border border-surface-border rounded text-text-muted font-bold text-xs hover:text-text-main transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>بەروار</span>
           </button>
        </div>
      </div>

      {/* Archive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              key={item.id} 
              className="bg-white p-5 rounded-xl border border-surface-border shadow-sm hover:border-brand-accent/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-surface-border group-hover:bg-brand-primary/5 transition-colors">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-main group-hover:text-brand-accent transition-colors">{item.title}</h3>
                    <p className="text-xs text-text-muted font-medium mt-0.5">{item.subtitle}</p>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1">
                          <History className="w-3 h-3" />
                          {item.archivedDate}
                       </span>
                       {item.size && (
                         <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                           {item.size}
                         </span>
                       )}
                    </div>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-text-main transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-surface-border flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">هۆکار:</span>
                    <span className="text-[10px] font-bold text-text-main">{item.reason}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-brand-accent hover:bg-brand-primary/5 rounded transition-all" title="گەڕاندنەوە">
                       <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-1.5 text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">
                       بینین
                       <ChevronRight className="w-3 h-3" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-300">
           <Folder className="w-16 h-16 mb-4 opacity-10" />
           <p className="text-sm font-bold uppercase tracking-widest opacity-20">هیچ ئەنجامێک نەدۆزرایەوە</p>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
