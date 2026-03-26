
import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    color?: 'blue' | 'green' | 'amber' | 'indigo' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  changeType,
  color = 'blue'
}) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-100',
      green: 'text-green-600 bg-green-50 border-green-100',
      amber: 'text-amber-600 bg-amber-50 border-amber-100',
      indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      red: 'text-red-600 bg-red-50 border-red-100',
    };

    const changeColors = {
        increase: 'text-green-600',
        decrease: 'text-red-600',
        neutral: 'text-gray-400',
    };

    const ChangeIcon = {
      increase: TrendingUp,
      decrease: TrendingDown,
      neutral: Minus
    }[changeType];

    return (
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-6 border border-surface-border flex flex-col justify-between shadow-sm relative overflow-hidden group"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "p-2.5 rounded border transition-colors",
                  colors[color]
                )}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider",
                  changeColors[changeType]
                )}>
                   <ChangeIcon className="w-3 h-3" />
                   {change}
                </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{title}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-text-main font-mono">{value}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-surface-border flex items-center justify-between">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">بەراورد بە مانگی ڕابردوو</span>
              <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: changeType === 'increase' ? '75%' : '25%' }}
                  className={cn(
                    "h-full rounded-full",
                    changeType === 'increase' ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
              </div>
            </div>
        </motion.div>
    );
};

export default StatCard;
