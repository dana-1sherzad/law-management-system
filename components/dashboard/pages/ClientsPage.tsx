
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Briefcase, 
  Edit2, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Building2, 
  ExternalLink,
  Filter,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Modal from '../shared/Modal';
import Dropdown from '../shared/Dropdown';
import type { UserRole } from '../../Dashboard';
import { cn } from '../../../lib/utils';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cases: number;
  avatar: string;
  isCompany?: boolean;
  status: 'Active' | 'Lead' | 'Inactive';
}

const initialClientsData: Client[] = [
  { id: '1', name: 'ئارام خالید', email: 'aram.k@email.com', phone: '07501234567', cases: 3, avatar: 'A', status: 'Active' },
  { id: '2', name: 'کۆمپانیای بازرگانیی هێمن', email: 'info@hemn.co', phone: '07709876543', cases: 8, avatar: 'H', isCompany: true, status: 'Active' },
  { id: '3', name: 'شیلان ئەحمەد', email: 'shilan.a@email.com', phone: '07515554433', cases: 1, avatar: 'S', status: 'Active' },
  { id: '4', name: 'ئاسۆ عەبدوڵا', email: 'aso.a@email.com', phone: '07500001122', cases: 2, avatar: 'A', status: 'Inactive' },
  { id: '5', name: 'حکومەتی هەرێم', email: 'gov@krg.org', phone: '0661112233', cases: 12, avatar: 'K', isCompany: true, status: 'Active' },
  { id: '6', name: 'پێشەوا جەلال', email: 'peshawa.j@email.com', phone: '07502221199', cases: 0, avatar: 'P', status: 'Lead' },
];

const avatarColors = ['bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-rose-600', 'bg-amber-600'];

const ClientCard: React.FC<Client & { onEdit: () => void; onViewProfile: () => void; userRole: UserRole }> = ({ name, email, phone, cases, avatar, onEdit, onViewProfile, userRole, isCompany, status }) => {
  const isSecretariat = userRole === 'Secretariat';
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-surface-border rounded overflow-hidden hover:border-brand-accent/30 transition-all group flex flex-col shadow-sm"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "w-12 h-12 rounded flex items-center justify-center text-lg font-bold text-white shadow-sm border border-white/10 group-hover:scale-105 transition-transform duration-500",
            avatarColors[name.charCodeAt(0) % avatarColors.length]
          )}>
            {isCompany ? <Building2 className="w-6 h-6" /> : avatar}
          </div>
          <div className="flex gap-2">
            <Dropdown 
              align="right"
              dropdownClassName="w-48"
              trigger={
                <div className="w-9 h-9 flex items-center justify-center bg-white text-gray-400 hover:text-brand-accent hover:bg-gray-50 rounded transition-all border border-surface-border">
                  <MoreVertical className="w-4 h-4" />
                </div>
              }
            >
              <div className="p-2 space-y-1 text-right">
                <button 
                  onClick={onViewProfile}
                  className="w-full flex items-center justify-end gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-accent hover:bg-gray-50 rounded transition-all"
                >
                  بینینی پڕۆفایل
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => window.location.href = `tel:${phone}`}
                  className="w-full flex items-center justify-end gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-accent hover:bg-gray-50 rounded transition-all"
                >
                  پەیوەندی (تەلەفۆن)
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => window.location.href = `mailto:${email}`}
                  className="w-full flex items-center justify-end gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-accent hover:bg-gray-50 rounded transition-all"
                >
                  ناردنی ئیمەیڵ
                  <Mail className="w-3.5 h-3.5" />
                </button>
                {!isSecretariat && (
                  <button 
                    onClick={onEdit}
                    className="w-full flex items-center justify-end gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-accent hover:bg-gray-50 rounded transition-all border-t border-surface-border mt-1 pt-3"
                  >
                    دەستکاریکردن
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-text-main group-hover:text-brand-accent transition-colors tracking-tight">{name}</h3>
            {isCompany && (
               <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-bold uppercase rounded border border-blue-100 tracking-widest">کۆمپانیا</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-text-muted font-bold text-[10px] uppercase tracking-widest">
            <Phone className="w-3 h-3" />
            <span>{phone}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold bg-gray-50 p-3 rounded border border-surface-border">
             <Mail className="w-3.5 h-3.5 text-gray-400" />
             <span className="truncate">{email}</span>
          </div>
          
          <div className="flex items-center gap-2 px-1 pt-1">
             <div className={cn(
               "w-2 h-2 rounded-full",
               status === 'Active' ? 'bg-green-500' : status === 'Inactive' ? 'bg-gray-300' : 'bg-amber-500'
             )}></div>
             <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">{status}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-surface-border flex items-center justify-center">
        {isSecretariat ? (
          <div className="flex items-center gap-2 text-gray-400 py-1">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">دەسەڵات سنووردارە</span>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center gap-2 text-brand-accent">
               <Briefcase className="w-4 h-4" />
               <span className="text-xs font-bold font-mono">{cases} کەیس</span>
            </div>
            <button 
              onClick={onViewProfile}
              className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-accent transition-colors group/btn"
            >
              بینینی پڕۆفایل
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ClientsPage: React.FC<{ userRole: UserRole; onViewProfile: (id: string) => void }> = ({ userRole, onViewProfile }) => {
  const [clients, setClients] = useState(initialClientsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    email: '',
    phone: '',
    isCompany: false,
    status: 'Active'
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const handleAddClient = () => {
    setEditingClient(null);
    setFormData({ name: '', email: '', phone: '', isCompany: false, status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setFormData(client);
    setIsModalOpen(true);
  };

  const handleSaveClient = () => {
    if (!formData.name || !formData.phone) return;

    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...formData } as Client : c));
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        cases: 0,
        avatar: (formData.name || 'U').charAt(0).toUpperCase(),
        isCompany: formData.isCompany,
        status: (formData.status as any) || 'Active'
      };
      setClients([newClient, ...clients]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">موکیلەکان</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی موکیلەکان و زانیارییەکانی پەیوەندی و مێژووی کەیسەکان.</p>
        </div>
        <motion.button 
           whileHover={{ y: -2 }}
           whileTap={{ scale: 0.98 }}
           onClick={handleAddClient} 
           className="flex items-center bg-brand-accent text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-sm"
        >
          <Plus className="w-4 h-4 ml-2" />
          <span>زیادکردنی موکیل</span>
        </motion.button>
      </div>

      <div className="bg-white p-4 rounded border border-surface-border flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="گەڕان بەدوای ناوی موکیل یان ژمارەی مۆبایل..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-surface-border rounded py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand-accent text-text-main text-sm font-medium transition-all" 
          />
        </div>
        <button className="p-2.5 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredClients.map(client => (
            <ClientCard 
              key={client.id} 
              {...client} 
              onEdit={() => handleEditClient(client)} 
              onViewProfile={() => onViewProfile(client.id)}
              userRole={userRole} 
            />
          ))}
        </AnimatePresence>
        
        {filteredClients.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 text-center flex flex-col items-center opacity-20"
          >
             <User className="w-16 h-16 mb-4 stroke-[1]" />
             <p className="text-xl font-bold uppercase tracking-widest">هیچ موکیلێک نەدۆزرایەوە</p>
          </motion.div>
        )}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingClient ? "دەستکاریکردنی موکیل" : "زیادکردنی موکیلی نوێ"}>
          <div className="space-y-6">
              <div className="flex justify-center">
                 <div className="w-20 h-20 bg-gray-50 rounded flex items-center justify-center border border-surface-border text-gray-300 shadow-inner group-hover:text-brand-accent transition-colors">
                    {formData.isCompany ? <Building2 className="w-10 h-10 text-brand-accent" /> : <User className="w-10 h-10" />}
                 </div>
              </div>
              <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">ناوی تەواو</label>
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ناو بنووسە..." 
                      className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">مۆبایل</label>
                        <input 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0750..." 
                          className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">ئیمەیڵ</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@..." 
                          className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                        />
                      </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded border border-surface-border group cursor-pointer hover:border-brand-accent/30 transition-all">
                      <input 
                        type="checkbox" 
                        id="is-company" 
                        checked={formData.isCompany}
                        onChange={(e) => setFormData({ ...formData, isCompany: e.target.checked })}
                        className="w-5 h-5 rounded border-surface-border text-brand-accent bg-white focus:ring-brand-accent/30 cursor-pointer" 
                      />
                      <label htmlFor="is-company" className="text-xs font-bold text-text-muted group-hover:text-text-main transition-colors cursor-pointer">ئەم موکیلە "کۆمپانیا"یە</label>
                  </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-text-main font-bold rounded hover:bg-gray-200 transition-all text-sm">لابردن</button>
                <button onClick={handleSaveClient} className="flex-1 py-3 bg-brand-primary text-white font-bold rounded hover:bg-brand-primary/90 transition-all text-sm shadow-sm">پاشەکەوت</button>
              </div>
          </div>
      </Modal>
    </div>
  );
};

export default ClientsPage;
