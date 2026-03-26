
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar,
  Filter,
  Download,
  Plus,
  PieChart as PieChartIcon,
  BarChart3,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from '../../../lib/utils';

const chartData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
];

const pieData = [
  { name: 'کرێ', value: 400, color: '#3b82f6' },
  { name: 'مووچە', value: 300, color: '#10b981' },
  { name: 'کەرەستە', value: 300, color: '#f59e0b' },
  { name: 'باج', value: 200, color: '#ef4444' },
];

const summaryData = [
  { title: 'کۆی داهات', value: '$45,231.89', change: '+20.1%', trend: 'up', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
  { title: 'کۆی خەرجی', value: '$21,784.32', change: '+12.5%', trend: 'up', icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  { title: 'قازانجی سافی', value: '$23,447.57', change: '+28.2%', trend: 'up', icon: DollarSign, color: 'text-brand-accent', bg: 'bg-blue-50', border: 'border-blue-100' },
];

const transactionsData = [
  { id: 'T-001', desc: 'پارەی کەیسی #C-0601', date: '2024-07-28', amount: 2500, type: 'income', category: 'Legal Fees' },
  { id: 'T-002', desc: 'کرێی ئۆفیس - مانگی ٧', date: '2024-07-25', amount: -1200, type: 'expense', category: 'Rent' },
  { id: 'T-003', desc: 'کڕینی کەرەستەی ئۆفیس', date: '2024-07-22', amount: -150, type: 'expense', category: 'Supplies' },
  { id: 'T-004', desc: 'پارەی کەیسی #C-0584 (کۆتایی)', date: '2024-07-20', amount: 5000, type: 'income', category: 'Legal Fees' },
];

const FinancePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">دارایی</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">چاودێریکردنی داهات، خەرجی و ڕاپۆرتە داراییەکانی ئۆفیس.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center bg-white text-text-main font-bold px-4 py-2 rounded border border-surface-border hover:bg-gray-50 transition-all text-xs">
            <Download className="w-4 h-4 ml-2" />
            <span>ڕاپۆرت</span>
          </button>
          <button className="flex items-center bg-brand-accent text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-xs">
            <Plus className="w-4 h-4 ml-2" />
            <span>مامەڵەی نوێ</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryData.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={item.title} 
            className="bg-white p-6 rounded border border-surface-border shadow-sm group hover:border-brand-accent/20 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2.5 rounded border", item.bg, item.border)}>
                <item.icon className={cn("w-5 h-5", item.color)} />
              </div>
              <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono", item.bg, item.border, item.color)}>
                {item.change}
              </span>
            </div>
            <h3 className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-1">{item.title}</h3>
            <p className="text-2xl font-bold text-text-main group-hover:text-brand-accent transition-colors font-mono">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded border border-surface-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-text-main flex items-center gap-2 uppercase tracking-widest">
              <BarChart3 className="w-4 h-4 text-brand-accent" />
              ڕەوتی داهات و خەرجی
            </h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 rounded border border-surface-border">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-[9px] font-bold text-text-muted uppercase">داهات</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 rounded border border-surface-border">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-[9px] font-bold text-text-muted uppercase">خەرجی</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontStyle: 'italic' }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded border border-surface-border shadow-sm">
          <h2 className="text-sm font-bold text-text-main flex items-center gap-2 uppercase tracking-widest mb-6">
            <PieChartIcon className="w-4 h-4 text-brand-accent" />
            دابەشبوونی خەرجی
          </h2>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-surface-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">{item.name}</span>
                </div>
                <span className="text-[10px] font-bold text-text-main font-mono">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded border border-surface-border overflow-hidden shadow-sm">
        <div className="p-6 border-b border-surface-border flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-sm font-bold text-text-main uppercase tracking-widest">مێژووی مامەڵەکان</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute h-4 w-4 top-2 left-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="گەڕان..." 
                className="bg-white border border-surface-border rounded py-1.5 pl-9 pr-4 text-[10px] font-bold text-text-main focus:border-brand-accent outline-none w-40"
              />
            </div>
            <button className="p-2 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50 text-[9px] font-bold uppercase tracking-widest text-text-muted">
                <th className="px-6 py-3 border-b border-surface-border">ناسنامە</th>
                <th className="px-6 py-3 border-b border-surface-border">پێناسە</th>
                <th className="px-6 py-3 border-b border-surface-border">بەروار</th>
                <th className="px-6 py-3 border-b border-surface-border">جۆر</th>
                <th className="px-6 py-3 border-b border-surface-border text-left">بڕی پارە</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {transactionsData.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-text-muted text-[10px] font-bold">#{tx.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-text-main group-hover:text-brand-accent transition-colors text-xs">{tx.desc}</p>
                    <p className="text-[9px] text-text-muted font-bold uppercase tracking-tight">{tx.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-text-muted text-[10px] font-bold font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {tx.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border",
                      tx.type === 'income' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                    )}>
                      {tx.type === 'income' ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownLeft className="w-2.5 h-2.5" />}
                      {tx.type === 'income' ? 'داهات' : 'خەرجی'}
                    </div>
                  </td>
                  <td className={cn(
                    "px-6 py-4 font-bold text-sm text-left font-mono",
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-surface-border text-center">
          <button className="text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors">بینینی هەموو مامەڵەکان</button>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
