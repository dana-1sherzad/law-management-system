
import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  FileCode, 
  User, 
  Users, 
  Gavel, 
  MapPin,
  Plus,
  MoreVertical,
  Download,
  ExternalLink,
  History,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import Dropdown from '../shared/Dropdown';

interface MatterDetailsProps {
  matterId: string;
  onBack: () => void;
}

type TabType = 'overview' | 'calendar' | 'tasks' | 'documents' | 'billing' | 'communication' | 'notes';

const MatterDetailsPage: React.FC<MatterDetailsProps> = ({ matterId, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock data for the matter
  const matter = {
    id: matterId,
    title: 'کەیسی بازرگانیی هێمن',
    client: 'کۆمپانیای بازرگانیی هێمن',
    type: 'بازرگانی',
    status: 'چالاک',
    court: 'دادگای بەرایی هەولێر',
    judge: 'قازی محەمەد عەلی',
    opposingParty: 'کۆمپانیای نەورۆز',
    opposingCounsel: 'پارێزەر ئاسۆ خالید',
    assignedTo: ['پارێزەر دانا', 'سکرتێر شیلان'],
    openedDate: '2024-05-10',
    nextHearing: '2024-08-15',
    totalBilled: 12500,
    totalPaid: 8000,
    trackedTime: 32400, // 9 hours
  };

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: 'پێداچوونەوە', icon: FileText },
    { id: 'calendar', label: 'ساڵنامە', icon: Calendar },
    { id: 'tasks', label: 'ئەرکەکان', icon: CheckSquare },
    { id: 'documents', label: 'بەڵگەنامەکان', icon: FileCode },
    { id: 'billing', label: 'دارایی', icon: DollarSign },
    { id: 'communication', label: 'پەیوەندی', icon: MessageSquare },
    { id: 'notes', label: 'تێبینییەکان', icon: History },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded border border-surface-border shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded transition-colors text-text-muted"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-brand-accent bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono">#{matter.id}</span>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border bg-green-50 text-green-600 border-green-100">
                {matter.status}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl text-text-main font-bold tracking-tight">{matter.title}</h1>
            <p className="text-text-muted text-xs font-medium flex items-center gap-1.5 mt-1">
              <User className="w-3.5 h-3.5" />
              موکیل: {matter.client}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center bg-white text-text-main border border-surface-border font-bold px-4 py-2 rounded hover:bg-gray-50 transition-all text-xs">
            <Download className="w-4 h-4 ml-2" />
            <span>داگرتنی ڕاپۆرت</span>
          </button>
          <button className="flex items-center bg-brand-accent text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-xs">
            <Plus className="w-4 h-4 ml-2" />
            <span>کرداری نوێ</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto no-scrollbar bg-white rounded border border-surface-border p-1 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-brand-primary text-white shadow-sm" 
                : "text-text-muted hover:text-text-main hover:bg-gray-50"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab matter={matter} />}
            {activeTab === 'calendar' && <CalendarTab matterId={matter.id} />}
            {activeTab === 'tasks' && <TasksTab matterId={matter.id} />}
            {activeTab === 'documents' && <DocumentsTab matterId={matter.id} />}
            {activeTab === 'billing' && <BillingTab matterId={matter.id} />}
            {activeTab === 'communication' && <CommunicationTab matterId={matter.id} />}
            {activeTab === 'notes' && <NotesTab matterId={matter.id} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const OverviewTab: React.FC<{ matter: any }> = ({ matter }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Main Info */}
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white p-6 rounded border border-surface-border shadow-sm">
        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-accent" />
          زانیارییە سەرەکییەکان
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">دادگا</p>
              <div className="flex items-center gap-2 text-text-main font-bold text-sm">
                <Gavel className="w-4 h-4 text-red-500" />
                {matter.court}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">قازی</p>
              <div className="flex items-center gap-2 text-text-main font-bold text-sm">
                <User className="w-4 h-4 text-brand-accent" />
                {matter.judge}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">لایەنی بەرامبەر</p>
              <div className="flex items-center gap-2 text-text-main font-bold text-sm">
                <Users className="w-4 h-4 text-amber-500" />
                {matter.opposingParty}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">پارێزەری بەرامبەر</p>
              <div className="flex items-center gap-2 text-text-main font-bold text-sm">
                <User className="w-4 h-4 text-gray-400" />
                {matter.opposingCounsel}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">بەرواری دەستپێکردن</p>
              <div className="flex items-center gap-2 text-text-main font-bold text-sm font-mono">
                <Calendar className="w-4 h-4 text-blue-500" />
                {matter.openedDate}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">دانیشتنی داهاتوو</p>
              <div className="flex items-center gap-2 text-brand-accent font-bold text-sm font-mono bg-blue-50 px-2 py-1 rounded border border-blue-100 w-fit">
                <Clock className="w-4 h-4" />
                {matter.nextHearing}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded border border-surface-border shadow-sm">
        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-brand-accent" />
            دوایین چالاکییەکان
          </div>
          <button className="text-[9px] text-brand-primary hover:underline">بینینی هەمووی</button>
        </h3>
        <div className="space-y-4">
          {[
            { action: 'بەڵگەنامەی نوێ بارکرا', user: 'دانا', time: '٢ کاتژمێر پێش ئێستا', icon: FileCode, color: 'text-blue-500' },
            { action: 'تێبینی زیادکرا', user: 'شیلان', time: '٥ کاتژمێر پێش ئێستا', icon: MessageSquare, color: 'text-green-500' },
            { action: 'کاتی تۆمارکراو: ٢ کاتژمێر', user: 'دانا', time: 'دوێنێ', icon: Clock, color: 'text-amber-500' },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-surface-border">
              <div className={cn("p-2 rounded bg-gray-50 border border-surface-border", activity.color)}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-text-main">{activity.action}</p>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">لەلایەن {activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Sidebar Info */}
    <div className="space-y-6">
      <div className="bg-white p-6 rounded border border-surface-border shadow-sm">
        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          پوختەی دارایی
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-surface-border">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">کۆی پارەی داواکراو</span>
            <span className="text-sm font-bold text-text-main font-mono">${matter.totalBilled.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-100">
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">کۆی پارەی دراو</span>
            <span className="text-sm font-bold text-green-700 font-mono">${matter.totalPaid.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-amber-50 rounded border border-amber-100">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">ماوە</span>
            <span className="text-sm font-bold text-amber-700 font-mono">${(matter.totalBilled - matter.totalPaid).toLocaleString()}</span>
          </div>
          <button className="w-full py-2.5 bg-brand-primary text-white font-bold rounded text-[10px] uppercase tracking-widest shadow-sm hover:bg-brand-primary/90 transition-all">
            دەرکردنی وەسڵ
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded border border-surface-border shadow-sm">
        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-accent" />
          تیمی کارکردن
        </h3>
        <div className="space-y-3">
          {matter.assignedTo.map((member, i) => (
            <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">
                {member.charAt(member.indexOf(' ') + 1)}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-text-main group-hover:text-brand-accent transition-colors">{member}</p>
                <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">ئەندامی تیم</p>
              </div>
              <MoreVertical className="w-3.5 h-3.5 text-gray-300 group-hover:text-text-muted" />
            </div>
          ))}
          <button className="w-full py-2 border border-dashed border-surface-border text-text-muted hover:text-brand-accent hover:border-brand-accent/50 rounded text-[10px] font-bold uppercase tracking-widest transition-all mt-2">
            + زیادکردنی ئەندام
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Placeholder components for other tabs
const CalendarTab: React.FC<{ matterId: string }> = () => (
  <div className="bg-white p-8 rounded border border-surface-border shadow-sm text-center">
    <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-text-main mb-2">ساڵنامەی کەیس</h3>
    <p className="text-text-muted text-sm max-w-md mx-auto">لێرەدا هەموو دانیشتنەکانی دادگا و ژوانەکانی پەیوەست بەم کەیسە دەبینیت.</p>
    <button className="mt-6 px-6 py-2 bg-brand-accent text-white font-bold rounded text-xs shadow-sm">زیادکردنی دانیشتن</button>
  </div>
);

const TasksTab: React.FC<{ matterId: string }> = () => (
  <div className="bg-white p-8 rounded border border-surface-border shadow-sm text-center">
    <CheckSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-text-main mb-2">ئەرکەکانی کەیس</h3>
    <p className="text-text-muted text-sm max-w-md mx-auto">بەڕێوەبردنی ئەرکەکان و دابەشکردنیان بەسەر تیمی کارکردندا.</p>
    <button className="mt-6 px-6 py-2 bg-brand-accent text-white font-bold rounded text-xs shadow-sm">زیادکردنی ئەرک</button>
  </div>
);

const DocumentsTab: React.FC<{ matterId: string }> = () => (
  <div className="bg-white p-8 rounded border border-surface-border shadow-sm text-center">
    <FileCode className="w-12 h-12 text-gray-200 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-text-main mb-2">بەڵگەنامەکانی کەیس</h3>
    <p className="text-text-muted text-sm max-w-md mx-auto">هەموو بەڵگەنامە و فایلە پەیوەندیدارەکان لێرەدا پاشەکەوت دەکرێن.</p>
    <button className="mt-6 px-6 py-2 bg-brand-accent text-white font-bold rounded text-xs shadow-sm">بارکردنی فایل</button>
  </div>
);

const BillingTab: React.FC<{ matterId: string }> = () => (
  <div className="bg-white p-8 rounded border border-surface-border shadow-sm text-center">
    <DollarSign className="w-12 h-12 text-gray-200 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-text-main mb-2">دارایی و وەسڵەکان</h3>
    <p className="text-text-muted text-sm max-w-md mx-auto">چاودێریکردنی تێچووەکان و دەرکردنی وەسڵ بۆ موکیل.</p>
    <button className="mt-6 px-6 py-2 bg-brand-accent text-white font-bold rounded text-xs shadow-sm">دەرکردنی وەسڵ</button>
  </div>
);

const CommunicationTab: React.FC<{ matterId: string }> = () => (
  <div className="bg-white p-8 rounded border border-surface-border shadow-sm text-center">
    <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-text-main mb-2">تۆماری پەیوەندییەکان</h3>
    <p className="text-text-muted text-sm max-w-md mx-auto">تۆمارکردنی هەموو تەلەفۆن، ئیمەیڵ و کۆبوونەوەکان.</p>
    <button className="mt-6 px-6 py-2 bg-brand-accent text-white font-bold rounded text-xs shadow-sm">تۆمارکردنی پەیوەندی</button>
  </div>
);

const NotesTab: React.FC<{ matterId: string }> = () => (
  <div className="bg-white p-8 rounded border border-surface-border shadow-sm text-center">
    <History className="w-12 h-12 text-gray-200 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-text-main mb-2">تێبینی و مێژوو</h3>
    <p className="text-text-muted text-sm max-w-md mx-auto">تۆمارکردنی تێبینییە ناوخۆییەکان و گۆڕانکارییەکانی کەیس.</p>
    <button className="mt-6 px-6 py-2 bg-brand-accent text-white font-bold rounded text-xs shadow-sm">زیادکردنی تێبینی</button>
  </div>
);

export default MatterDetailsPage;
