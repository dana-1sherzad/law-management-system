
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Briefcase, 
  Users, 
  FileText, 
  Calendar, 
  ChevronRight,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import type { Page } from '../../Dashboard';

interface SearchResult {
  id: string;
  type: 'matter' | 'client' | 'document' | 'task';
  title: string;
  subtitle: string;
  page: Page;
  meta?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActivePage: (page: Page) => void;
}

const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, setActivePage }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.length > 1) {
      // Mock search results
      const mockResults: SearchResult[] = [
        { id: 'C-0601', type: 'matter', title: 'کۆمپانیای هێمن vs وەزارەتی بازرگانی', subtitle: 'کەیسی مەدەنی - چالاک', page: 'cases', meta: 'Matter' },
        { id: 'CL-001', type: 'client', title: 'ئارام خالید', subtitle: 'موکیلی تاکەکەسی', page: 'clients', meta: 'Client' },
        { id: 'D-001', type: 'document', title: 'گرێبەستی هاوبەشی.pdf', subtitle: 'کەیسی #C-0601', page: 'documents', meta: 'Document' },
        { id: 'T-001', type: 'task', title: 'ئامادەکردنی بریکارنامە', subtitle: 'بۆ ئارام خالید', page: 'tasks', meta: 'Task' },
      ].filter(r => r.title.toLowerCase().includes(query.toLowerCase())) as SearchResult[];
      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setActivePage(result.page);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-text-main/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-surface-border overflow-hidden"
      >
        <div className="p-4 border-b border-surface-border flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            autoFocus
            type="text" 
            placeholder="گەڕان بەدوای هەموو شتێک (کەیس، موکیل، بەڵگەنامە...)" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-lg font-bold text-text-main placeholder:text-gray-300"
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-100 border border-surface-border rounded text-[10px] font-bold text-text-muted uppercase tracking-widest">
            ESC
          </kbd>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
          {query.length > 0 ? (
            results.length > 0 ? (
              <div className="space-y-1">
                <p className="px-3 py-2 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">ئەنجامەکان</p>
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-brand-accent/5 group transition-all text-right"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2.5 rounded-lg border transition-colors",
                        result.type === 'matter' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                        result.type === 'client' ? 'bg-green-50 border-green-100 text-green-600' :
                        result.type === 'document' ? 'bg-purple-50 border-purple-100 text-purple-600' :
                        'bg-amber-50 border-amber-100 text-amber-600'
                      )}>
                        {result.type === 'matter' ? <Briefcase className="w-4 h-4" /> :
                         result.type === 'client' ? <Users className="w-4 h-4" /> :
                         result.type === 'document' ? <FileText className="w-4 h-4" /> :
                         <Calendar className="w-4 h-4" />}
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-bold text-text-main group-hover:text-brand-accent transition-colors">{result.title}</h4>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">{result.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest bg-gray-100 px-2 py-1 rounded border border-surface-border group-hover:bg-white transition-colors">
                         {result.meta}
                       </span>
                       <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-accent transition-all group-hover:translate-x-1" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-surface-border">
                   <Search className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm font-bold text-text-muted">هیچ ئەنجامێک نەدۆزرایەوە بۆ "{query}"</p>
              </div>
            )
          ) : (
            <div className="p-4 space-y-6">
               <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3">گەڕانە خێراکان</p>
                  <div className="grid grid-cols-2 gap-2">
                     {[
                       { label: 'کەیسە چالاکەکان', page: 'cases' },
                       { label: 'موکیلە نوێیەکان', page: 'clients' },
                       { label: 'ئەرکە هەڵپەسێردراوەکان', page: 'tasks' },
                       { label: 'ڕاپۆرتە داراییەکان', page: 'finance' },
                     ].map((item, i) => (
                       <button 
                        key={i} 
                        onClick={() => { setActivePage(item.page as Page); onClose(); }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-surface-border hover:border-brand-accent hover:bg-white transition-all group"
                       >
                          <span className="text-xs font-bold text-text-main group-hover:text-brand-accent">{item.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-accent" />
                       </button>
                     ))}
                  </div>
               </div>
               
               <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-accent mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">دوایین گەڕانەکان</p>
                    <div className="flex flex-wrap gap-2">
                       {['کۆمپانیای هێمن', 'گرێبەست', 'ئارام خالید'].map((tag, i) => (
                         <button key={i} className="text-[10px] font-bold text-brand-accent/70 hover:text-brand-accent bg-white px-2 py-1 rounded border border-blue-100 transition-colors">
                           {tag}
                         </button>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-50 border-t border-surface-border flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                 <kbd className="px-1.5 py-0.5 bg-white border border-surface-border rounded text-[9px] font-bold text-text-muted">↵</kbd>
                 <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">هەڵبژاردن</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <kbd className="px-1.5 py-0.5 bg-white border border-surface-border rounded text-[9px] font-bold text-text-muted">↑↓</kbd>
                 <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">جووڵە</span>
              </div>
           </div>
           <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Legal CMS v2.4</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalSearchModal;
