
import React, { useState } from 'react';
import { 
  Plus, 
  Gavel, 
  Bell, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  MapPin,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import Modal from '../shared/Modal';
import { cn } from '../../../lib/utils';

const daysOfWeek = ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'];
const calendarDays = Array.from({ length: 35 }, (_, i) => i - 3); 

const initialEvents: Record<number, any[]> = {
  2: [{ id: 'e1', time: '10:00', title: 'کەیسی #C-0601', color: 'bg-blue-600', type: 'appointment' }],
  9: [{ id: 'e2', time: '14:30', title: 'کۆبوونەوە لەگەڵ ئارام', color: 'bg-green-600', type: 'appointment' }],
  11: [{ id: 'e3', time: '11:00', title: 'دانیشتنی دادگا', color: 'bg-red-600', type: 'hearing', courtroom: 'هۆڵی ژمارە ٣', judge: 'قازی محەمەد' }],
  22: [
    { id: 'e4', time: '09:00', title: 'کەیسی #C-0603', color: 'bg-blue-600', type: 'appointment' },
    { id: 'e5', time: '16:00', title: 'تەلەفۆن بۆ شیلان', color: 'bg-amber-600', type: 'appointment' }
  ],
};

const CalendarPage: React.FC = () => {
  const [events] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth] = useState('ئابی 2024');

  const handleOpenModal = (day: number) => {
    if (day > 0) setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">ساڵنامە</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی کات و دانیشتنەکانی دادگا بە شێوەیەکی ڕێکخراو.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center bg-white text-text-main border border-surface-border font-bold px-4 py-2 rounded hover:bg-gray-50 transition-all text-xs">
            <Gavel className="w-4 h-4 ml-2 text-red-500" />
            <span>دانیشتنەکان</span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-brand-accent text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-xs">
            <Plus className="w-4 h-4 ml-2" />
            <span>دانانی کات</span>
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded border border-surface-border shadow-sm">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-text-main tracking-tight">{currentMonth}</h2>
          <div className="flex gap-1">
            <button className="p-1.5 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="p-1.5 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex bg-gray-50 p-1 rounded border border-surface-border">
          <button className="px-4 py-1.5 rounded text-[9px] font-bold uppercase tracking-widest bg-white text-text-main shadow-sm border border-surface-border">مانگ</button>
          <button className="px-4 py-1.5 rounded text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-all">هەفتە</button>
          <button className="px-4 py-1.5 rounded text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-all">ڕۆژ</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded border border-surface-border overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 bg-gray-50 border-b border-surface-border">
          {daysOfWeek.map(day => (
            <div key={day} className="p-4 text-center text-[9px] font-bold text-text-muted uppercase tracking-widest">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.005 }}
              key={index} 
              onClick={() => day > 0 && handleOpenModal(day)}
              className={cn(
                "p-3 border-r border-b border-surface-border h-32 cursor-pointer transition-all hover:bg-gray-50 group relative",
                index % 7 === 0 && 'border-r-0',
                day < 1 && 'bg-gray-50/50 opacity-30 pointer-events-none'
              )}
            >
              {day > 0 && (
                <>
                  <span className={cn(
                    "text-xs font-bold transition-all font-mono",
                    day === 5 ? 'text-brand-accent bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100' : 'text-text-muted group-hover:text-text-main'
                  )}>{day}</span>
                   <div className="mt-2 space-y-1">
                    {events[day]?.map(event => (
                       <div 
                        key={event.id} 
                        className={cn(
                          "text-[8px] text-white p-1.5 rounded flex flex-col shadow-sm border border-white/10 transition-transform hover:scale-105",
                          event.color
                        )}
                       >
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="font-bold opacity-80 font-mono">{event.time}</span>
                            {event.type === 'hearing' && <Gavel className="w-2.5 h-2.5"/>}
                          </div>
                          <span className="font-bold truncate tracking-tight">{event.title}</span>
                       </div>
                    ))}
                   </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="دانانی کات یان دانیشتنی دادگا">
         <div className="space-y-5">
            <div>
                <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">جۆری چالاکی</label>
                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-brand-accent text-white font-bold py-3 rounded text-xs shadow-sm">ژوان / کۆبوونەوە</button>
                    <button className="bg-white text-text-main font-bold py-3 rounded text-xs flex items-center justify-center border border-surface-border hover:bg-gray-50 transition-all">
                        <Gavel className="w-3.5 h-3.5 ml-2 text-red-500" /> دانیشتنی دادگا
                    </button>
                </div>
            </div>
            <div>
                <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">ناونیشان / کەیس</label>
                <input 
                  placeholder="بۆ نموونە: دانیشتنی کەیسی #C-0601" 
                  className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">کات</label>
                    <div className="flex items-center bg-white border border-surface-border rounded p-3">
                        <Clock className="w-4 h-4 ml-2 text-brand-accent" />
                        <input type="time" className="bg-transparent border-none text-text-main focus:outline-none w-full font-bold text-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">بیرخستنەوە</label>
                    <div className="flex items-center bg-white border border-surface-border rounded p-3">
                        <Bell className="w-4 h-4 ml-2 text-blue-500" />
                        <select className="bg-transparent border-none text-text-main focus:outline-none w-full font-bold appearance-none cursor-pointer text-sm">
                            <option>١٠ خولەک پێشتر</option>
                            <option>١ کاتژمێر پێشتر</option>
                            <option>١ ڕۆژ پێشتر</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">هۆڵی دادگا / قازی</label>
                <div className="flex items-center bg-white border border-surface-border rounded p-3">
                  <MapPin className="w-4 h-4 ml-2 text-red-500" />
                  <input placeholder="ناوی هۆڵ یان قازی..." className="bg-transparent border-none text-text-main focus:outline-none w-full font-bold text-sm" />
                </div>
            </div>
            <button className="w-full bg-brand-primary text-white font-bold py-3 rounded mt-2 shadow-sm active:scale-95 transition-all text-sm uppercase tracking-widest">
              پاشەکەوتکردن
            </button>
         </div>
      </Modal>
    </div>
  );
};

export default CalendarPage;
