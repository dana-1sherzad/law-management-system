
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  CheckSquare, 
  Clock, 
  Filter,
  Trash2,
  Calendar,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Edit2,
  Circle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Modal from '../shared/Modal';
import { cn } from '../../../lib/utils';

interface Task {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  assignee: string;
}

const initialTasks: Task[] = [
  { id: '1', title: 'ئامادەکردنی پەڕاوی کەیسی #C-0601', status: 'In Progress', priority: 'High', dueDate: '2024-08-05', assignee: 'ئارام' },
  { id: '2', title: 'پەیوەندی بە پزیشکی دادوەری', status: 'Todo', priority: 'Medium', dueDate: '2024-08-03', assignee: 'شیلان' },
  { id: '3', title: 'وەرگرتنی واژۆی موکیل', status: 'Done', priority: 'High', dueDate: '2024-07-30', assignee: 'ئارام' },
  { id: '4', title: 'کۆبوونەوە لەگەڵ تیمی یاسایی', status: 'Todo', priority: 'Low', dueDate: '2024-08-10', assignee: 'هەمووان' },
  { id: '5', title: 'ناردنی ڕاپۆرتی دارایی', status: 'In Progress', priority: 'Medium', dueDate: '2024-08-02', assignee: 'ئاسۆ' },
];

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    priority: 'Medium',
    assignee: '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTaskStatus = (id: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const addTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || 'کارێکی نوێ',
      status: 'Todo',
      priority: newTask.priority as any || 'Medium',
      assignee: newTask.assignee || 'دیارینەکراو',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0]
    };
    setTasks([task, ...tasks]);
    setIsModalOpen(false);
    setNewTask({
      title: '',
      priority: 'Medium',
      assignee: '',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Low': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const statusIcons = {
    Todo: Circle,
    'In Progress': Clock,
    Done: CheckCircle2
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">ئەرکەکان</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی ئەرک و کارەکانی نووسینگە بە شێوەیەکی زیرەک.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-accent text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 flex items-center text-sm"
        >
          <Plus className="w-4 h-4 ml-2" />
          <span>ئەرکی نوێ</span>
        </button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-white p-4 rounded border border-surface-border flex items-center gap-4 shadow-sm">
          <div className="relative flex-grow">
            <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="گەڕان بەدوای کارەکان..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-surface-border rounded py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand-accent text-text-main text-sm font-medium transition-all" 
            />
          </div>
          <button className="p-2.5 bg-white border border-surface-border text-gray-400 hover:text-text-main rounded transition-all">
             <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-white p-4 rounded border border-surface-border flex items-center justify-around shadow-sm">
          <div className="text-center">
            <p className="text-xl font-bold text-text-main font-mono">{tasks.length}</p>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">کۆی گشتی</p>
          </div>
          <div className="w-px h-6 bg-gray-100"></div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-600 font-mono">{tasks.filter(t => t.status === 'Done').length}</p>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">تەواوبوو</p>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['Todo', 'In Progress', 'Done'] as const).map((status) => (
          <div key={status} className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-text-muted uppercase tracking-widest text-[10px] flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      status === 'Todo' ? 'bg-amber-500' : status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'
                    )}></div>
                    {status === 'Todo' ? 'بۆ ئەنجامدان' : status === 'In Progress' ? 'لە کاردایە' : 'تەواوکراو'}
                </h3>
                <span className="bg-gray-50 text-text-muted text-[10px] font-bold px-2 py-0.5 rounded border border-surface-border font-mono">
                    {filteredTasks.filter(t => t.status === status).length}
                </span>
             </div>
             
             <div className="space-y-3 min-h-[400px] p-3 rounded bg-gray-50/50 border border-dashed border-surface-border">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.filter(t => t.status === status).map((task, i) => {
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        key={task.id} 
                        className="bg-white p-4 rounded border border-surface-border shadow-sm hover:border-brand-accent/30 transition-all group relative overflow-hidden"
                      >
                         <div className="flex justify-between items-start mb-3">
                            <span className={cn("text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-widest", getPriorityColor(task.priority))}>
                                {task.priority}
                            </span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {task.status !== 'Done' && (
                                <button 
                                  onClick={() => updateTaskStatus(task.id, task.status === 'Todo' ? 'In Progress' : 'Done')}
                                  className="p-1 text-gray-400 hover:text-green-600 bg-white rounded border border-surface-border"
                                  title="بۆ قۆناغی داهاتوو"
                                >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {task.status !== 'Todo' && (
                                <button 
                                  onClick={() => updateTaskStatus(task.id, task.status === 'Done' ? 'In Progress' : 'Todo')}
                                  className="p-1 text-gray-400 hover:text-amber-600 bg-white rounded border border-surface-border"
                                  title="بۆ قۆناغی پێشوو"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button className="p-1 text-gray-400 hover:text-brand-primary bg-white rounded border border-surface-border">
                                  <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => deleteTask(task.id)}
                                className="p-1 text-gray-400 hover:text-red-500 bg-white rounded border border-surface-border"
                              >
                                  <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                         </div>
                         
                         <h4 className="text-text-main font-bold mb-4 leading-tight group-hover:text-brand-accent transition-colors text-sm tracking-tight">{task.title}</h4>
                         
                         <div className="flex items-center justify-between border-t border-surface-border pt-3">
                            <div className="flex items-center text-text-muted text-[9px] font-bold uppercase tracking-widest">
                                <Calendar className="w-3 h-3 ml-1 text-brand-accent" />
                                <span className="font-mono">{task.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{task.assignee}</span>
                              <div className="w-6 h-6 bg-gray-50 rounded flex items-center justify-center text-[9px] font-bold text-brand-accent border border-surface-border group-hover:border-brand-accent/30 transition-all">
                                  {task.assignee.charAt(0)}
                              </div>
                            </div>
                         </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {filteredTasks.filter(t => t.status === status).length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-300">
                    <AlertCircle className="w-6 h-6 mb-1 opacity-20" />
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-20">بەتاڵە</p>
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="زیادکردنی ئەرکی نوێ">
          <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">ناونیشانی کار</label>
                <input 
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="چی پێویستە بکرێت؟" 
                  className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">گرنگی (Priority)</label>
                   <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none appearance-none cursor-pointer text-sm"
                   >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">کەسی بەرپرس</label>
                   <input 
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    placeholder="ناو..." 
                    className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                   />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">بەرواری کۆتایی</label>
                <input 
                  type="date" 
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm" 
                />
              </div>
              <button 
                onClick={addTask}
                className="w-full bg-brand-primary text-white font-bold py-3 rounded mt-2 shadow-sm active:scale-95 transition-all text-sm uppercase tracking-widest"
              >
                پاشەکەوتکردن
              </button>
          </div>
      </Modal>
    </div>
  );
};

export default TasksPage;
