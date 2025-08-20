import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Calendar, Target, BarChart3 } from 'lucide-react';

export default function Financial() {
  const revenueProjections = [
    { year: '2025', revenue: 2.5, customers: 8, growth: '' },
    { year: '2026', revenue: 12.8, customers: 35, growth: '412%' },
    { year: '2027', revenue: 34.2, customers: 85, growth: '167%' },
    { year: '2028', revenue: 78.5, customers: 180, growth: '129%' },
    { year: '2029', revenue: 156.3, customers: 320, growth: '99%' },
    { year: '2030', revenue: 287.4, customers: 520, growth: '84%' }
  ];

  const revenueStreams = [
    {
      title: 'Stadium & Event Licensing',
      percentage: 45,
      description: 'Per-venue annual licenses for stadiums, convention centers, and large venues',
      arpu: '$85K-$250K'
    },
    {
      title: 'Enterprise Solutions',
      percentage: 35,
      description: 'Corporate emergency communication systems and industrial safety platforms',
      arpu: '$125K-$500K'
    },
    {
      title: 'Government Contracts',
      percentage: 15,
      description: 'Municipal emergency services and military applications',
      arpu: '$500K-$2M'
    },
    {
      title: 'API & Integration Services',
      percentage: 5,
      description: 'Third-party integrations and custom development services',
      arpu: '$25K-$100K'
    }
  ];

  const keyMetrics = [
    { metric: 'Customer Acquisition Cost (CAC)', value: '$45K', trend: 'down', description: 'Decreasing due to referral programs' },
    { metric: 'Customer Lifetime Value (LTV)', value: '$680K', trend: 'up', description: '15:1 LTV/CAC ratio' },
    { metric: 'Gross Margin', value: '87%', trend: 'stable', description: 'Software-first model' },
    { metric: 'Net Revenue Retention', value: '145%', trend: 'up', description: 'Strong expansion revenue' },
    { metric: 'Sales Cycle', value: '4.2 months', trend: 'down', description: 'Improving with market education' },
    { metric: 'Churn Rate', value: '3.2%', trend: 'down', description: 'Mission-critical applications' }
  ];

  const fundingUse = [
    { category: 'R&D & Product Development', percentage: 40, amount: 8.0 },
    { category: 'Sales & Marketing', percentage: 35, amount: 7.0 },
    { category: 'Operations & Infrastructure', percentage: 15, amount: 3.0 },
    { category: 'Working Capital', percentage: 10, amount: 2.0 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-success rotate-180" />;
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Growth Trajectory
          </Badge>
          <h1 className="section-header">Financial Outlook</h1>
          <div className="section-divider mx-auto" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Projected to reach <span className="text-primary font-bold">$287.4M ARR</span> by 2030 
            through strategic market penetration and expansion into high-value enterprise segments.
          </p>
        </div>

        {/* Revenue Projections */}
        <div className="mb-16">
          <Card className="investor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                5-Year Revenue Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-semibold">Year</th>
                      <th className="text-center py-3 px-4 font-semibold">Revenue (M)</th>
                      <th className="text-center py-3 px-4 font-semibold">Customers</th>
                      <th className="text-center py-3 px-4 font-semibold">YoY Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueProjections.map((projection, index) => (
                      <tr key={index} className="border-b border-border/30 hover:bg-card/30 transition-colors">
                        <td className="py-4 px-4 font-medium">{projection.year}</td>
                        <td className="py-4 px-4 text-center text-2xl font-bold text-primary">
                          ${projection.revenue}M
                        </td>
                        <td className="py-4 px-4 text-center font-medium">{projection.customers}</td>
                        <td className="py-4 px-4 text-center">
                          {projection.growth && (
                            <Badge variant="outline" className="border-success text-success bg-success/10">
                              {projection.growth}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Streams */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Revenue Streams (2030 Projection)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {revenueStreams.map((stream, index) => (
                <Card key={index} className="investor-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{stream.title}</h3>
                        <p className="text-sm text-muted-foreground">{stream.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{stream.percentage}%</div>
                        <div className="text-sm text-muted-foreground">{stream.arpu}</div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${stream.percentage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Card className="investor-card bg-gradient-glow border-primary/30 w-full">
                <CardContent className="p-8 text-center">
                  <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Revenue Diversity</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Annual Revenue (2030)</span>
                      <span className="font-bold text-primary">$287.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Deal Size</span>
                      <span className="font-bold">$553K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recurring Revenue</span>
                      <span className="font-bold text-success">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyMetrics.map((item, index) => (
              <Card key={index} className="investor-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-sm text-muted-foreground">{item.metric}</h3>
                    {getTrendIcon(item.trend)}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Funding Requirements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Series A Funding Use ($20M)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary" />
                  Allocation Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fundingUse.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="font-bold text-primary">${item.amount}M ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  Funding Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <div className="font-semibold">12 Months</div>
                      <div className="text-sm text-muted-foreground">50 stadium deployments, $12M ARR</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <div className="font-semibold">18 Months</div>
                      <div className="text-sm text-muted-foreground">Enterprise product launch, $25M ARR</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <div className="font-semibold">24 Months</div>
                      <div className="text-sm text-muted-foreground">International expansion, $45M ARR</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <div className="font-semibold">36 Months</div>
                      <div className="text-sm text-muted-foreground">Series B readiness, $85M ARR</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Investment Summary */}
        <Card className="investor-card bg-gradient-glow border-primary/30">
          <CardContent className="p-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Investment Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">$20M</div>
                  <div className="text-sm text-muted-foreground">Series A Target</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">$287M</div>
                  <div className="text-sm text-muted-foreground">2030 ARR Target</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">87%</div>
                  <div className="text-sm text-muted-foreground">Gross Margin</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15:1</div>
                  <div className="text-sm text-muted-foreground">LTV/CAC Ratio</div>
                </div>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Strong unit economics, recurring revenue model, and clear path to profitability 
                with <span className="text-primary font-semibold">14x revenue multiple</span> potential 
                by 2030 based on comparable SaaS valuations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}