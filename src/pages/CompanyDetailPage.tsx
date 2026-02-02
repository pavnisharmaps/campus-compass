import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, ExternalLink, MapPin, Users, Calendar, Share2 } from 'lucide-react';
import { useCompany } from '@/hooks/useCompanies';
import { CompanyDetailTabs } from '@/components/company/CompanyDetailTabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCategoryColor, formatEmployeeSize } from '@/services/companyService';

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: company, isLoading, error } = useCompany(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-secondary animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-secondary rounded animate-pulse" />
            <div className="h-4 w-32 bg-secondary rounded animate-pulse" />
          </div>
        </div>
        <div className="h-96 bg-card rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error || !company) {
    return (
      <EmptyState
        icon={Building2}
        title="Company not found"
        description="The company you're looking for doesn't exist or hasn't been loaded yet."
        action={
          <Link to="/explore">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Explore
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      {/* Company Header */}
      <header className="intelligence-card">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Logo */}
          <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={`${company.name} logo`}
                className="w-full h-full object-contain p-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Building2 className="w-10 h-10 text-muted-foreground" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
              {company.short_name && (
                <span className="text-lg text-muted-foreground">({company.short_name})</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className={getCategoryColor(company.category)}>
                {company.category}
              </Badge>
              {company.profitability_status && (
                <Badge
                  variant="outline"
                  className={
                    company.profitability_status === 'Profitable'
                      ? 'status-positive'
                      : 'status-neutral'
                  }
                >
                  {company.profitability_status}
                </Badge>
              )}
              {company.nature_of_company && (
                <Badge variant="outline" className="status-neutral">
                  {company.nature_of_company}
                </Badge>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              {company.employee_size && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{formatEmployeeSize(company.employee_size)} employees</span>
                </div>
              )}
              {company.headquarters_address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{company.headquarters_address.split(',').slice(0, 2).join(',')}</span>
                </div>
              )}
              {company.incorporation_year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Est. {company.incorporation_year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {company.website_url && (
              <a
                href={company.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </Button>
              </a>
            )}
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Tabbed Content */}
      <CompanyDetailTabs company={company} />
    </div>
  );
}
