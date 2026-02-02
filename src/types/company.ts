// Company entity type mapping EXACTLY to the Supabase table schema
// All 163 parameters mapped 1:1 with no modifications

export interface Company {
  // Primary key
  id: string;

  // Company Basics
  name: string;
  short_name: string;
  logo_url: string | null;
  category: 'Enterprise' | 'Product' | 'Service' | 'Startup' | string;
  incorporation_year: number | null;
  nature_of_company: string | null;
  headquarters_address: string | null;

  // Geographic Presence
  operating_countries: string | null;
  office_count: string | null;
  office_locations: string | null;

  // People & Talent
  employee_size: number | null;
  hiring_velocity: string | null;
  employee_turnover: string | null;
  avg_retention_tenure: string | null;
  diversity_metrics: string | null;
  remote_policy_details: string | null;
  training_spend: string | null;

  // Business Model
  pain_points_addressed: string | null;
  focus_sectors: string | null;
  offerings_description: string | null;
  top_customers: string | null;
  core_value_proposition: string | null;

  // Strategy & Culture
  vision: string | null;
  mission: string | null;
  values: string | null;
  unique_differentiators: string | null;
  competitive_advantages: string | null;
  weaknesses_gaps: string | null;
  key_challenges_needs: string | null;

  // Competitive Landscape
  key_competitors: string | null;
  technology_partners: string | null;

  // Company Narrative
  overview_text: string | null;
  interesting_facts: string | null;
  recent_news: string | null;

  // Digital Presence
  website_url: string | null;
  website_quality: string | null;
  website_rating: string | null;
  website_traffic_rank: string | null;
  social_media_followers: string | null;
  glassdoor_rating: string | null;
  indeed_rating: string | null;
  google_rating: string | null;
  linkedin_url: string | null;
  twitter_handle: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  marketing_video_url: string | null;
  customer_testimonials: string | null;

  // Leadership
  ceo_name: string | null;
  ceo_linkedin_url: string | null;
  key_leaders: string | null;
  warm_intro_pathways: string | null;
  decision_maker_access: string | null;
  board_members: string | null;

  // Contact Info
  primary_contact_email: string | null;
  primary_phone_number: string | null;
  contact_person_name: string | null;
  contact_person_title: string | null;
  contact_person_email: string | null;
  contact_person_phone: string | null;

  // Reputation
  awards_recognitions: string | null;
  brand_sentiment_score: string | null;
  event_participation: string | null;

  // Risk & Compliance
  regulatory_status: string | null;
  legal_issues: string | null;

  // Financials
  annual_revenue: string | null;
  annual_profit: string | null;
  revenue_mix: string | null;
  valuation: string | null;
  yoy_growth_rate: string | null;
  profitability_status: string | null;
  market_share_percentage: string | null;

  // Funding
  key_investors: string | null;
  recent_funding_rounds: string | null;
  total_capital_raised: string | null;
  burn_rate: string | null;
  runway_months: string | null;
  burn_multiplier: string | null;

  // Sustainability
  esg_ratings: string | null;
  carbon_footprint: string | null;
  ethical_sourcing: string | null;

  // Sales & Growth
  sales_motion: string | null;
  cac: string | null;
  clv: string | null;
  cac_ltv_ratio: string | null;
  churn_rate: string | null;
  nps: string | null;
  customer_concentration_risk: string | null;

  // Innovation
  intellectual_property: string | null;
  r_and_d_investment: string | null;
  ai_ml_adoption_level: string | null;
  innovation_roadmap: string | null;
  product_pipeline: string | null;
  tech_adoption_rating: string | null;

  // Operations
  tech_stack: string | null;
  cybersecurity_posture: string | null;
  supply_chain_dependencies: string | null;
  geopolitical_risks: string | null;
  macro_risks: string | null;

  // Market
  partnership_ecosystem: string | null;
  exit_strategy: string | null;
  tam: string | null;
  sam: string | null;
  som: string | null;
  go_to_market_strategy: string | null;

  // Benchmarking
  benchmark_vs_peers: string | null;

  // Forecasting
  future_projections: string | null;
  strategic_priorities: string | null;

  // Network
  industry_associations: string | null;

  // Proof Points
  case_studies: string | null;

  // Culture & People
  work_culture_summary: string | null;
  manager_quality: string | null;
  psychological_safety: string | null;
  feedback_culture: string | null;
  diversity_inclusion_score: string | null;
  ethical_standards: string | null;
  burnout_risk: string | null;
  layoff_history: string | null;

  // Work–Life Balance
  typical_hours: string | null;
  overtime_expectations: string | null;
  weekend_work: string | null;
  flexibility_level: string | null;
  leave_policy: string | null;

  // Location & Commute
  location_centrality: string | null;
  public_transport_access: string | null;
  cab_policy: string | null;
  airport_commute_time: string | null;
  office_zone_type: string | null;

  // Safety & Well-being
  area_safety: string | null;
  safety_policies: string | null;
  infrastructure_safety: string | null;
  emergency_preparedness: string | null;
  health_support: string | null;

  // Learning & Growth
  onboarding_quality: string | null;
  learning_culture: string | null;
  exposure_quality: string | null;
  mentorship_availability: string | null;
  internal_mobility: string | null;
  promotion_clarity: string | null;
  tools_access: string | null;

  // Role & Work Quality
  role_clarity: string | null;
  early_ownership: string | null;
  work_impact: string | null;
  execution_thinking_balance: string | null;
  automation_level: string | null;
  cross_functional_exposure: string | null;

  // Company Stability
  company_maturity: string | null;
  brand_value: string | null;
  client_quality: string | null;

  // Compensation & Benefits
  fixed_vs_variable_pay: string | null;
  bonus_predictability: string | null;
  esops_incentives: string | null;
  family_health_insurance: string | null;
  relocation_support: string | null;
  lifestyle_benefits: string | null;

  // Long-Term Career Signaling
  exit_opportunities: string | null;
  skill_relevance: string | null;
  external_recognition: string | null;
  network_strength: string | null;
  global_exposure: string | null;

  // Values Alignment
  mission_clarity: string | null;
  sustainability_csr: string | null;
  crisis_behavior: string | null;

  // Metadata
  created_at?: string;
  updated_at?: string;
}

// Category types for filtering
export type CompanyCategory = 'Enterprise' | 'Product' | 'Service' | 'Startup';

// Filter configuration
export interface CompanyFilters {
  category?: CompanyCategory | string | null;
  focus_sectors?: string | null;
  employee_size_min?: number | null;
  employee_size_max?: number | null;
  profitability_status?: string | null;
  remote_policy_details?: string | null;
  hiring_velocity?: string | null;
}

// Sort configuration
export type CompanySortField = 'name' | 'employee_size' | 'yoy_growth_rate' | 'brand_value';
export type SortDirection = 'asc' | 'desc';

export interface CompanySort {
  field: CompanySortField;
  direction: SortDirection;
}

// Skill match result
export interface SkillMatch {
  company: Company;
  matchScore: 'High' | 'Medium' | 'Low';
  matchedSkills: string[];
  skillGaps: string[];
  preparationFocus: string[];
}
