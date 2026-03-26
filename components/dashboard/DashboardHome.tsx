
import React from 'react';
import StatCard from './StatCard';
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  BarChart3, 
  Scale, 
  Clock, 
  CheckSquare,
  Plus,
  Gavel,
  ChevronRight,
  TrendingUp,
  Calendar as CalendarIcon,
  AlertCircle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import type { Page } from '../Dashboard';
import { cn } from '../../lib/utils';

interface DashboardHomeProps {
  setActivePage: (page: Page) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ setActivePage }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-primary p-8 rounded border border-brand-primary shadow-sm relative overflow-hidden group"
      >
        <div className="absolute right-0 top-0 -mt-16 -mr-16 pointer-events-none hidden xl:block opacity-10 group-hover:opacity-20 transition-opacity duration-700" aria-hidden="true">
          <Scale className="w-80 h-80 text-white rotate-12" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-white/10 text-white rounded border border-white/20 text-[9px] font-bold uppercase tracking-widest">
                بەخێربێیتەوە
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-[9px] font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                چوارشەممە، ٢٥ ئازار
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl text-white font-bold mb-4 tracking-tight leading-tight">بەخێربێیتەوە، پارێزەر ئارام 👋</h1>
            <p className="text-white/70 text-base font-medium leading-relaxed mb-8">ئەمڕۆ ٣ دانیشتنی دادگات هەیە و ٢ کەیسی نوێ زیادکراون. هەموو شتێک ئامادەیە بۆ دەستپێکردن.</p>
            
            <div className="flex flex-wrap gap-3">
               <button 
                onClick={() => setActivePage('cases')} 
                className="group flex items-center bg-brand-accent text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
               >
                  <Plus className="w-4 h-4 ml-2" />
                  کەیسی نوێ
               </button>
               <button 
                onClick={() => setActivePage('tasks')} 
                className="flex items-center bg-white/10 text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all active:scale-95"
               >
                  <CheckSquare className="w-4 h-4 ml-2" />
                  بینینی کارەکان
               </button>
            </div>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-3">
             {[
               { val: '١٢', label: 'کەیسی کراوە', color: 'text-white' },
               { val: '٠٨', label: 'کاری ماوە', color: 'text-brand-accent' },
               { val: '٠٣', label: 'دانیشتنی دادگا', color: 'text-green-400' },
               { val: '٠٥', label: 'موکیلی نوێ', color: 'text-blue-400' },
             ].map((s, i) => (
               <div key={i} className="p-5 bg-white/5 rounded border border-white/10">
                  <div className={cn("text-2xl font-bold mb-1 font-mono", s.color)}>{s.val}</div>
                  <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{s.label}</div>
               </div>
             ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Briefcase}
          title="کەیسی چالاک"
          value="14"
          change="+2"
          changeType="increase"
          color="blue"
        />
        <StatCard 
          icon={Users}
          title="کۆی موکیلەکان"
          value="89"
          change="+5"
          changeType="increase"
          color="green"
        />
        <StatCard 
          icon={DollarSign}
          title="داهاتی مانگانە"
          value="$12,500"
          change="-3%"
          changeType="decrease"
          color="amber"
        />
        <StatCard 
          icon={CheckSquare}
          title="کاری ماوە"
          value="08"
          change="ئەم هەفتەیە"
          changeType="neutral"
          color="indigo"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upcoming Hearings */}
        <div className="lg:col-span-8 space-y-8">
           <section className="bg-white border border-surface-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-surface-border flex items-center justify-between bg-gray-50">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded border border-red-100">
                      <Gavel className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main tracking-tight">دانیشتنەکانی ئەم هەفتەیە</h3>
                      <p className="text-text-muted text-[9px] font-bold uppercase tracking-widest">خشتەی دانیشتنەکانی دادگا</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setActivePage('calendar')} 
                  className="flex items-center gap-1.5 text-brand-accent font-bold text-[10px] uppercase tracking-widest hover:underline transition-all"
                 >
                   هەمووی ببینە
                   <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                 </button>
              </div>
              <div className="p-6 space-y-3">
                 {[
                    { date: 'ئەمڕۆ - 10:00', case: 'کەیسی #C-0601', courtroom: 'هۆڵی ٣', title: 'دانیشتنی یەکەم', status: 'گرنگ' },
                    { date: 'سبەی - 09:30', case: 'کەیسی #C-0603', courtroom: 'هۆڵی ١', title: 'بەرگری کۆتایی', status: 'ئاسایی' },
                    { date: 'پێنجشەممە - 11:15', case: 'کەیسی #C-0584', courtroom: 'هۆڵی ٤', title: 'شایەتی هێنان', status: 'ئاسایی' },
                 ].map((item, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={i} 
                      className="flex items-center p-4 bg-white border border-surface-border hover:border-brand-accent/30 transition-all group"
                    >
                       <div className="w-12 h-12 bg-gray-50 border border-surface-border flex items-center justify-center ml-4 group-hover:border-brand-accent/20 transition-all">
                          <Clock className="w-6 h-6 text-gray-400 group-hover:text-brand-accent transition-colors" />
                       </div>
                       <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-base font-bold text-text-main tracking-tight">{item.title}</h4>
                            <span className="text-brand-accent font-mono text-xs font-bold">{item.case}</span>
                          </div>
                          <p className="text-text-muted text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <CalendarIcon className="w-2.5 h-2.5" />
                            {item.date}
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            {item.courtroom}
                          </p>
                       </div>
                       <div className="hidden sm:flex flex-col items-end gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border",
                            item.status === 'گرنگ' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                          )}>{item.status}</span>
                          <button className="p-1 text-gray-300 hover:text-brand-accent transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </section>

           <section className="bg-white border border-surface-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-surface-border flex items-center justify-between bg-gray-50">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded border border-blue-100">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main tracking-tight">ئاماری مانگانە</h3>
                      <p className="text-text-muted text-[9px] font-bold uppercase tracking-widest">چالاکییەکانی هەفتەی ڕابردوو</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded">
                    <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">+١٢٪ گەشەکردن</span>
                 </div>
              </div>
              <div className="p-8">
                <div className="h-48 flex items-end justify-between gap-3 px-2">
                   {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                         <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                            className="w-full bg-gray-100 rounded-t relative overflow-hidden group-hover:bg-brand-accent transition-all duration-300"
                         >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                         </motion.div>
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                           {h}%
                         </div>
                      </div>
                   ))}
                </div>
                <div className="flex justify-between mt-6 px-2 text-[9px] text-text-muted font-bold uppercase tracking-widest">
                   <span>شەم</span><span>١شەم</span><span>٢شەم</span><span>٣شەم</span><span>٤شەم</span><span>٥شەم</span><span>هەینی</span>
                </div>
              </div>
           </section>
        </div>

        {/* Pending Tasks */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white border border-surface-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-surface-border flex items-center justify-between bg-gray-50">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded border border-indigo-100">
                      <CheckSquare className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-text-main tracking-tight">کارەکان</h3>
                 </div>
                 <button 
                  onClick={() => setActivePage('tasks')} 
                  className="text-brand-accent font-bold text-[10px] uppercase tracking-widest hover:underline transition-all"
                 >
                   هەمووی
                 </button>
              </div>
              <div className="p-6 space-y-3">
                 {[
                    { title: 'ئامادەکردنی بەڵگەکان', priority: 'High', color: 'text-red-600', bg: 'bg-red-50' },
                    { title: 'تەلەفۆن بۆ موکیل ئارام', priority: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50' },
                    { title: 'وەرگرتنی ڕەزامەندی', priority: 'Low', color: 'text-green-600', bg: 'bg-green-50' },
                    { title: 'کۆپی کردنی دۆسیەکان', priority: 'Low', color: 'text-green-600', bg: 'bg-green-50' },
                 ].map((task, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={i} 
                      className="flex items-center gap-3 p-4 bg-white border border-surface-border hover:border-gray-300 transition-all group"
                    >
                       <div className="relative flex items-center justify-center">
                         <input type="checkbox" className="peer appearance-none w-5 h-5 rounded border border-gray-300 checked:bg-brand-accent checked:border-brand-accent transition-all cursor-pointer" />
                         <CheckSquare className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                       </div>
                       <div className="flex-grow">
                          <p className="text-sm font-bold text-text-main group-hover:text-brand-primary transition-colors tracking-tight">{task.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={cn("text-[9px] font-bold uppercase tracking-wider", task.color)}>{task.priority}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">ئەمڕۆ</span>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </section>

           <section className="relative bg-brand-accent p-8 rounded border border-blue-700 shadow-lg overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Sparkles className="w-40 h-40 text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center mb-6 border border-white/30">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-white text-xl font-bold tracking-tight mb-3 leading-tight">💡 ئایا دەزانیت؟</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed mb-8">
                   تۆمارکردنی کات بۆ کەیسەکان یارمەتیدەرە بۆ وردبینی لە حیسابات و وەرگرتنی شایستەی دارایی ڕاستەقینە.
                </p>
                <button className="flex items-center gap-2 text-[9px] font-bold text-white uppercase tracking-widest hover:translate-x-1 transition-transform">
                   فێربوونی زیاتر
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
