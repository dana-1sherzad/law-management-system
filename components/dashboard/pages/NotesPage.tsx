
import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  Trash2, 
  CheckSquare, 
  FileText, 
  Search, 
  Clock, 
  Bold, 
  Italic, 
  List, 
  Type, 
  Share2, 
  Star, 
  Hash, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';

interface Note {
  id: string;
  title: string;
  content: string;
  updated: string;
  category?: string;
  isFavorite?: boolean;
}

const initialNotes: Note[] = [
  { id: '1', title: 'ئەرکەکانی ئەمڕۆ', content: '- تەلەفۆن بۆ ئارام\n- ئامادەکردنی بەڵگەنامەی کەیسی #C-0601', updated: '2024-08-01', category: 'ئەرکەکان', isFavorite: true },
  { id: '2', title: 'بیرخستنەوەی کۆبوونەوە', content: 'کۆبوونەوە لەگەڵ پارێزەرانی تیمی بازرگانی لە کاتژمێر ٤', updated: '2024-07-30', category: 'کۆبوونەوە' },
];

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(initialNotes[0]?.id || null);
  const [editingContent, setEditingContent] = useState(initialNotes[0]?.content || '');
  const [editingTitle, setEditingTitle] = useState(initialNotes[0]?.title || '');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeNote = notes.find(n => n.id === selectedNoteId);

  const handleSelectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setEditingContent(note.content);
    setEditingTitle(note.title);
  };

  const handleNewNote = () => {
    const newNote: Note = { 
      id: Date.now().toString(), 
      title: 'تێبینی نوێ', 
      content: '', 
      updated: new Date().toISOString().split('T')[0],
      category: 'گشتی'
    };
    setNotes([newNote, ...notes]);
    handleSelectNote(newNote);
  };

  const handleSave = () => {
    if (selectedNoteId) {
      setNotes(notes.map(n => n.id === selectedNoteId ? { ...n, title: editingTitle, content: editingContent, updated: new Date().toISOString().split('T')[0] } : n));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('ئایا دڵنیایت لە سڕینەوەی ئەم تێبینییە؟')) {
      setNotes(notes.filter(n => n.id !== id));
      if (selectedNoteId === id) setSelectedNoteId(null);
    }
  };

  const applyFormat = (tag: string) => {
    if (tag === 'bold') setEditingContent(prev => prev + ' **دەقی تۆخ** ');
    if (tag === 'italic') setEditingContent(prev => prev + ' *دەقی لاری* ');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded border border-surface-border overflow-hidden shadow-sm animate-in fade-in duration-500">
      {/* List Sidebar */}
      <div className="w-72 sm:w-80 border-l border-surface-border flex flex-col bg-gray-50">
        <div className="p-6 border-b border-surface-border space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-text-main uppercase tracking-widest">تێبینییەکان</h2>
            <button 
              onClick={handleNewNote} 
              className="w-8 h-8 flex items-center justify-center bg-brand-accent text-white rounded shadow-sm hover:bg-blue-700 transition-all active:scale-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute h-3.5 w-3.5 top-2.5 left-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="گەڕان..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-surface-border rounded py-1.5 pl-9 pr-4 text-[10px] font-bold text-text-main focus:outline-none focus:border-brand-accent transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? filteredNotes.map((note, i) => (
              <motion.button 
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  key={note.id} 
                  onClick={() => handleSelectNote(note)}
                  className={cn(
                    "w-full text-right p-4 rounded transition-all group relative overflow-hidden",
                    selectedNoteId === note.id 
                      ? 'bg-white shadow-sm border border-surface-border' 
                      : 'hover:bg-gray-100'
                  )}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={cn(
                    "font-bold truncate text-xs tracking-tight",
                    selectedNoteId === note.id ? 'text-brand-accent' : 'text-text-main'
                  )}>{note.title}</h3>
                  {note.isFavorite && (
                    <Star className={cn("w-3 h-3 fill-current", selectedNoteId === note.id ? 'text-brand-accent' : 'text-amber-500')} />
                  )}
                </div>
                
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock className={cn("w-2.5 h-2.5", selectedNoteId === note.id ? 'text-brand-accent/50' : 'text-text-muted')} />
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-widest font-mono",
                    selectedNoteId === note.id ? 'text-brand-accent/50' : 'text-text-muted'
                  )}>{note.updated}</span>
                </div>
                
                <p className={cn(
                  "text-[10px] truncate font-medium leading-relaxed",
                  selectedNoteId === note.id ? 'text-text-main/70' : 'text-text-muted'
                )}>{note.content || 'تێبینی بەتاڵ...'}</p>

                {selectedNoteId === note.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent"
                  />
                )}
              </motion.button>
            )) : (
              <div className="p-10 text-center space-y-3">
                 <div className="w-12 h-12 bg-white rounded border border-surface-border flex items-center justify-center mx-auto shadow-sm">
                    <FileText className="w-6 h-6 text-gray-200" />
                 </div>
                 <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">هیچ تێبینییەک نییە</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Editor Main */}
      <div className="flex-1 flex flex-col bg-white">
        <AnimatePresence mode="wait">
          {selectedNoteId ? (
            <motion.div 
              key={selectedNoteId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex-1 flex flex-col"
            >
              <div className="p-6 border-b border-surface-border flex justify-between items-center bg-gray-50">
                <div className="flex-1 flex items-center gap-3">
                  <div className="p-1.5 bg-blue-50 rounded border border-blue-100">
                    <Hash className="w-4 h-4 text-brand-accent" />
                  </div>
                  <input 
                    value={editingTitle} 
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="bg-transparent border-none text-xl font-bold text-text-main focus:outline-none flex-1 tracking-tight"
                    placeholder="ناونیشانی تێبینی..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleSave} className="p-2 text-text-muted hover:text-brand-accent bg-white border border-surface-border rounded transition-all shadow-sm" title="پاشەکەوت">
                    <Save className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-text-muted hover:text-blue-500 bg-white border border-surface-border rounded transition-all shadow-sm" title="هاوبەشکردن">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(selectedNoteId)} className="p-2 text-text-muted hover:text-red-500 bg-white border border-surface-border rounded transition-all shadow-sm" title="سڕینەوە">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Formatting Bar */}
              <div className="px-6 py-2 bg-white flex items-center justify-between border-b border-surface-border">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => applyFormat('bold')} className="p-2 text-text-muted hover:text-text-main bg-white border border-surface-border rounded transition-all">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => applyFormat('italic')} className="p-2 text-text-muted hover:text-text-main bg-white border border-surface-border rounded transition-all">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-6 w-px bg-surface-border mx-1"></div>
                    <button className="p-2 text-text-muted hover:text-text-main bg-white border border-surface-border rounded transition-all">
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 text-text-muted hover:text-text-main bg-white border border-surface-border rounded transition-all">
                      <CheckSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-surface-border rounded">
                      <Type className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Normal Text</span>
                    </div>
                  </div>
              </div>

              <textarea 
                value={editingContent} 
                onChange={(e) => setEditingContent(e.target.value)}
                className="flex-1 p-10 bg-transparent border-none text-text-main focus:outline-none resize-none leading-relaxed font-medium text-lg placeholder:text-gray-200"
                placeholder="دەست بکە بە نووسین لێرەوە..."
              />
              
              <div className="px-10 py-4 bg-gray-50 border-t border-surface-border flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-text-muted">
                 <div className="flex items-center gap-4">
                   <span className="flex items-center gap-1.5">
                     <Clock className="w-3 h-3" />
                     کۆتا گۆڕانکاری: <span className="font-mono">{activeNote?.updated}</span>
                   </span>
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                   <span>{editingContent.length} نووسە</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-brand-accent/70">
                   <AlertCircle className="w-3 h-3" />
                   <span>پاشەکەوتکراوە</span>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-gray-200 p-10"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded bg-gray-50 flex items-center justify-center border border-surface-border shadow-sm">
                  <FileText className="w-12 h-12 text-gray-200" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-text-muted uppercase tracking-widest mb-2 text-center">تێبینییەک هەڵبژێرە بۆ دەستکاریکردن</h3>
              <p className="text-text-muted max-w-xs text-center text-xs font-medium leading-relaxed mb-8">هەموو تێبینی و بیرۆکەکانت لێرەدا پاشەکەوت دەکرێن بە شێوەیەکی پارێزراو.</p>
              <button 
                onClick={handleNewNote} 
                className="group flex items-center gap-2 text-brand-accent font-bold text-[10px] uppercase tracking-widest hover:text-blue-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                یان تێبینی نوێ دروست بکە
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesPage;
