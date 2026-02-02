import { Link } from 'react-router-dom';
import {
  Building2,
  Box,
  Server,
  Rocket,
  TrendingUp,
  Users,
  Globe,
  Briefcase,
  Search,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
} from 'lucide-react';
import { CategoryTile } from '@/components/ui/CategoryTile';
import { MetricCard } from '@/components/ui/MetricCard';
import { InsightCard } from '@/components/ui/InsightCard';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-border p-8 lg:p-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
              163 Parameters per Company
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent">
              Enterprise Intelligence
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            SRM Placement Intelligence
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Make data-driven placement decisions. Analyze companies coming to campus using
            structured intelligence across culture, compensation, growth, and technology.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search companies, sectors, or tech stack..."
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <div className="metric-grid">
          <MetricCard
            label="Total Companies"
            value="—"
            icon={Building2}
            variant="primary"
          />
          <MetricCard
            label="Focus Sectors"
            value="—"
            icon={Briefcase}
          />
          <MetricCard
            label="Avg Employee Size"
            value="—"
            icon={Users}
          />
          <MetricCard
            label="Countries Covered"
            value="—"
            icon={Globe}
          />
        </div>
      </section>

      {/* Category Tiles */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Explore by Category</h2>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CategoryTile
            title="Tech Giants"
            description="Large enterprise technology companies with global presence"
            count={0}
            icon={Building2}
            href="/categories/enterprise"
            variant="enterprise"
          />
          <CategoryTile
            title="Product Companies"
            description="Product-focused firms building scalable solutions"
            count={0}
            icon={Box}
            href="/categories/product"
            variant="product"
          />
          <CategoryTile
            title="Service Companies"
            description="IT services and consulting organizations"
            count={0}
            icon={Server}
            href="/categories/service"
            variant="service"
          />
          <CategoryTile
            title="Startups"
            description="High-growth startups and scale-ups"
            count={0}
            icon={Rocket}
            href="/categories/startup"
            variant="startup"
          />
        </div>
      </section>

      {/* Insights Grid */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-6">Quick Insights</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <InsightCard title="Hiring Velocity" icon={Zap}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">High</span>
                <span className="font-medium text-foreground">—</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Medium</span>
                <span className="font-medium text-foreground">—</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Low</span>
                <span className="font-medium text-foreground">—</span>
              </div>
            </div>
          </InsightCard>
          
          <InsightCard title="Profitability Status" icon={TrendingUp}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profitable</span>
                <span className="font-medium text-success">—</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Break-even</span>
                <span className="font-medium text-warning">—</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pre-profit</span>
                <span className="font-medium text-foreground">—</span>
              </div>
            </div>
          </InsightCard>
          
          <InsightCard title="Remote Policy" icon={Globe}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Remote</span>
                <span className="font-medium text-foreground">—</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hybrid</span>
                <span className="font-medium text-foreground">—</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">On-site</span>
                <span className="font-medium text-foreground">—</span>
              </div>
            </div>
          </InsightCard>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 gap-4">
        <Link
          to="/compare"
          className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-secondary">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Compare Companies</h3>
          <p className="text-sm text-muted-foreground">
            Side-by-side analysis of any two companies across culture, compensation, growth, and more.
          </p>
        </Link>
        
        <Link
          to="/skills"
          className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-secondary">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Skill Mapping</h3>
          <p className="text-sm text-muted-foreground">
            Match your skills to companies and identify preparation areas for optimal placement.
          </p>
        </Link>
      </section>

      {/* Data Notice */}
      <section className="p-4 rounded-lg border border-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          Connect to Lovable Cloud to populate company data. All intelligence is structured across 163 parameters per company.
        </p>
      </section>
    </div>
  );
}
