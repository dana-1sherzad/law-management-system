
import React, { useState } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  FileText,
  MoreVertical,
  Edit2,
  Share2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../../lib/utils';

interface TeamMemberProfileProps {
  memberId: string;
  onBack: () => void;
}

const TeamMemberProfilePage: React.FC<TeamMemberProfileProps> = ({ memberId, onBack }) => {
  // Mock data for a team member
  const member = {
    id: memberId,
    name: 'ئاراس ئەحمەد',
    position: 'پارێزەری باڵا',
    role: 'Lawyer',
    email: 'aras@lawfirm.com',
    phone: '0770 123 4567',
    branch: 'سلێمانی',
    joinDate: '2020-05-15',
    status: 'Active',
    bio: 'پارێزەرێکی شارەزا لە کەیسە مەدەنییەکان و بازرگانییەکان، خاوەنی زیاتر لە ١٠ ساڵ ئەزموون لە بواری یاسادا.',
    stats: {
      totalCases: 145,
      activeCases: 12,
      wonCases: 112,
      performance: 94
    },
    recentCases: [
      { id: 'C-0601', title: 'کۆمپانیای هێمن vs وەزارەتی بازرگانی', status: 'Active', date: '2024-07-20' },
      { id: 'C-0582', title: 'کێشەی زەوی و زار - سلێمانی', status: 'Closed', date: '2024-06-15' },
      { id: 'C-0570', title: 'گرێبەستی هاوبەشی کۆمپانیا', status: 'Active', date: '2024-05-10' },
    ]
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'performance'>('overview');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header / Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-text-muted hover:text-brand-accent transition-colors group"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">گەڕانەوە بۆ تیم</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-brand-accent hover:bg-gray-50 rounded transition-all">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-brand-accent hover:bg-gray-50 rounded transition-all">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-brand-accent hover:bg-gray-50 rounded transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="bg-white rounded-2xl border border-surface-border p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative">
            <img 
              src={`https://ui-avatars.com/api/?name=${member.name}&background=1A2B3C&color=ffffff`} 
              className="w-32 h-32 rounded-2xl border-4 border-gray-50 shadow-sm"
              alt={member.name}
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-text-main">{member.name}</h1>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-widest">
                  {member.role}
                </span>
              </div>
              <p className="text-text-muted font-medium mt-1">{member.position}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 text-sm text-text-muted font-medium">
                <Mail className="w-4 h-4 text-brand-accent" />
                {member.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted font-medium">
                <Phone className="w-4 h-4 text-brand-accent" />
                {member.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted font-medium">
                <MapPin className="w-4 h-4 text-brand-accent" />
                {member.branch}
              </div>
            </div>

            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              {member.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'کۆی کەیسەکان', value: member.stats.totalCases, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'کەیسە چالاکەکان', value: member.stats.activeCases, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'کەیسە براوەکان', value: member.stats.wonCases, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'ئاستی سەرکەوتن', value: `${member.stats.performance}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <p className="text-2xl font-bold text-text-main font-mono">{stat.value}</p>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 border-b border-surface-border">
            {[
              { id: 'overview', label: 'تێڕوانینی گشتی' },
              { id: 'cases', label: 'کەیسەکان' },
              { id: 'performance', label: 'ئاستی کارکردن' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all relative",
                  activeTab === tab.id ? "text-brand-accent" : "text-text-muted hover:text-text-main"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeProfileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-text-main uppercase tracking-widest border-b border-surface-border pb-3">دوایین کەیسەکان</h3>
                <div className="space-y-4">
                  {member.recentCases.map((caseItem) => (
                    <div key={caseItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-surface-border hover:border-brand-accent transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg border border-surface-border">
                          <Briefcase className="w-4 h-4 text-brand-accent" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-text-main group-hover:text-brand-accent transition-colors">{caseItem.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">ID: {caseItem.id}</span>
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {caseItem.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-widest",
                          caseItem.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-100 text-gray-600 border-gray-200'
                        )}>
                          {caseItem.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-accent transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-[10px] font-bold text-brand-accent uppercase tracking-widest hover:bg-gray-50 rounded-lg border border-dashed border-surface-border transition-all">
                  بینینی هەموو کەیسەکان
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-widest border-b border-surface-border pb-3 mb-6">زانیاری زیاتر</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-muted">بەرواری پەیوەندیکردن</span>
                  <span className="text-xs font-bold text-text-main">{member.joinDate}</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-muted">کۆی ساڵانی ئەزموون</span>
                  <span className="text-xs font-bold text-text-main">١٢ ساڵ</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-muted">پلەی کارگێڕی</span>
                  <span className="text-xs font-bold text-text-main">بەڕێوەبەری بەش</span>
               </div>
            </div>
          </div>

          <div className="bg-brand-accent p-6 rounded-xl text-white shadow-lg shadow-blue-100 relative overflow-hidden group">
            <div className="relative z-10">
              <Award className="w-8 h-8 mb-4 opacity-80" />
              <h4 className="text-lg font-bold">پارێزەری نموونەیی</h4>
              <p className="text-xs opacity-80 mt-2 leading-relaxed">
                ئەم ئەندامە خەڵاتی پارێزەری نموونەیی وەرگرتووە بۆ ساڵی ٢٠٢٣ بەهۆی ئاستی بەرزی کارکردنی.
              </p>
            </div>
            <Award className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberProfilePage;
