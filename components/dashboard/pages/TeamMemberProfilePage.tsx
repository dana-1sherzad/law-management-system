
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Calendar, 
  Clock, 
  Shield, 
  Briefcase, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../../lib/utils';

interface TeamMemberProfilePageProps {
  memberId: string;
  onBack: () => void;
}

const TeamMemberProfilePage: React.FC<TeamMemberProfilePageProps> = ({ memberId, onBack }) => {
  // Mock data for the member
  const member = {
    id: memberId,
    name: 'ئارام خالید',
    role: 'Partner / Senior Lawyer',
    email: 'aram@lawfirm.com',
    phone: '0750 123 4567',
    address: 'هەولێر، گەڕەکی بەختیاری',
    specialization: 'Civil & Criminal Law',
    joinedDate: '2020-01-15',
    status: 'Online',
    avatar: 'A',
    bio: 'پارێزەرێکی شارەزا لە بوارەکانی یاسای مەدەنی و سزایی، خاوەنی زیاتر لە ١٠ ساڵ ئەزموون لە دادگاکانی کوردستان.',
    stats: {
      totalCases: 142,
      wonCases: 118,
      pendingCases: 15,
      successRate: '83%'
    },
    recentActivities: [
      { id: '1', type: 'case', title: 'کۆتاییهێنان بە کەیسی #C-0601', time: '٢ کاتژمێر پێش ئێستا' },
      { id: '2', type: 'meeting', title: 'کۆبوونەوە لەگەڵ بریکار "نەریمان"', time: '٥ کاتژمێر پێش ئێستا' },
      { id: '3', type: 'task', title: 'ئامادەکردنی ڕاپۆرتی مانگانە', time: 'دوێنێ' },
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-brand-accent transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">گەڕانەوە بۆ لیستی تیم</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded border border-surface-border shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gray-50 rounded flex items-center justify-center text-5xl font-bold text-text-main border border-surface-border shadow-sm">
                {member.avatar}
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
            </div>
            
            <h2 className="text-2xl font-bold text-text-main mb-1">{member.name}</h2>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-6">{member.role}</p>
            
            <div className="flex justify-center gap-2 mb-8">
              <span className="px-3 py-1 bg-blue-50 text-brand-accent text-[10px] font-bold rounded border border-blue-100 uppercase tracking-widest">
                {member.specialization}
              </span>
            </div>

            <div className="space-y-4 text-right">
              <div className="flex items-center justify-end gap-3 text-sm text-text-muted">
                <span className="font-mono">{member.email}</span>
                <Mail className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-end gap-3 text-sm text-text-muted">
                <span className="font-mono">{member.phone}</span>
                <Phone className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-end gap-3 text-sm text-text-muted">
                <span>{member.address}</span>
                <MapPin className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded border border-surface-border shadow-sm">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-widest mb-6 border-b border-surface-border pb-4">کورتەیەک</h3>
            <p className="text-sm text-text-muted leading-relaxed text-right">
              {member.bio}
            </p>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'کۆی کەیسەکان', value: member.stats.totalCases, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'کەیسە براوەکان', value: member.stats.wonCases, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
              { label: 'کەیسە بەردەوامەکان', value: member.stats.pendingCases, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'ڕێژەی سەرکەوتن', value: member.stats.successRate, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded border border-surface-border shadow-sm text-center">
                <div className={cn("w-10 h-10 rounded flex items-center justify-center mx-auto mb-4", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className="text-2xl font-bold text-text-main mb-1 font-mono">{stat.value}</div>
                <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded border border-surface-border shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-surface-border bg-gray-50 flex justify-between items-center">
              <h3 className="text-xs font-bold text-text-main uppercase tracking-widest">کۆتا چالاکییەکان</h3>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="p-8 space-y-6">
              {member.recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-4 text-right">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-text-main mb-1">{activity.title}</h4>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest font-mono">{activity.time}</span>
                  </div>
                  <div className="w-10 h-10 rounded bg-gray-50 border border-surface-border flex items-center justify-center shrink-0">
                    {activity.type === 'case' && <Briefcase className="w-4 h-4 text-blue-500" />}
                    {activity.type === 'meeting' && <Calendar className="w-4 h-4 text-amber-500" />}
                    {activity.type === 'task' && <FileText className="w-4 h-4 text-purple-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white p-8 rounded border border-surface-border shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-bold text-text-main uppercase tracking-widest">ئاستی کارکردن (ساڵانە)</h3>
              <Shield className="w-4 h-4 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {[65, 45, 75, 55, 85, 95, 70, 60, 80, 90, 100, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-full bg-brand-accent/10 border-t-2 border-brand-accent rounded-t-sm"
                  />
                  <span className="text-[8px] font-bold text-text-muted uppercase tracking-tighter font-mono">
                    {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberProfilePage;
