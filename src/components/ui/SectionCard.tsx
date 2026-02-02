import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionCard({ title, icon: Icon, children, className, id }: SectionCardProps) {
  return (
    <section id={id} className={cn('intelligence-card', className)}>
      <div className="section-header mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h2>{title}</h2>
      </div>
      <div className="section-divider mb-6" />
      {children}
    </section>
  );
}
