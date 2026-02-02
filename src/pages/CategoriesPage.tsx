import { Link } from 'react-router-dom';
import { Building2, Box, Server, Rocket, Users, TrendingUp, Globe } from 'lucide-react';
import { CategoryTile } from '@/components/ui/CategoryTile';
import { useCompanyStats } from '@/hooks/useCompanies';

export default function CategoriesPage() {
  const { data: stats } = useCompanyStats();

  const categories = [
    {
      title: 'Enterprise / Tech Giants',
      description: 'Large-scale technology corporations with global operations, extensive resources, and established market presence. Ideal for structured career growth.',
      variant: 'enterprise' as const,
      icon: Building2,
      slug: 'Enterprise',
      examples: ['Fortune 500 tech', 'Global banks', 'Multinational corporations'],
    },
    {
      title: 'Product Companies',
      description: 'Companies focused on building and scaling their own products. Strong emphasis on innovation, user experience, and technical excellence.',
      variant: 'product' as const,
      icon: Box,
      slug: 'Product',
      examples: ['SaaS platforms', 'Consumer apps', 'B2B solutions'],
    },
    {
      title: 'Service Companies',
      description: 'IT services, consulting, and outsourcing firms. Broad exposure to multiple domains and technologies across various client projects.',
      variant: 'service' as const,
      icon: Server,
      slug: 'Service',
      examples: ['IT consulting', 'System integrators', 'Managed services'],
    },
    {
      title: 'Startups & Scale-ups',
      description: 'High-growth ventures offering early ownership, rapid learning, and equity potential. Higher risk-reward profile.',
      variant: 'startup' as const,
      icon: Rocket,
      slug: 'Startup',
      examples: ['Seed to Series C', 'Unicorns', 'Growth-stage companies'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Company Categories</h1>
        <p className="text-muted-foreground">
          Explore companies organized by their nature, scale, and operational model.
        </p>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(217,91%,60%)]/10">
              <Building2 className="w-5 h-5 text-[hsl(217,91%,60%)]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats?.byCategory?.['Enterprise'] || 0}</p>
              <p className="text-xs text-muted-foreground">Enterprise</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(280,70%,55%)]/10">
              <Box className="w-5 h-5 text-[hsl(280,70%,55%)]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats?.byCategory?.['Product'] || 0}</p>
              <p className="text-xs text-muted-foreground">Product</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(173,80%,40%)]/10">
              <Server className="w-5 h-5 text-[hsl(173,80%,40%)]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats?.byCategory?.['Service'] || 0}</p>
              <p className="text-xs text-muted-foreground">Service</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(38,92%,50%)]/10">
              <Rocket className="w-5 h-5 text-[hsl(38,92%,50%)]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats?.byCategory?.['Startup'] || 0}</p>
              <p className="text-xs text-muted-foreground">Startup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/explore?category=${category.slug}`}
            className="group block"
          >
            <div className="intelligence-card h-full">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    category.variant === 'enterprise'
                      ? 'bg-[hsl(217,91%,60%)]/10'
                      : category.variant === 'product'
                      ? 'bg-[hsl(280,70%,55%)]/10'
                      : category.variant === 'service'
                      ? 'bg-[hsl(173,80%,40%)]/10'
                      : 'bg-[hsl(38,92%,50%)]/10'
                  }`}
                >
                  <category.icon
                    className={`w-6 h-6 ${
                      category.variant === 'enterprise'
                        ? 'text-[hsl(217,91%,60%)]'
                        : category.variant === 'product'
                        ? 'text-[hsl(280,70%,55%)]'
                        : category.variant === 'service'
                        ? 'text-[hsl(173,80%,40%)]'
                        : 'text-[hsl(38,92%,50%)]'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Typical Examples
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Decision Framework */}
      <div className="intelligence-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Category Selection Framework</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Criteria</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Enterprise</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Product</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Service</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Startup</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-foreground">Job Security</td>
                <td className="text-center py-3 px-4 text-success">High</td>
                <td className="text-center py-3 px-4 text-success">Medium-High</td>
                <td className="text-center py-3 px-4 text-warning">Medium</td>
                <td className="text-center py-3 px-4 text-destructive">Variable</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-foreground">Learning Pace</td>
                <td className="text-center py-3 px-4 text-muted-foreground">Structured</td>
                <td className="text-center py-3 px-4 text-success">Fast</td>
                <td className="text-center py-3 px-4 text-muted-foreground">Broad</td>
                <td className="text-center py-3 px-4 text-success">Very Fast</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-foreground">Early Ownership</td>
                <td className="text-center py-3 px-4 text-muted-foreground">Low</td>
                <td className="text-center py-3 px-4 text-warning">Medium</td>
                <td className="text-center py-3 px-4 text-warning">Medium</td>
                <td className="text-center py-3 px-4 text-success">High</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-foreground">Compensation</td>
                <td className="text-center py-3 px-4 text-success">High</td>
                <td className="text-center py-3 px-4 text-success">High</td>
                <td className="text-center py-3 px-4 text-warning">Medium</td>
                <td className="text-center py-3 px-4 text-muted-foreground">Variable + Equity</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-foreground">Brand Value</td>
                <td className="text-center py-3 px-4 text-success">Strong</td>
                <td className="text-center py-3 px-4 text-success">Growing</td>
                <td className="text-center py-3 px-4 text-warning">Moderate</td>
                <td className="text-center py-3 px-4 text-muted-foreground">Building</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
