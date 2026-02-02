import { Link } from 'react-router-dom';
import { Building2, Users, MapPin, Briefcase } from 'lucide-react';
import { Company } from '@/types/company';
import { formatEmployeeSize, getCategoryColor, parseListField } from '@/services/companyService';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const sectors = parseListField(company.focus_sectors).slice(0, 3);

  return (
    <Link
      to={`/company/${company.id}`}
      className="intelligence-card block group"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={`${company.name} logo`}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <Building2 className={cn('w-6 h-6 text-muted-foreground', company.logo_url && 'hidden')} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            {company.short_name && (
              <span className="text-xs text-muted-foreground">
                ({company.short_name})
              </span>
            )}
          </div>

          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={getCategoryColor(company.category)}>
              {company.category}
            </Badge>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{formatEmployeeSize(company.employee_size)}</span>
            </div>
            {company.headquarters_address && (
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{company.headquarters_address.split(',')[0]}</span>
              </div>
            )}
          </div>

          {/* Focus sectors */}
          {sectors.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {sectors.map((sector, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {sector}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
