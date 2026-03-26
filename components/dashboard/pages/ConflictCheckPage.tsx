
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  User, 
  Briefcase, 
  History,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';

interface ConflictResult {
  id: string;
  type: 'client' | 'opposing_party' | 'opposing_counsel' | 'related_party';
  name: string;
  matterId: string;
  matterTitle: string;
  matchType: 'Exact' | 'Partial';
  status: 'Active' | 'Closed';
  role: string;
}

const ConflictCheckPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ConflictResult[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults: ConflictResult[] = [
        { id: '1', type: 'opposing_party', name: searchQuery, matterId: 'C-0584', matterTitle: 'کێشەی زەوی و زار', matchType: 'Exact', status: 'Closed', role: 'لایەنی بەرامبەر' },
        { id: '2', type: 'client', name: searchQuery + ' بازرگانی', matterId: 'C-0601', matterTitle: 'گرێبەستی بازرگانی', matchType: 'Partial', status: 'Active', role: 'موکیل' },
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto border border-brand-primary/20">
          <ShieldAlert className="w-8 h-8 text-brand-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">سیستەمی پشکنینی ناکۆکی (Conflict Check)</h1>
        <p className="text-text-muted text-sm font-medium">پشکنینی هەموو لایەنەکان پێش وەرگرتنی کەیسی نوێ بۆ دڵنیابوونەوە لە نەبوونی ناکۆکی لە بەرژەوەندییەکان.</p>
      </div>

      {/* Search Box */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="ناوی کەس، کۆمپانیا، یان پارێزەر بنووسە..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full bg-white border-2 border-surface-border rounded-xl py-4 pl-12 pr-32 text-text-main font-bold focus:border-brand-accent outline-none transition-all shadow-sm text-lg"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute inset-y-2 right-2 px-6 bg-brand-accent text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm uppercase tracking-widest"
          >
            {isSearching ? 'دەپشکنرێت...' : 'پشکنین'}
          </button>
        </form>
        <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-bold text-text-muted uppercase tracking-widest">
           <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> موکیلەکان</div>
           <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> لایەنی بەرامبەر</div>
           <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> پارێزەران</div>
           <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> لایەنی پەیوەندیدار</div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto min-h-[300px]">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div 
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-4"
            >
              <div className="w-12 h-12 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-text-muted animate-pulse">گەڕان لە بنکەدراوەی کەیسەکان و موکیلەکان...</p>
            </motion.div>
          ) : results ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-surface-border pb-4">
                <h2 className="text-sm font-bold text-text-main uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4 text-brand-accent" />
                  ئەنجامەکانی پشکنین ({results.length})
                </h2>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                  results.length > 0 ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-green-50 text-green-600 border-green-100'
                )}>
                  {results.length > 0 ? 'ئەگەری ناکۆکی هەیە' : 'هیچ ناکۆکییەک نییە'}
                </span>
              </div>

              {results.length > 0 ? (
                <div className="grid gap-4">
                  {results.map((res, i) => (
                    <motion.div 
                      key={res.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-5 rounded-xl border border-surface-border shadow-sm hover:border-brand-accent/30 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className={cn(
                            "p-3 rounded-lg border",
                            res.type === 'client' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-red-50 border-red-100 text-red-600'
                          )}>
                            {res.type === 'client' ? <User className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-text-main group-hover:text-brand-accent transition-colors">{res.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{res.role}</span>
                              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                              <span className={cn(
                                "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-widest",
                                res.matchType === 'Exact' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                              )}>
                                {res.matchType} Match
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">پەیوەست بە کەیسی</p>
                           <div className="flex items-center gap-2 justify-end">
                              <span className="text-sm font-bold text-text-main">{res.matterTitle}</span>
                              <span className="text-[10px] font-mono font-bold text-brand-accent bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">#{res.matterId}</span>
                           </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-surface-border flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <History className="w-3.5 h-3.5 text-gray-400" />
                           <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">بارودۆخی کەیس: {res.status}</span>
                         </div>
                         <button className="flex items-center gap-1.5 text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">
                           بینینی وردەکاری
                           <ChevronRight className="w-3 h-3" />
                         </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-2xl border-2 border-dashed border-surface-border">
                   <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 opacity-20" />
                   <p className="text-lg font-bold text-text-main">هیچ ناکۆکییەک نەدۆزرایەوە</p>
                   <p className="text-text-muted text-sm">ئەم ناوە لە هیچ کەیسێکی پێشوو یان ئێستادا نییە.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-300">
               <ShieldAlert className="w-20 h-20 mb-4 opacity-10" />
               <p className="text-sm font-bold uppercase tracking-widest opacity-20">ئامادەیە بۆ پشکنین</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Security Notice */}
      <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-4">
        <Info className="w-5 h-5 text-brand-accent mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-1">تێبینی گرنگ</h4>
          <p className="text-xs text-brand-accent/80 leading-relaxed font-medium">
            ئەم پشکنینە هەموو بنکەدراوەی نووسینگە دەگرێتەوە، لەوانە موکیلەکان، لایەنی بەرامبەر، پارێزەرانی بەرامبەر، و لایەنە پەیوەندیدارەکان. هەمیشە پێش وەرگرتنی هەر کەیسێکی نوێ ئەم پشکنینە ئەنجام بدە.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConflictCheckPage;
