import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: 'default' | 'glass';
  className?: string;
}

export function InsightCard({
  title,
  icon: Icon,
  children,
  variant = 'default',
  className,
}: InsightCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-5',
        variant === 'default' && 'bg-card border border-border',
        variant === 'glass' && 'glass',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-secondary">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}
