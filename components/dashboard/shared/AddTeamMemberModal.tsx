
import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Building2, 
  Briefcase,
  Save,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import type { UserRole } from '../../Dashboard';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: any) => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Lawyer' as UserRole,
    position: '',
    email: '',
    phone: '',
    branch: 'سلێمانی',
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, id: `M-${Math.floor(Math.random() * 1000)}`, activeCases: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-text-main/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-surface-border overflow-hidden"
      >
        <div className="p-6 border-b border-surface-border flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-accent text-white rounded-lg shadow-sm">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-main">زیادکردنی ئەندامی نوێ</h2>
              <p className="text-xs text-text-muted font-medium">زانیارییەکانی ئەندامی نوێی تیمەکە لێرە بنووسە.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <User className="w-3 h-3" />
                ناوی تەواو
              </label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="بۆ نموونە: ئاراس ئەحمەد"
                className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3" />
                دەسەڵات (ڕۆڵ)
              </label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all appearance-none"
              >
                <option value="Lawyer">پارێزەر (Lawyer)</option>
                <option value="Secretariat">سکرتاریەت (Secretariat)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-3 h-3" />
                ناونیشانی کار
              </label>
              <input 
                required
                type="text" 
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                placeholder="بۆ نموونە: پارێزەری باڵا"
                className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <Building2 className="w-3 h-3" />
                لقی نووسینگە
              </label>
              <select 
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all appearance-none"
              >
                <option value="سلێمانی">سلێمانی</option>
                <option value="هەولێر">هەولێر</option>
                <option value="دهۆک">دهۆک</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-3 h-3" />
                ئیمەیڵ
              </label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="example@lawfirm.com"
                className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <Phone className="w-3 h-3" />
                ژمارەی تەلەفۆن
              </label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="0770 000 0000"
                className="w-full bg-gray-50 border border-surface-border rounded p-3 text-sm font-bold focus:border-brand-accent outline-none transition-all" 
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-surface-border">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-text-muted uppercase tracking-widest hover:text-text-main transition-colors"
            >
              پاشگەزبوونەوە
            </button>
            <button 
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-brand-accent text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>پاشەکەوتکردن</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTeamMemberModal;
