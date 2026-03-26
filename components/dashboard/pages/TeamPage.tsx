
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  Shield, 
  MoreVertical, 
  ExternalLink,
  MapPin,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import type { UserRole } from '../../Dashboard';
import AddTeamMemberModal from '../shared/AddTeamMemberModal';

interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
  position: string;
  email: string;
  phone: string;
  branch: string;
  activeCases: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

const initialTeam: TeamMember[] = [
  { id: 'M-001', name: 'ئاراس ئەحمەد', role: 'Lawyer', position: 'پارێزەری باڵا', email: 'aras@lawfirm.com', phone: '0770 123 4567', branch: 'سلێمانی', activeCases: 12, status: 'Active' },
  { id: 'M-002', name: 'سارا عەلی', role: 'Lawyer', position: 'پارێزەری شارەزا', email: 'sara@lawfirm.com', phone: '0750 987 6543', branch: 'هەولێر', activeCases: 8, status: 'Active' },
  { id: 'M-003', name: 'هێمن عومەر', role: 'Secretariat', position: 'بەڕێوەبەری نووسینگە', email: 'hemin@lawfirm.com', phone: '0771 222 3344', branch: 'سلێمانی', activeCases: 0, status: 'Active' },
  { id: 'M-004', name: 'لینا جەمال', role: 'Secretariat', position: 'سکرتێر', email: 'lina@lawfirm.com', phone: '0751 555 6677', branch: 'سلێمانی', activeCases: 0, status: 'On Leave' },
];

interface TeamPageProps {
  onViewProfile: (id: string) => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onViewProfile }) => {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = (newMember: TeamMember) => {
    setTeam(prev => [newMember, ...prev]);
  };

  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">تیم و کارمەندان</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی ئەندامانی تیم و دەسەڵاتەکانیان.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-brand-accent text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-sm"
        >
          <UserPlus className="w-4 h-4 ml-2" />
          <span>زیادکردنی ئەندام</span>
        </button>
      </div>

      <AddTeamMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddMember} 
      />

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-white p-4 rounded border border-surface-border flex items-center gap-4 shadow-sm">
          <div className="relative flex-grow">
            <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="گەڕان بەدوای ئەندامانی تیم..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-surface-border rounded py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand-accent text-text-main text-sm font-medium transition-all" 
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded border border-surface-border flex items-center justify-around shadow-sm">
          <div className="text-center">
            <p className="text-xl font-bold text-text-main font-mono">{team.length}</p>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">کۆی گشتی</p>
          </div>
          <div className="w-px h-6 bg-gray-100"></div>
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600 font-mono">{team.filter(m => m.role === 'Lawyer').length}</p>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">پارێزەر</p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              key={member.id} 
              className="bg-white rounded-2xl border border-surface-border shadow-sm hover:border-brand-accent/30 transition-all group overflow-hidden"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${member.name}&background=1A2B3C&color=ffffff`} 
                        className="w-16 h-16 rounded-xl border border-surface-border shadow-sm"
                        alt={member.name}
                      />
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                        member.status === 'Active' ? 'bg-green-500' : member.status === 'On Leave' ? 'bg-amber-500' : 'bg-gray-400'
                      )}></div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-main group-hover:text-brand-accent transition-colors">{member.name}</h3>
                      <p className="text-xs text-text-muted font-medium mt-0.5">{member.position}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border",
                          member.role === 'Lawyer' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                        )}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-text-main transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
                      <Mail className="w-4 h-4" />
                      {member.email}
                   </div>
                   <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
                      <Phone className="w-4 h-4" />
                      {member.phone}
                   </div>
                   <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
                      <MapPin className="w-4 h-4" />
                      {member.branch}
                   </div>
                </div>

                <div className="pt-6 border-t border-surface-border flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-bold text-text-main">{member.activeCases} کەیسی چالاک</span>
                   </div>
                   <button 
                    onClick={() => onViewProfile(member.id)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline"
                   >
                      پرۆفایل
                      <ExternalLink className="w-3 h-3" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamPage;
