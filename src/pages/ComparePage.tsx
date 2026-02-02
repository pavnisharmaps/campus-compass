import { useState } from 'react';
import { GitCompare, Search, Building2, ArrowLeftRight } from 'lucide-react';
import { useCompanies, useCompareCompanies } from '@/hooks/useCompanies';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Company } from '@/types/company';
import { cn } from '@/lib/utils';
import { formatEmployeeSize, getCategoryColor, parseListField } from '@/services/companyService';
import { Badge } from '@/components/ui/badge';

interface ComparisonRow {
  label: string;
  field: keyof Company;
  category: string;
}

const comparisonFields: ComparisonRow[] = [
  // Overview
  { label: 'Category', field: 'category', category: 'Overview' },
  { label: 'Employee Size', field: 'employee_size', category: 'Overview' },
  { label: 'Headquarters', field: 'headquarters_address', category: 'Overview' },
  { label: 'Nature', field: 'nature_of_company', category: 'Overview' },
  
  // Culture
  { label: 'Work Culture', field: 'work_culture_summary', category: 'Culture' },
  { label: 'Manager Quality', field: 'manager_quality', category: 'Culture' },
  { label: 'Psychological Safety', field: 'psychological_safety', category: 'Culture' },
  { label: 'Burnout Risk', field: 'burnout_risk', category: 'Culture' },
  { label: 'Diversity Metrics', field: 'diversity_metrics', category: 'Culture' },
  
  // Compensation
  { label: 'Fixed vs Variable Pay', field: 'fixed_vs_variable_pay', category: 'Compensation' },
  { label: 'Bonus Predictability', field: 'bonus_predictability', category: 'Compensation' },
  { label: 'ESOPs & Incentives', field: 'esops_incentives', category: 'Compensation' },
  { label: 'Health Insurance', field: 'family_health_insurance', category: 'Compensation' },
  
  // Growth
  { label: 'Learning Culture', field: 'learning_culture', category: 'Growth' },
  { label: 'Mentorship', field: 'mentorship_availability', category: 'Growth' },
  { label: 'Internal Mobility', field: 'internal_mobility', category: 'Growth' },
  { label: 'Promotion Clarity', field: 'promotion_clarity', category: 'Growth' },
  { label: 'Exit Opportunities', field: 'exit_opportunities', category: 'Growth' },
  
  // Financials
  { label: 'Annual Revenue', field: 'annual_revenue', category: 'Financials' },
  { label: 'Profitability', field: 'profitability_status', category: 'Financials' },
  { label: 'YoY Growth', field: 'yoy_growth_rate', category: 'Financials' },
  { label: 'Valuation', field: 'valuation', category: 'Financials' },
  
  // Technology
  { label: 'Tech Stack', field: 'tech_stack', category: 'Technology' },
  { label: 'AI/ML Adoption', field: 'ai_ml_adoption_level', category: 'Technology' },
  { label: 'R&D Investment', field: 'r_and_d_investment', category: 'Technology' },
  
  // Work-Life
  { label: 'Remote Policy', field: 'remote_policy_details', category: 'Work-Life' },
  { label: 'Typical Hours', field: 'typical_hours', category: 'Work-Life' },
  { label: 'Weekend Work', field: 'weekend_work', category: 'Work-Life' },
  { label: 'Leave Policy', field: 'leave_policy', category: 'Work-Life' },
];

export default function ComparePage() {
  const [company1Id, setCompany1Id] = useState<string | null>(null);
  const [company2Id, setCompany2Id] = useState<string | null>(null);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const { data: companies = [] } = useCompanies();
  const { data: compareData } = useCompareCompanies(company1Id || undefined, company2Id || undefined);

  const filteredCompanies1 = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery1.toLowerCase())
  );
  const filteredCompanies2 = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery2.toLowerCase())
  );

  const renderValue = (company: Company | null, field: keyof Company) => {
    if (!company) return '—';
    const value = company[field];
    if (value === null || value === undefined || value === '') return '—';
    if (field === 'employee_size') return formatEmployeeSize(value as number);
    return String(value);
  };

  const categories = [...new Set(comparisonFields.map((f) => f.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Compare Companies</h1>
        <p className="text-muted-foreground">
          Side-by-side analysis across culture, compensation, growth, financials, and technology.
        </p>
      </div>

      {/* Company Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Company 1 Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-2">
            First Company
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search company..."
              className="search-input pl-10"
              value={searchQuery1}
              onChange={(e) => {
                setSearchQuery1(e.target.value);
                setShowDropdown1(true);
              }}
              onFocus={() => setShowDropdown1(true)}
            />
          </div>
          {showDropdown1 && filteredCompanies1.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredCompanies1.map((company) => (
                <button
                  key={company.id}
                  className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors border-b border-border/50 last:border-0"
                  onClick={() => {
                    setCompany1Id(company.id);
                    setSearchQuery1(company.name);
                    setShowDropdown1(false);
                  }}
                >
                  <p className="font-medium text-foreground">{company.name}</p>
                  <p className="text-xs text-muted-foreground">{company.category}</p>
                </button>
              ))}
            </div>
          )}
          {compareData?.company1 && (
            <div className="mt-3 p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="font-medium text-foreground">{compareData.company1.name}</p>
              <Badge variant="outline" className={getCategoryColor(compareData.company1.category)}>
                {compareData.company1.category}
              </Badge>
            </div>
          )}
        </div>

        {/* Company 2 Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-2">
            Second Company
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search company..."
              className="search-input pl-10"
              value={searchQuery2}
              onChange={(e) => {
                setSearchQuery2(e.target.value);
                setShowDropdown2(true);
              }}
              onFocus={() => setShowDropdown2(true)}
            />
          </div>
          {showDropdown2 && filteredCompanies2.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredCompanies2.map((company) => (
                <button
                  key={company.id}
                  className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors border-b border-border/50 last:border-0"
                  onClick={() => {
                    setCompany2Id(company.id);
                    setSearchQuery2(company.name);
                    setShowDropdown2(false);
                  }}
                >
                  <p className="font-medium text-foreground">{company.name}</p>
                  <p className="text-xs text-muted-foreground">{company.category}</p>
                </button>
              ))}
            </div>
          )}
          {compareData?.company2 && (
            <div className="mt-3 p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="font-medium text-foreground">{compareData.company2.name}</p>
              <Badge variant="outline" className={getCategoryColor(compareData.company2.category)}>
                {compareData.company2.category}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {!company1Id || !company2Id ? (
        <EmptyState
          icon={GitCompare}
          title="Select two companies to compare"
          description="Choose companies from the search boxes above to see a detailed side-by-side comparison."
        />
      ) : !compareData?.company1 || !compareData?.company2 ? (
        <EmptyState
          icon={Building2}
          title="Companies not found"
          description="Connect to Lovable Cloud to load company data for comparison."
        />
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="intelligence-card">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                {category}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground w-1/4">
                        Parameter
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-foreground w-[37.5%]">
                        {compareData.company1.name}
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-foreground w-[37.5%]">
                        {compareData.company2.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFields
                      .filter((f) => f.category === category)
                      .map((field) => (
                        <tr key={field.field} className="border-b border-border/50 last:border-0">
                          <td className="py-3 px-3 text-sm text-muted-foreground">
                            {field.label}
                          </td>
                          <td className="py-3 px-3 text-sm text-foreground">
                            {renderValue(compareData.company1, field.field)}
                          </td>
                          <td className="py-3 px-3 text-sm text-foreground">
                            {renderValue(compareData.company2, field.field)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
