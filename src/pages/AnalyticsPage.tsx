import {
  BarChart3,
  PieChart,
  TrendingUp,
  Building2,
  Users,
  Globe,
  Briefcase,
  Zap,
} from 'lucide-react';
import { useCompanyStats } from '@/hooks/useCompanies';
import { InsightCard } from '@/components/ui/InsightCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CHART_COLORS = [
  'hsl(217, 91%, 60%)', // primary
  'hsl(173, 80%, 40%)', // accent
  'hsl(280, 70%, 55%)', // product
  'hsl(38, 92%, 50%)', // startup
  'hsl(152, 69%, 40%)', // success
];

export default function AnalyticsPage() {
  const { data: stats, isLoading } = useCompanyStats();

  // Placeholder data for visualization demo
  const categoryData = [
    { name: 'Enterprise', value: stats?.byCategory?.['Enterprise'] || 0 },
    { name: 'Product', value: stats?.byCategory?.['Product'] || 0 },
    { name: 'Service', value: stats?.byCategory?.['Service'] || 0 },
    { name: 'Startup', value: stats?.byCategory?.['Startup'] || 0 },
  ];

  const profitabilityData = [
    { name: 'Profitable', value: stats?.byProfitability?.['Profitable'] || 0 },
    { name: 'Break-even', value: stats?.byProfitability?.['Break-even'] || 0 },
    { name: 'Pre-profit', value: stats?.byProfitability?.['Pre-profit'] || 0 },
  ];

  const remotePolicyData = [
    { name: 'Remote', value: stats?.byRemotePolicy?.['Remote'] || 0 },
    { name: 'Hybrid', value: stats?.byRemotePolicy?.['Hybrid'] || 0 },
    { name: 'On-site', value: stats?.byRemotePolicy?.['On-site'] || 0 },
  ];

  const hiringVelocityData = [
    { name: 'High', value: stats?.byHiringVelocity?.['High'] || 0 },
    { name: 'Medium', value: stats?.byHiringVelocity?.['Medium'] || 0 },
    { name: 'Low', value: stats?.byHiringVelocity?.['Low'] || 0 },
  ];

  const hasData = stats?.totalCompanies && stats.totalCompanies > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Visual analysis of placement landscape across all companies.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="metric-grid">
        <MetricCard
          label="Total Companies"
          value={stats?.totalCompanies || 0}
          icon={Building2}
          variant="primary"
        />
        <MetricCard
          label="Categories"
          value={Object.keys(stats?.byCategory || {}).length || 0}
          icon={Briefcase}
        />
        <MetricCard
          label="Profitable"
          value={stats?.byProfitability?.['Profitable'] || 0}
          icon={TrendingUp}
        />
        <MetricCard
          label="Hiring Actively"
          value={stats?.byHiringVelocity?.['High'] || 0}
          icon={Zap}
        />
      </div>

      {!hasData ? (
        <EmptyState
          icon={BarChart3}
          title="No analytics data available"
          description="Connect to Lovable Cloud and load company data to see placement analytics and insights."
        />
      ) : (
        <>
          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <InsightCard title="Company Distribution by Category" icon={PieChart}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </InsightCard>

            {/* Profitability Status */}
            <InsightCard title="Profitability Status" icon={TrendingUp}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitabilityData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="hsl(var(--muted-foreground))"
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </InsightCard>

            {/* Remote Policy */}
            <InsightCard title="Remote Policy Distribution" icon={Globe}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={remotePolicyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {remotePolicyData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[(index + 1) % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </InsightCard>

            {/* Hiring Velocity */}
            <InsightCard title="Hiring Velocity Trends" icon={Zap}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hiringVelocityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </InsightCard>
          </div>

          {/* Insights Summary */}
          <div className="intelligence-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Observations</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Dominant Category</p>
                <p className="text-lg font-semibold text-foreground">
                  {categoryData.reduce((a, b) => (a.value > b.value ? a : b)).name || '—'}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Profitability Rate</p>
                <p className="text-lg font-semibold text-foreground">
                  {stats?.totalCompanies
                    ? `${Math.round(
                        ((stats?.byProfitability?.['Profitable'] || 0) / stats.totalCompanies) *
                          100
                      )}%`
                    : '—'}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Hybrid-First</p>
                <p className="text-lg font-semibold text-foreground">
                  {stats?.totalCompanies
                    ? `${Math.round(
                        ((stats?.byRemotePolicy?.['Hybrid'] || 0) / stats.totalCompanies) * 100
                      )}%`
                    : '—'}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Active Hiring</p>
                <p className="text-lg font-semibold text-foreground">
                  {stats?.totalCompanies
                    ? `${Math.round(
                        ((stats?.byHiringVelocity?.['High'] || 0) / stats.totalCompanies) * 100
                      )}%`
                    : '—'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Data Notice */}
      <div className="p-4 rounded-lg border border-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          Analytics are computed from real-time company data. Connect to Lovable Cloud for live insights.
        </p>
      </div>
    </div>
  );
}
