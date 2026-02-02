import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryTileProps {
  title: string;
  description: string;
  count: number;
  icon: LucideIcon;
  href: string;
  variant: 'enterprise' | 'product' | 'service' | 'startup';
}

const variantStyles = {
  enterprise: {
    bg: 'bg-gradient-to-br from-[hsl(217,91%,60%)]/10 to-[hsl(217,91%,60%)]/5',
    border: 'border-[hsl(217,91%,60%)]/20 hover:border-[hsl(217,91%,60%)]/40',
    icon: 'bg-[hsl(217,91%,60%)]/20 text-[hsl(217,91%,60%)]',
    text: 'text-[hsl(217,91%,60%)]',
  },
  product: {
    bg: 'bg-gradient-to-br from-[hsl(280,70%,55%)]/10 to-[hsl(280,70%,55%)]/5',
    border: 'border-[hsl(280,70%,55%)]/20 hover:border-[hsl(280,70%,55%)]/40',
    icon: 'bg-[hsl(280,70%,55%)]/20 text-[hsl(280,70%,55%)]',
    text: 'text-[hsl(280,70%,55%)]',
  },
  service: {
    bg: 'bg-gradient-to-br from-[hsl(173,80%,40%)]/10 to-[hsl(173,80%,40%)]/5',
    border: 'border-[hsl(173,80%,40%)]/20 hover:border-[hsl(173,80%,40%)]/40',
    icon: 'bg-[hsl(173,80%,40%)]/20 text-[hsl(173,80%,40%)]',
    text: 'text-[hsl(173,80%,40%)]',
  },
  startup: {
    bg: 'bg-gradient-to-br from-[hsl(38,92%,50%)]/10 to-[hsl(38,92%,50%)]/5',
    border: 'border-[hsl(38,92%,50%)]/20 hover:border-[hsl(38,92%,50%)]/40',
    icon: 'bg-[hsl(38,92%,50%)]/20 text-[hsl(38,92%,50%)]',
    text: 'text-[hsl(38,92%,50%)]',
  },
};

export function CategoryTile({
  title,
  description,
  count,
  icon: Icon,
  href,
  variant,
}: CategoryTileProps) {
  const styles = variantStyles[variant];

  return (
    <Link
      to={href}
      className={cn(
        'block p-6 rounded-xl border transition-all duration-300',
        styles.bg,
        styles.border,
        'hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5'
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-lg', styles.icon)}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={cn('text-2xl font-bold', styles.text)}>{count}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
