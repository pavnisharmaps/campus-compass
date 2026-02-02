import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  variant?: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: MetricCardProps) {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/30 bg-primary/5',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
  };

  return (
    <div className={cn('metric-card', variantStyles[variant], className)}>
      {Icon && (
        <div className="flex justify-center mb-3">
          <div className="p-2 rounded-lg bg-secondary">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      )}
      <p className="data-label mb-1">{label}</p>
      <p className="data-value-lg">{value}</p>
      {trend && (
        <p
          className={cn(
            'text-xs mt-1',
            trend.direction === 'up' && 'text-success',
            trend.direction === 'down' && 'text-destructive',
            trend.direction === 'neutral' && 'text-muted-foreground'
          )}
        >
          {trend.direction === 'up' && '↑'}
          {trend.direction === 'down' && '↓'}
          {trend.value}%
        </p>
      )}
    </div>
  );
}
