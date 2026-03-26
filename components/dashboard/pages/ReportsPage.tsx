
import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter, 
  FileText, 
  Users, 
  Briefcase, 
  DollarSign,
  ChevronRight,
  Printer,
  Share2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../../../lib/utils';

const caseTypeData = [
  { name: 'مەدەنی', value: 45, color: '#3b82f6' },
  { name: 'سزایی', value: 30, color: '#ef4444' },
  { name: 'باری کەسی', value: 25, color: '#10b981' },
  { name: 'بازرگانی', value: 20, color: '#f59e0b' },
];

const revenueData = [
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 5200 },
  { month: 'Mar', amount: 4800 },
  { month: 'Apr', amount: 6100 },
  { month: 'May', amount: 5900 },
  { month: 'Jun', amount: 7200 },
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'matters' | 'finance' | 'clients'>('overview');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">ڕاپۆرتەکان و شیکاری</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بینینی ئامارەکان و داتاکانی نووسینگە بە شێوەیەکی گرافیکی.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-surface-border rounded text-text-main font-bold text-sm hover:bg-gray-50 transition-all">
            <Printer className="w-4 h-4" />
            <span>چاپکردن</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded font-bold text-sm hover:bg-blue-700 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            <span>داگرتنی PDF</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-border overflow-x-auto pb-px scrollbar-hide">
        {[
          { id: 'overview', label: 'گشتی', icon: BarChart3 },
          { id: 'matters', label: 'کەیسەکان', icon: Briefcase },
          { id: 'finance', label: 'دارایی', icon: DollarSign },
          { id: 'clients', label: 'موکیلەکان', icon: Users },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap",
              activeTab === tab.id ? "text-brand-accent" : "text-text-muted hover:text-text-main"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTabReport" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-base font-bold text-text-main">داهاتی مانگانە</h3>
                <p className="text-xs text-text-muted font-medium mt-1">بەراوردکردنی داهاتی ٦ مانگی ڕابردوو.</p>
              </div>
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold">
                <TrendingUp className="w-3 h-3" />
                +12.5%
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    labelStyle={{ fontWeight: 700, marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Case Distribution */}
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base font-bold text-text-main">دابەشبوونی کەیسەکان بەپێی جۆر</h3>
              <button className="text-[10px] font-bold text-brand-accent uppercase tracking-widest hover:underline">بینینی هەمووی</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={caseTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {caseTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {caseTypeData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-bold text-text-main">{item.name}</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-text-muted">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-brand-accent p-6 rounded-xl text-white shadow-lg shadow-blue-200 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">کۆی گشتی داهات</p>
              <h2 className="text-3xl font-bold mt-2 font-mono">$124,500</h2>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest">ئەمساڵ</div>
                <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3" />
                  +24%
                </div>
              </div>
            </div>
            <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-6 border-b border-surface-border pb-3">ڕاپۆرتە خێراکان</h3>
            <div className="space-y-2">
              {[
                { label: 'کەیسە کراوەکان', count: 42, icon: Briefcase, color: 'text-blue-500' },
                { label: 'موکیلە چالاکەکان', count: 128, icon: Users, color: 'text-green-500' },
                { label: 'داواکارییە هەڵپەسێردراوەکان', count: 15, icon: FileText, color: 'text-amber-500' },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 rounded hover:bg-gray-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-4 h-4", item.color)} />
                    <span className="text-sm font-bold text-text-main group-hover:text-brand-accent transition-colors">{item.label}</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-text-muted">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-6 border-b border-surface-border pb-3">چالاکترین پارێزەران</h3>
            <div className="space-y-4">
              {[
                { name: 'ئاراس ئەحمەد', cases: 12, performance: 95 },
                { name: 'سارا عەلی', cases: 9, performance: 88 },
                { name: 'هێمن عومەر', cases: 7, performance: 92 },
              ].map((lawyer, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-text-main">{lawyer.name}</span>
                    <span className="text-text-muted">{lawyer.cases} کەیس</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${lawyer.performance}%` }}
                      className="h-full bg-brand-accent rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
