
import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  FileText,
  Trash2,
  Check,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';

interface Notification {
  id: string;
  type: 'deadline' | 'task' | 'finance' | 'document' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'deadline', title: 'کاتی دادگایی نزیکە', message: 'کەیسی #C-0601 سبەینێ کاتژمێر ١٠:٠٠ دانیشتنی دادگای هەیە.', time: '١٠ خولەک پێش ئێستا', isRead: false, priority: 'High' },
  { id: '2', type: 'task', title: 'کارێکی نوێ سپێردرا', message: 'کارێکی نوێ بۆت سپێردراوە: "ئامادەکردنی گرێبەستی کۆمپانیای هێمن".', time: '١ کاتژمێر پێش ئێستا', isRead: false, priority: 'Medium' },
  { id: '3', type: 'finance', title: 'پارەی وەرگیراو', message: 'بڕی $500 لەلایەن موکیل "ئارام خالید"ەوە وەرگیرا.', time: '٣ کاتژمێر پێش ئێستا', isRead: true, priority: 'Low' },
  { id: '4', type: 'document', title: 'بەڵگەنامەی نوێ', message: 'بەڵگەنامەیەکی نوێ بۆ کەیسی #C-0602 بارکرا.', time: '٥ کاتژمێر پێش ئێستا', isRead: true, priority: 'Medium' },
  { id: '5', type: 'system', title: 'نوێکردنەوەی سیستەم', message: 'سیستەم نوێکراوەتەوە بۆ وەشانی ٢.٤.٠، تکایە گۆڕانکارییەکان ببینە.', time: '١ ڕۆژ پێش ئێستا', isRead: true, priority: 'Low' },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'deadline': return <Calendar className="w-5 h-5 text-red-500" />;
      case 'task': return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      case 'finance': return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'document': return <FileText className="w-5 h-5 text-purple-500" />;
      case 'system': return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'all' ? notifications : notifications.filter(n => !n.isRead);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-brand-accent/10 rounded-xl border border-brand-accent/20">
              <Bell className="w-6 h-6 text-brand-accent" />
           </div>
           <div>
              <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">ئاگادارکردنەوەکان</h1>
              <p className="text-text-muted mt-1 text-sm font-medium">هەموو ئاگادارکردنەوەکانی سیستەم و کەیسەکان لێرە دەبینیت.</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-surface-border rounded text-text-main font-bold text-xs hover:bg-gray-50 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>هەموو وەک خوێندراوە نیشان بدە</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-surface-border">
        <button 
          onClick={() => setFilter('all')}
          className={cn(
            "px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all relative",
            filter === 'all' ? "text-brand-accent" : "text-text-muted hover:text-text-main"
          )}
        >
          هەمووی ({notifications.length})
          {filter === 'all' && <motion.div layoutId="activeNotifTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />}
        </button>
        <button 
          onClick={() => setFilter('unread')}
          className={cn(
            "px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all relative",
            filter === 'unread' ? "text-brand-accent" : "text-text-muted hover:text-text-main"
          )}
        >
          نەخوێندراوە ({notifications.filter(n => !n.isRead).length})
          {filter === 'unread' && <motion.div layoutId="activeNotifTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />}
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map((notif, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              key={notif.id} 
              className={cn(
                "p-4 rounded-xl border transition-all group relative overflow-hidden",
                notif.isRead ? "bg-white border-surface-border opacity-70" : "bg-white border-brand-accent/30 shadow-sm ring-1 ring-brand-accent/5"
              )}
            >
              {!notif.isRead && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent"></div>}
              
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2.5 rounded-lg border",
                  notif.isRead ? "bg-gray-50 border-gray-100" : "bg-brand-primary/5 border-brand-primary/10"
                )}>
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={cn("text-sm font-bold truncate", notif.isRead ? "text-text-main" : "text-brand-accent")}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed font-medium">{notif.message}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className={cn(
                         "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border",
                         notif.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                         notif.priority === 'Medium' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                         'bg-gray-50 text-gray-600 border-gray-100'
                       )}>
                         {notif.priority} Priority
                       </span>
                       <button className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                         بینینی وردەکاری
                         <ChevronRight className="w-3 h-3" />
                       </button>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={() => deleteNotification(notif.id)}
                         className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-text-main transition-colors">
                         <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
             <Bell className="w-16 h-16 mb-4 opacity-10" />
             <p className="text-sm font-bold uppercase tracking-widest opacity-20">هیچ ئاگادارکردنەوەیەک نییە</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
