import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Building, Shield, Zap, Target } from 'lucide-react';

export default function MarketAnalysis() {
  const marketDrivers = [
    {
      icon: TrendingUp,
      title: 'Increasing Natural Disasters',
      description: 'Rising frequency of emergencies drives demand for resilient communication systems'
    },
    {
      icon: Shield,
      title: 'Regulatory Mandates',
      description: 'New emergency preparedness requirements for venues with 10,000+ capacity'
    },
    {
      icon: Zap,
      title: 'Network Limitations',
      description: 'Traditional cellular networks routinely fail during large events and emergencies'
    },
    {
      icon: Users,
      title: 'Growing Awareness',
      description: 'Increased focus on communication resilience and emergency preparedness'
    }
  ];

  const marketSegments = [
    { sector: 'Government', size: 45.2, growth: '11.2%' },
    { sector: 'Healthcare', size: 32.8, growth: '13.5%' },
    { sector: 'Military', size: 28.5, growth: '9.8%' },
    { sector: 'Energy', size: 22.4, growth: '12.1%' },
    { sector: 'Transportation', size: 18.7, growth: '10.7%' },
    { sector: 'Stadiums', size: 13.1, growth: '14.9%' }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-header">Emergency Communication Market</h1>
          <div className="section-divider mx-auto" />
          <p className="text-2xl text-muted-foreground mb-6">
            <span className="text-primary font-bold">$577.9B</span> Total Addressable Market
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The global emergency communication market represents one of the fastest-growing technology sectors, 
            driven by increasing natural disasters and regulatory requirements for resilient communication infrastructure.
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="investor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Market Growth Projection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-muted-foreground">2024 Market Size</span>
                <span className="font-semibold text-lg">$451.2B</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-muted-foreground">2030 Projection</span>
                <span className="font-semibold text-lg text-primary">$577.9B</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-muted-foreground">CAGR</span>
                <span className="font-semibold text-lg text-success">12.8%</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Fastest Growing Region</span>
                <span className="font-semibold text-lg">Asia Pacific (28.5%)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="investor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Building className="h-6 w-6 text-primary" />
                Stadium Market Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                <div className="stat-highlight text-primary">$45B</div>
                <p className="text-muted-foreground mb-4">Stadium & Event Market</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-success">14.9%</div>
                    <div className="text-muted-foreground">CAGR</div>
                  </div>
                  <div>
                    <div className="font-bold text-primary">3-6 months</div>
                    <div className="text-muted-foreground">Sales Cycle</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Network congestion during large events (50,000+ attendees)</p>
                <p>• New safety regulations for major venues</p>
                <p>• Shorter sales cycles vs government (3-6 vs 12-18 months)</p>
                <p>• High-visibility showcase opportunities</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Drivers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Market Growth Drivers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketDrivers.map((driver, index) => (
              <Card key={index} className="investor-card text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <driver.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-3">{driver.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{driver.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Segments */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Market Size by Sector (2025)</h2>
          <Card className="investor-card">
            <CardContent className="p-8">
              <div className="space-y-4">
                {marketSegments.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-primary rounded" style={{opacity: 0.8 - (index * 0.1)}} />
                      <div>
                        <div className="font-semibold">{segment.sector}</div>
                        <div className="text-sm text-muted-foreground">CAGR: {segment.growth}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${segment.size}B</div>
                      <div className="text-sm text-muted-foreground">Market Size</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insight */}
        <div className="mt-16">
          <Card className="investor-card bg-gradient-glow border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Strategic Market Insight</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The stadium and event segment offers the highest growth rate at <span className="text-primary font-semibold">14.9% CAGR</span>, 
                    with the shortest sales cycles and immediate revenue opportunities. Stadium deployments create high-visibility 
                    showcases that accelerate adoption in other sectors, making this our ideal market entry point.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}