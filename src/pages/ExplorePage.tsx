import { useState } from 'react';
import { Search, Filter, SortAsc, Grid, List, Building2 } from 'lucide-react';
import { useCompanies } from '@/hooks/useCompanies';
import { CompanyCard } from '@/components/ui/CompanyCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CompanyFilters, CompanySort, CompanySortField, SortDirection } from '@/types/company';
import { cn } from '@/lib/utils';

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<CompanyFilters>({});
  const [sort, setSort] = useState<CompanySort>({ field: 'name', direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: companies = [], isLoading } = useCompanies(filters, sort);

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-') as [CompanySortField, SortDirection];
    setSort({ field, direction });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Explore Companies</h1>
        <p className="text-muted-foreground">
          Browse and filter all companies coming to campus for placements.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, sector, or tech stack..."
            className="search-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select
            value={filters.category || ''}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value || null }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Service">Service</SelectItem>
              <SelectItem value="Startup">Startup</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.profitability_status || ''}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, profitability_status: value || null }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Profitability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Profitable">Profitable</SelectItem>
              <SelectItem value="Break-even">Break-even</SelectItem>
              <SelectItem value="Pre-profit">Pre-profit</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={`${sort.field}-${sort.direction}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-40">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
              <SelectItem value="employee_size-desc">Size (Largest)</SelectItem>
              <SelectItem value="employee_size-asc">Size (Smallest)</SelectItem>
              <SelectItem value="yoy_growth_rate-desc">Growth (Highest)</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              className={cn(
                'p-2 transition-colors',
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              className={cn(
                'p-2 transition-colors',
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.category || filters.profitability_status) && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
              {filters.category}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: null }))}
                className="ml-1 hover:text-primary/70"
              >
                ×
              </button>
            </span>
          )}
          {filters.profitability_status && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-success/10 text-success">
              {filters.profitability_status}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, profitability_status: null }))}
                className="ml-1 hover:text-success/70"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => setFilters({})}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {companies.length} companies found
        </p>
      </div>

      {/* Company Grid/List */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="intelligence-card animate-pulse">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-lg bg-secondary" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : companies.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No companies found"
          description="Connect to Lovable Cloud to load company data, or adjust your filters."
        />
      ) : (
        <div
          className={cn(
            'gap-4',
            viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
          )}
        >
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
