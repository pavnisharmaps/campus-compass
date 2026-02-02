// Company data service abstraction layer
// All data access is centralized here for future Supabase integration

import { Company, CompanyFilters, CompanySort, SkillMatch } from '@/types/company';

// Simulated async data fetching - will be replaced with Supabase queries
// Currently returns empty arrays as placeholders

export async function fetchCompanies(
  filters?: CompanyFilters,
  sort?: CompanySort
): Promise<Company[]> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('company')
  //   .select('*')
  //   .order(sort?.field || 'name', { ascending: sort?.direction === 'asc' });
  
  return [];
}

export async function fetchCompanyById(id: string): Promise<Company | null> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('company')
  //   .select('*')
  //   .eq('id', id)
  //   .maybeSingle();
  
  return null;
}

export async function fetchCompaniesByCategory(
  category: string
): Promise<Company[]> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('company')
  //   .select('*')
  //   .eq('category', category);
  
  return [];
}

export async function searchCompanies(query: string): Promise<Company[]> {
  // TODO: Replace with Supabase full-text search
  // const { data, error } = await supabase
  //   .from('company')
  //   .select('*')
  //   .or(`name.ilike.%${query}%,focus_sectors.ilike.%${query}%,tech_stack.ilike.%${query}%`);
  
  return [];
}

export async function fetchCompanyStats(): Promise<{
  totalCompanies: number;
  byCategory: Record<string, number>;
  byProfitability: Record<string, number>;
  byRemotePolicy: Record<string, number>;
  byHiringVelocity: Record<string, number>;
}> {
  // TODO: Replace with Supabase aggregation queries
  return {
    totalCompanies: 0,
    byCategory: {},
    byProfitability: {},
    byRemotePolicy: {},
    byHiringVelocity: {},
  };
}

export async function compareCompanies(
  companyId1: string,
  companyId2: string
): Promise<{ company1: Company | null; company2: Company | null }> {
  // TODO: Replace with parallel Supabase queries
  const [company1, company2] = await Promise.all([
    fetchCompanyById(companyId1),
    fetchCompanyById(companyId2),
  ]);
  
  return { company1, company2 };
}

export function matchSkillsToCompanies(
  skills: string[],
  companies: Company[]
): SkillMatch[] {
  // Rule-based skill matching logic
  // Matches against tech_stack, ai_ml_adoption_level, automation_level, skill_relevance
  
  return companies.map((company) => {
    const companySkills = [
      company.tech_stack,
      company.ai_ml_adoption_level,
      company.automation_level,
      company.skill_relevance,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    
    const matchedSkills = skills.filter((skill) =>
      companySkills.includes(skill.toLowerCase())
    );
    
    const skillGaps = skills.filter(
      (skill) => !companySkills.includes(skill.toLowerCase())
    );
    
    let matchScore: 'High' | 'Medium' | 'Low';
    const matchRatio = matchedSkills.length / skills.length;
    
    if (matchRatio >= 0.7) {
      matchScore = 'High';
    } else if (matchRatio >= 0.4) {
      matchScore = 'Medium';
    } else {
      matchScore = 'Low';
    }
    
    const preparationFocus = skillGaps.slice(0, 3);
    
    return {
      company,
      matchScore,
      matchedSkills,
      skillGaps,
      preparationFocus,
    };
  });
}

// Utility functions for data processing
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Enterprise: 'category-enterprise',
    Product: 'category-product',
    Service: 'category-service',
    Startup: 'category-startup',
  };
  return colors[category] || 'status-neutral';
}

export function formatEmployeeSize(size: number | null): string {
  if (!size) return 'N/A';
  if (size >= 100000) return `${(size / 1000).toFixed(0)}K+`;
  if (size >= 1000) return `${(size / 1000).toFixed(1)}K`;
  return size.toString();
}

export function parseListField(value: string | null): string[] {
  if (!value) return [];
  return value.split(';').map((item) => item.trim()).filter(Boolean);
}
