import { useQuery } from '@tanstack/react-query';
import {
  fetchCompanies,
  fetchCompanyById,
  fetchCompaniesByCategory,
  searchCompanies,
  fetchCompanyStats,
  compareCompanies,
} from '@/services/companyService';
import { CompanyFilters, CompanySort } from '@/types/company';

export function useCompanies(filters?: CompanyFilters, sort?: CompanySort) {
  return useQuery({
    queryKey: ['companies', filters, sort],
    queryFn: () => fetchCompanies(filters, sort),
  });
}

export function useCompany(id: string | undefined) {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => fetchCompanyById(id!),
    enabled: !!id,
  });
}

export function useCompaniesByCategory(category: string | undefined) {
  return useQuery({
    queryKey: ['companies', 'category', category],
    queryFn: () => fetchCompaniesByCategory(category!),
    enabled: !!category,
  });
}

export function useCompanySearch(query: string) {
  return useQuery({
    queryKey: ['companies', 'search', query],
    queryFn: () => searchCompanies(query),
    enabled: query.length >= 2,
  });
}

export function useCompanyStats() {
  return useQuery({
    queryKey: ['companies', 'stats'],
    queryFn: fetchCompanyStats,
  });
}

export function useCompareCompanies(id1: string | undefined, id2: string | undefined) {
  return useQuery({
    queryKey: ['companies', 'compare', id1, id2],
    queryFn: () => compareCompanies(id1!, id2!),
    enabled: !!id1 && !!id2,
  });
}
