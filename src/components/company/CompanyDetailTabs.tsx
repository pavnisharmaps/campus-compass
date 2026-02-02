import { useState } from 'react';
import { Company } from '@/types/company';
import { parseListField } from '@/services/companyService';
import { SectionCard } from '@/components/ui/SectionCard';
import { DataField, DataList } from '@/components/ui/DataField';
import { cn } from '@/lib/utils';
import {
  Building2,
  Briefcase,
  Users,
  GraduationCap,
  Wallet,
  MapPin,
  TrendingUp,
  Cpu,
  UserCircle,
  Globe,
} from 'lucide-react';

interface CompanyDetailTabsProps {
  company: Company;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Building2 },
  { id: 'business', label: 'Business & Market', icon: Briefcase },
  { id: 'culture', label: 'Culture & People', icon: Users },
  { id: 'growth', label: 'Learning & Growth', icon: GraduationCap },
  { id: 'compensation', label: 'Compensation', icon: Wallet },
  { id: 'logistics', label: 'Work Logistics', icon: MapPin },
  { id: 'financials', label: 'Financials', icon: TrendingUp },
  { id: 'technology', label: 'Technology', icon: Cpu },
  { id: 'leadership', label: 'Leadership', icon: UserCircle },
  { id: 'presence', label: 'Digital Presence', icon: Globe },
];

export function CompanyDetailTabs({ company }: CompanyDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Tab Navigation */}
      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm py-4 mb-6 -mx-4 px-4 lg:-mx-8 lg:px-8 border-b border-border">
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6 animate-fade-in">
        {activeTab === 'overview' && <OverviewSection company={company} />}
        {activeTab === 'business' && <BusinessSection company={company} />}
        {activeTab === 'culture' && <CultureSection company={company} />}
        {activeTab === 'growth' && <GrowthSection company={company} />}
        {activeTab === 'compensation' && <CompensationSection company={company} />}
        {activeTab === 'logistics' && <LogisticsSection company={company} />}
        {activeTab === 'financials' && <FinancialsSection company={company} />}
        {activeTab === 'technology' && <TechnologySection company={company} />}
        {activeTab === 'leadership' && <LeadershipSection company={company} />}
        {activeTab === 'presence' && <PresenceSection company={company} />}
      </div>
    </div>
  );
}

function OverviewSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Company Overview" icon={Building2}>
      <div className="space-y-6">
        {company.overview_text && (
          <p className="text-sm text-foreground leading-relaxed">{company.overview_text}</p>
        )}
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataField label="Nature of Company" value={company.nature_of_company} />
          <DataField label="Year of Incorporation" value={company.incorporation_year} />
          <DataField label="Headquarters" value={company.headquarters_address} />
          <DataField label="Employee Size" value={company.employee_size?.toLocaleString()} />
          <DataField label="Office Count" value={company.office_count} />
        </div>

        <DataList
          label="Operating Countries"
          items={parseListField(company.operating_countries)}
        />
        
        <DataList
          label="Office Locations"
          items={parseListField(company.office_locations)}
        />
        
        <DataField label="Recent News" value={company.recent_news} variant="stacked" />
      </div>
    </SectionCard>
  );
}

function BusinessSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Business & Market" icon={Briefcase}>
      <div className="space-y-6">
        <DataField label="Core Value Proposition" value={company.core_value_proposition} variant="stacked" />
        <DataField label="Pain Points Addressed" value={company.pain_points_addressed} variant="stacked" />
        
        <div className="grid sm:grid-cols-2 gap-4">
          <DataList label="Focus Sectors" items={parseListField(company.focus_sectors)} />
          <DataList label="Services/Offerings" items={parseListField(company.offerings_description)} />
        </div>
        
        <DataField label="Top Customers" value={company.top_customers} variant="stacked" />
        <DataField label="Unique Differentiators" value={company.unique_differentiators} variant="stacked" />
        <DataField label="Competitive Advantages" value={company.competitive_advantages} variant="stacked" />
        <DataField label="Weaknesses/Gaps" value={company.weaknesses_gaps} variant="stacked" />
        <DataField label="Key Challenges" value={company.key_challenges_needs} variant="stacked" />
        
        <DataList label="Key Competitors" items={parseListField(company.key_competitors)} />
        
        <div className="grid sm:grid-cols-3 gap-4">
          <DataField label="TAM" value={company.tam} />
          <DataField label="SAM" value={company.sam} />
          <DataField label="SOM" value={company.som} />
        </div>
        
        <DataField label="Market Share" value={company.market_share_percentage} />
        <DataField label="Go-to-Market Strategy" value={company.go_to_market_strategy} variant="stacked" />
        <DataField label="Strategic Priorities" value={company.strategic_priorities} variant="stacked" />
        <DataField label="Future Projections" value={company.future_projections} variant="stacked" />
      </div>
    </SectionCard>
  );
}

function CultureSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Culture, People & Work" icon={Users}>
      <div className="space-y-6">
        <DataField label="Work Culture Summary" value={company.work_culture_summary} variant="stacked" />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataField label="Hiring Velocity" value={company.hiring_velocity} />
          <DataField label="Employee Turnover" value={company.employee_turnover} />
          <DataField label="Average Retention Tenure" value={company.avg_retention_tenure} />
          <DataField label="Manager Quality" value={company.manager_quality} />
          <DataField label="Psychological Safety" value={company.psychological_safety} />
          <DataField label="Feedback Culture" value={company.feedback_culture} />
        </div>
        
        <DataField label="Diversity Metrics" value={company.diversity_metrics} variant="stacked" />
        <DataField label="Diversity & Inclusion Score" value={company.diversity_inclusion_score} />
        <DataField label="Ethical Standards" value={company.ethical_standards} variant="stacked" />
        <DataField label="Layoff History" value={company.layoff_history} variant="stacked" />
        <DataField label="Burnout Risk" value={company.burnout_risk} />
        <DataField label="Mission Clarity" value={company.mission_clarity} />
      </div>
    </SectionCard>
  );
}

function GrowthSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Learning, Growth & Career Signal" icon={GraduationCap}>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataField label="Training Spend" value={company.training_spend} />
          <DataField label="Onboarding Quality" value={company.onboarding_quality} />
          <DataField label="Learning Culture" value={company.learning_culture} />
          <DataField label="Exposure Quality" value={company.exposure_quality} />
          <DataField label="Mentorship Availability" value={company.mentorship_availability} />
          <DataField label="Internal Mobility" value={company.internal_mobility} />
          <DataField label="Promotion Clarity" value={company.promotion_clarity} />
          <DataField label="Tools Access" value={company.tools_access} />
          <DataField label="Role Clarity" value={company.role_clarity} />
          <DataField label="Early Ownership" value={company.early_ownership} />
          <DataField label="Work Impact" value={company.work_impact} />
          <DataField label="Execution vs Thinking Balance" value={company.execution_thinking_balance} />
          <DataField label="Automation Level" value={company.automation_level} />
          <DataField label="Cross-functional Exposure" value={company.cross_functional_exposure} />
        </div>
        
        <DataField label="Exit Opportunities" value={company.exit_opportunities} variant="stacked" />
        <DataField label="Skill Relevance" value={company.skill_relevance} />
        <DataField label="Network Strength" value={company.network_strength} />
        <DataField label="Global Exposure" value={company.global_exposure} />
        <DataField label="External Recognition" value={company.external_recognition} />
      </div>
    </SectionCard>
  );
}

function CompensationSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Compensation & Lifestyle" icon={Wallet}>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataField label="Fixed vs Variable Pay" value={company.fixed_vs_variable_pay} />
          <DataField label="Bonus Predictability" value={company.bonus_predictability} />
          <DataField label="ESOPs & Incentives" value={company.esops_incentives} />
          <DataField label="Family Health Insurance" value={company.family_health_insurance} />
          <DataField label="Relocation Support" value={company.relocation_support} />
          <DataField label="Lifestyle Benefits" value={company.lifestyle_benefits} />
          <DataField label="Leave Policy" value={company.leave_policy} />
          <DataField label="Health Support" value={company.health_support} />
        </div>
      </div>
    </SectionCard>
  );
}

function LogisticsSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Work Logistics & Safety" icon={MapPin}>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataField label="Remote Policy" value={company.remote_policy_details} />
          <DataField label="Typical Hours" value={company.typical_hours} />
          <DataField label="Overtime Expectations" value={company.overtime_expectations} />
          <DataField label="Weekend Work" value={company.weekend_work} />
          <DataField label="Flexibility Level" value={company.flexibility_level} />
          <DataField label="Location Centrality" value={company.location_centrality} />
          <DataField label="Public Transport Access" value={company.public_transport_access} />
          <DataField label="Cab Policy" value={company.cab_policy} />
          <DataField label="Airport Commute Time" value={company.airport_commute_time} />
          <DataField label="Office Zone Type" value={company.office_zone_type} />
          <DataField label="Area Safety" value={company.area_safety} />
          <DataField label="Safety Policies" value={company.safety_policies} />
          <DataField label="Infrastructure Safety" value={company.infrastructure_safety} />
          <DataField label="Emergency Preparedness" value={company.emergency_preparedness} />
        </div>
      </div>
    </SectionCard>
  );
}

function FinancialsSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Financials, Risk & Stability" icon={TrendingUp}>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataField label="Annual Revenue" value={company.annual_revenue} />
          <DataField label="Annual Profit" value={company.annual_profit} />
          <DataField label="Revenue Mix" value={company.revenue_mix} />
          <DataField label="Valuation" value={company.valuation} />
          <DataField label="YoY Growth Rate" value={company.yoy_growth_rate} />
          <DataField label="Profitability Status" value={company.profitability_status} />
        </div>
        
        <DataList label="Key Investors" items={parseListField(company.key_investors)} />
        <DataField label="Recent Funding Rounds" value={company.recent_funding_rounds} variant="stacked" />
        
        <div className="grid sm:grid-cols-3 gap-4">
          <DataField label="Total Capital Raised" value={company.total_capital_raised} />
          <DataField label="Burn Rate" value={company.burn_rate} />
          <DataField label="Runway (Months)" value={company.runway_months} />
          <DataField label="Burn Multiplier" value={company.burn_multiplier} />
        </div>
        
        <DataField label="ESG Ratings" value={company.esg_ratings} variant="stacked" />
        <DataField label="Regulatory Status" value={company.regulatory_status} variant="stacked" />
        <DataField label="Legal Issues" value={company.legal_issues} variant="stacked" />
        <DataField label="Supply Chain Dependencies" value={company.supply_chain_dependencies} variant="stacked" />
        <DataField label="Geopolitical Risks" value={company.geopolitical_risks} variant="stacked" />
        <DataField label="Macro Risks" value={company.macro_risks} variant="stacked" />
      </div>
    </SectionCard>
  );
}

function TechnologySection({ company }: { company: Company }) {
  return (
    <SectionCard title="Technology & Innovation" icon={Cpu}>
      <div className="space-y-6">
        <DataField label="Tech Stack" value={company.tech_stack} variant="stacked" />
        <DataList label="Technology Partners" items={parseListField(company.technology_partners)} />
        <DataField label="Intellectual Property" value={company.intellectual_property} variant="stacked" />
        
        <div className="grid sm:grid-cols-2 gap-4">
          <DataField label="R&D Investment" value={company.r_and_d_investment} />
          <DataField label="AI/ML Adoption Level" value={company.ai_ml_adoption_level} />
          <DataField label="Cybersecurity Posture" value={company.cybersecurity_posture} />
          <DataField label="Tech Adoption Rating" value={company.tech_adoption_rating} />
        </div>
        
        <DataField label="Innovation Roadmap" value={company.innovation_roadmap} variant="stacked" />
        <DataField label="Product Pipeline" value={company.product_pipeline} variant="stacked" />
        <DataField label="Partnership Ecosystem" value={company.partnership_ecosystem} variant="stacked" />
      </div>
    </SectionCard>
  );
}

function LeadershipSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Leadership & Contacts" icon={UserCircle}>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <DataField label="CEO Name" value={company.ceo_name} />
          {company.ceo_linkedin_url && company.ceo_linkedin_url !== 'NA' && (
            <DataField label="CEO LinkedIn" value={company.ceo_linkedin_url} />
          )}
        </div>
        
        <DataField label="Key Business Leaders" value={company.key_leaders} variant="stacked" />
        <DataField label="Board Members" value={company.board_members} variant="stacked" />
        <DataField label="Warm Introduction Pathways" value={company.warm_intro_pathways} variant="stacked" />
        <DataField label="Decision Maker Accessibility" value={company.decision_maker_access} variant="stacked" />
        
        <div className="section-divider my-6" />
        <h3 className="text-sm font-semibold text-foreground mb-4">Contact Information</h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <DataField label="Contact Email" value={company.primary_contact_email} />
          <DataField label="Contact Phone" value={company.primary_phone_number} />
          <DataField label="Contact Person" value={company.contact_person_name} />
          <DataField label="Contact Title" value={company.contact_person_title} />
        </div>
      </div>
    </SectionCard>
  );
}

function PresenceSection({ company }: { company: Company }) {
  return (
    <SectionCard title="Brand & Digital Presence" icon={Globe}>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {company.website_url && (
            <a
              href={company.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary transition-colors"
            >
              <p className="data-label mb-1">Website</p>
              <p className="text-sm font-medium text-primary truncate">{company.website_url}</p>
            </a>
          )}
          <DataField label="Website Quality" value={company.website_quality} />
          <DataField label="Website Rating" value={company.website_rating} />
          <DataField label="Traffic Rank" value={company.website_traffic_rank} />
          <DataField label="Social Media Followers" value={company.social_media_followers} />
        </div>
        
        <div className="section-divider my-6" />
        <h3 className="text-sm font-semibold text-foreground mb-4">Ratings</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <DataField label="Glassdoor" value={company.glassdoor_rating} />
          <DataField label="Indeed" value={company.indeed_rating} />
          <DataField label="Google" value={company.google_rating} />
          <DataField label="Brand Sentiment" value={company.brand_sentiment_score} />
        </div>
        
        <div className="section-divider my-6" />
        <h3 className="text-sm font-semibold text-foreground mb-4">Social Profiles</h3>
        
        <div className="flex flex-wrap gap-3">
          {company.linkedin_url && (
            <a
              href={company.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              LinkedIn
            </a>
          )}
          {company.twitter_handle && (
            <a
              href={`https://twitter.com/${company.twitter_handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Twitter/X
            </a>
          )}
          {company.facebook_url && (
            <a
              href={company.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Facebook
            </a>
          )}
          {company.instagram_url && (
            <a
              href={company.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Instagram
            </a>
          )}
        </div>
        
        <DataField label="Awards & Recognitions" value={company.awards_recognitions} variant="stacked" />
        <DataField label="Event Participation" value={company.event_participation} variant="stacked" />
        <DataField label="Customer Testimonials" value={company.customer_testimonials} variant="stacked" />
      </div>
    </SectionCard>
  );
}
