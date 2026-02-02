import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DataFieldProps {
  label: string;
  value: string | number | null | undefined;
  icon?: LucideIcon;
  variant?: 'default' | 'inline' | 'stacked';
  className?: string;
}

export function DataField({
  label,
  value,
  icon: Icon,
  variant = 'default',
  className,
}: DataFieldProps) {
  if (value === null || value === undefined || value === '' || value === 'NA') {
    return null;
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center justify-between py-2 border-b border-border/50 last:border-0', className)}>
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={cn('space-y-1', className)}>
        <p className="data-label flex items-center gap-1.5">
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {label}
        </p>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{value}</p>
      </div>
    );
  }

  return (
    <div className={cn('p-3 rounded-lg bg-secondary/30', className)}>
      <p className="data-label mb-1 flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

interface DataListProps {
  label: string;
  items: string[];
  icon?: LucideIcon;
  className?: string;
}

export function DataList({ label, items, icon: Icon, className }: DataListProps) {
  if (!items.length) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <p className="data-label flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
