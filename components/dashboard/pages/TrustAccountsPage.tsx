
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  History, 
  User, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import Modal from '../shared/Modal';

interface TrustAccount {
  id: string;
  clientName: string;
  clientId: string;
  balance: number;
  lastActivity: string;
  status: 'Active' | 'Low Balance' | 'Inactive';
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  description: string;
  matterId?: string;
}

const initialAccounts: TrustAccount[] = [
  { id: 'TA-001', clientName: 'کۆمپانیای بازرگانیی هێمن', clientId: 'CL-001', balance: 15000, lastActivity: '2024-07-28', status: 'Active' },
  { id: 'TA-002', clientName: 'ئارام خالید', clientId: 'CL-002', balance: 2500, lastActivity: '2024-07-25', status: 'Active' },
  { id: 'TA-003', clientName: 'شیلان ئەحمەد', clientId: 'CL-003', balance: 150, lastActivity: '2024-07-20', status: 'Low Balance' },
  { id: 'TA-004', clientName: 'حکومەتی هەرێم', clientId: 'CL-004', balance: 50000, lastActivity: '2024-07-29', status: 'Active' },
];

const TrustAccountsPage: React.FC = () => {
  const [accounts] = useState(initialAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAccounts = accounts.filter(acc => 
    acc.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    acc.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-primary" />
            هەژمارە سپێردراوەکان (Trust Accounts)
          </h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی پارەی سپێردراوی موکیلەکان و چاودێریکردنی جوڵە داراییەکان.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center bg-white text-text-main border border-surface-border font-bold px-4 py-2 rounded hover:bg-gray-50 transition-all text-xs">
            <Download className="w-4 h-4 ml-2" />
            <span>ڕاپۆرتی گشتی</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-brand-accent text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-xs"
          >
            <Plus className="w-4 h-4 ml-2" />
            <span>سپاردنی نوێ</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'کۆی پارەی سپێردراو', value: '$67,650', icon: DollarSign, color: 'text-brand-primary', bg: 'bg-blue-50' },
          { label: 'هەژمارە چالاکەکان', value: accounts.length, icon: User, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'هۆشداری باڵانس', value: accounts.filter(a => a.status === 'Low Balance').length, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={stat.label} 
            className="bg-white p-6 rounded border border-surface-border flex items-center gap-4 shadow-sm"
          >
            <div className={cn("p-3 rounded border", stat.bg, stat.color.replace('text', 'border').replace('600', '100'))}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-text-main font-mono">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded border border-surface-border flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="گەڕان بەدوای هەژمار یان موکیل..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-surface-border rounded py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand-accent text-text-main text-sm font-medium transition-all" 
          />
        </div>
        <button className="p-2.5 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded border border-surface-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50 text-[9px] font-bold uppercase tracking-widest text-text-muted border-b border-surface-border">
                <th className="p-5">هەژمار</th>
                <th className="p-5">موکیل</th>
                <th className="p-5">باڵانس</th>
                <th className="p-5">دوایین چالاکی</th>
                <th className="p-5">بارودۆخ</th>
                <th className="p-5 text-center">کردارەکان</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              <AnimatePresence mode="popLayout">
                {filteredAccounts.map((account) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={account.id} 
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="p-5">
                      <span className="font-mono text-brand-accent font-bold text-sm">#{account.id}</span>
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-text-main text-sm group-hover:text-brand-accent transition-colors">{account.clientName}</p>
                      <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">ID: {account.clientId}</p>
                    </td>
                    <td className="p-5">
                      <span className="font-mono text-base font-bold text-text-main">${account.balance.toLocaleString()}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-text-muted text-xs font-medium font-mono">
                        <History className="w-3.5 h-3.5" />
                        {account.lastActivity}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={cn(
                        "px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border",
                        account.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 
                        account.status === 'Low Balance' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-gray-50 text-gray-400 border-gray-100'
                      )}>
                        {account.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-brand-accent hover:border-brand-accent/30 rounded transition-all" title="بینینی مێژوو">
                          <History className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-green-600 hover:border-green-600/30 rounded transition-all" title="سپاردن">
                          <ArrowDownLeft className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-white border border-surface-border text-gray-400 hover:text-red-500 hover:border-red-500/30 rounded transition-all" title="کێشانەوە">
                          <ArrowUpRight className="w-4 h-4" />
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="مامەڵەی نوێ لە هەژماری سپێردراو">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex-1 py-3 bg-green-600 text-white font-bold rounded text-xs shadow-sm flex items-center justify-center gap-2">
              <ArrowDownLeft className="w-4 h-4" />
              سپاردن (Deposit)
            </button>
            <button className="flex-1 py-3 bg-white text-text-main border border-surface-border font-bold rounded text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-red-500" />
              کێشانەوە (Withdrawal)
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">هەڵبژاردنی موکیل</label>
              <select className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm appearance-none">
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.clientName} (#{acc.id})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">بڕی پارە ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input type="number" placeholder="0.00" className="w-full bg-white border border-surface-border rounded p-3 pl-9 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">تێبینی / هۆکار</label>
              <textarea placeholder="بۆ نموونە: پێشەکی بۆ کەیسی #C-0601" className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm h-24 resize-none" />
            </div>
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

export default TrustAccountsPage;
