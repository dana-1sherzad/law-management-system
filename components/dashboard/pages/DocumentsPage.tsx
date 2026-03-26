
import React, { useState } from 'react';
import { 
  Folder, 
  File, 
  Search, 
  Plus, 
  MoreVertical, 
  Download, 
  Trash2, 
  Share2, 
  Eye,
  Filter,
  ChevronRight,
  FileText,
  FileCode,
  Image as ImageIcon,
  Archive,
  UploadCloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import Modal from '../shared/Modal';

interface DocFile {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'jpg' | 'zip' | 'folder';
  size?: string;
  updated: string;
  owner: string;
  matterId?: string;
}

const initialFiles: DocFile[] = [
  { id: 'f1', name: 'گرێبەستی کار', type: 'pdf', size: '1.2 MB', updated: '2024-07-28', owner: 'دانا', matterId: 'C-0601' },
  { id: 'f2', name: 'بەڵگەکانی دادگا', type: 'folder', updated: '2024-07-25', owner: 'شیلان', matterId: 'C-0601' },
  { id: 'f3', name: 'وێنەی شوێنی ڕووداو', type: 'jpg', size: '4.5 MB', updated: '2024-07-20', owner: 'ئارام', matterId: 'C-0602' },
  { id: 'f4', name: 'نووسراوی فەرمی', type: 'docx', size: '450 KB', updated: '2024-07-15', owner: 'دانا', matterId: 'C-0603' },
  { id: 'f5', name: 'ئەرشیفی ٢٠٢٣', type: 'zip', size: '120 MB', updated: '2023-12-30', owner: 'سیستم' },
];

const DocumentsPage: React.FC = () => {
  const [files, setFiles] = useState(initialFiles);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getFileIcon = (type: DocFile['type']) => {
    switch (type) {
      case 'folder': return <Folder className="w-5 h-5 text-amber-500 fill-amber-500/10" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx': return <FileCode className="w-5 h-5 text-blue-500" />;
      case 'jpg': return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'zip': return <Archive className="w-5 h-5 text-orange-500" />;
      default: return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.matterId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl text-text-main font-bold tracking-tight">بەڵگەنامەکان</h1>
          <p className="text-text-muted mt-1 text-sm font-medium">بەڕێوەبردنی فایل و بەڵگەنامە یاساییەکان بە شێوەیەکی پارێزراو.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center bg-white text-text-main border border-surface-border font-bold px-4 py-2 rounded hover:bg-gray-50 transition-all text-xs">
            <Plus className="w-4 h-4 ml-2" />
            <span>بوخچەی نوێ</span>
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center bg-brand-accent text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-xs"
          >
            <UploadCloud className="w-4 h-4 ml-2" />
            <span>بارکردنی فایل</span>
          </button>
        </div>
      </div>

      {/* Breadcrumbs & Search */}
      <div className="bg-white p-4 rounded border border-surface-border flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
          <span className="hover:text-brand-primary cursor-pointer">هەموو فایلەکان</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-main">سەرەکی</span>
        </div>
        <div className="flex items-center gap-3 flex-grow md:flex-grow-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute h-4 w-4 top-2.5 left-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="گەڕان بەدوای فایل..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-surface-border rounded py-2 pl-9 pr-4 text-xs font-bold text-text-main focus:border-brand-accent outline-none transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-surface-border rounded text-gray-400 hover:text-text-main transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredFiles.map((file, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.02 }}
              key={file.id} 
              className="bg-white p-4 rounded border border-surface-border shadow-sm hover:border-brand-accent/30 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded border border-surface-border group-hover:bg-brand-primary/5 group-hover:border-brand-primary/20 transition-colors">
                  {getFileIcon(file.type)}
                </div>
                <button className="p-1 text-gray-300 hover:text-text-main transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-text-main truncate group-hover:text-brand-accent transition-colors">{file.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                    {file.type === 'folder' ? 'بوخچە' : file.size}
                  </span>
                  {file.matterId && (
                    <span className="text-[9px] font-mono font-bold text-brand-accent bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      #{file.matterId}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-[8px] font-bold text-brand-primary">
                    {file.owner.charAt(0)}
                  </div>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{file.owner}</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-text-muted">{file.updated}</span>
              </div>
              
              {/* Hover Actions */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
                <button className="p-2 bg-white shadow-lg rounded-full text-brand-accent hover:bg-brand-accent hover:text-white transition-all transform hover:scale-110">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white shadow-lg rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-all transform hover:scale-110">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white shadow-lg rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white shadow-lg rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="بارکردنی فایل">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-surface-border rounded-xl p-12 text-center hover:border-brand-accent/50 transition-all cursor-pointer group bg-gray-50/50">
            <UploadCloud className="w-12 h-12 text-gray-300 mx-auto mb-4 group-hover:text-brand-accent transition-colors" />
            <p className="text-sm font-bold text-text-main mb-1">فایلەکان لێرە دابنێ یان کلیک بکە</p>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">ماکسیمەم قەبارە: ٥٠ مێگابایت</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">پەیوەستکردن بە کەیس (ئارەزوومەندانە)</label>
              <select className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm appearance-none">
                <option value="">هیچ کام</option>
                <option value="C-0601">#C-0601 - کۆمپانیای هێمن</option>
                <option value="C-0602">#C-0602 - ئارام خالید</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-widest">تێبینی</label>
              <textarea 
                placeholder="تێبینییەک بنووسە دەربارەی ئەم فایلە..." 
                className="w-full bg-white border border-surface-border rounded p-3 text-text-main font-bold focus:border-brand-accent outline-none transition-all text-sm h-24 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setIsUploadModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-text-main font-bold rounded hover:bg-gray-200 transition-all text-sm">لابردن</button>
            <button className="flex-1 py-3 bg-brand-accent text-white font-bold rounded hover:bg-blue-700 transition-all text-sm shadow-sm">بارکردن</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentsPage;
