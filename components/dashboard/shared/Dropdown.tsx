import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';

interface DropdownProps {
  align?: 'left' | 'right';
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  dropdownClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, trigger, align = 'right', className, dropdownClassName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target as Node) || triggerRef.current?.contains(target as Node)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  return (
    <div className={cn("relative inline-flex", className)}>
      <button 
        ref={triggerRef} 
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen(!dropdownOpen);
        }}
        className="focus:outline-none w-full text-right"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={cn(
              "origin-top-right z-50 absolute top-full min-w-[14rem] bg-white border border-surface-border rounded shadow-lg overflow-hidden mt-2",
              align === 'right' ? 'right-0' : 'left-0',
              dropdownClassName
            )} 
            ref={dropdown}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
