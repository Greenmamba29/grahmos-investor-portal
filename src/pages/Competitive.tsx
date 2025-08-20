import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Minus, Target, TrendingUp, Shield } from 'lucide-react';

export default function Competitive() {
  const competitors = [
    {
      name: 'FireChat',
      marketShare: 15.2,
      strengths: ['Basic mesh networking', 'Consumer awareness'],
      weaknesses: ['No offline search', 'Limited range', 'No enterprise features']
    },
    {
      name: 'Bridgefy',
      marketShare: 8.7,
      strengths: ['Mobile-first approach', 'Simple UI'],
      weaknesses: ['No semantic capabilities', 'Basic security', 'Limited integration']
    },
    {
      name: 'Traditional Systems',
      marketShare: 45.8,
      strengths: ['Established relationships', 'Proven track record'],
      weaknesses: ['Network dependent', 'No offline capability', 'Legacy technology']
    }
  ];

  const competitiveMatrix = [
    {
      feature: 'Offline Search',
      grahmos: 'full',
      firechat: 'none',
      bridgefy: 'none',
      traditional: 'none'
    },
    {
      feature: 'Semantic Understanding',
      grahmos: 'full',
      firechat: 'none',
      bridgefy: 'none',
      traditional: 'none'
    },
    {
      feature: 'Mesh Networking',
      grahmos: 'full',
      firechat: 'partial',
      bridgefy: 'partial',
      traditional: 'none'
    },
    {
      feature: 'Enterprise Integration',
      grahmos: 'full',
      firechat: 'none',
      bridgefy: 'partial',
      traditional: 'full'
    },
    {
      feature: 'Military-Grade Security',
      grahmos: 'full',
      firechat: 'partial',
      bridgefy: 'partial',
      traditional: 'full'
    },
    {
      feature: 'Offline Functionality',
      grahmos: 'full',
      firechat: 'partial',
      bridgefy: 'partial',
      traditional: 'none'
    }
  ];

  const getIcon = (level: string) => {
    switch (level) {
      case 'full':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'partial':
        return <Minus className="h-5 w-5 text-warning" />;
      case 'none':
        return <X className="h-5 w-5 text-destructive" />;
      default:
        return <X className="h-5 w-5 text-destructive" />;
    }
  };

  const advantages = [
    {
      icon: Target,
      title: '100% Offline Functionality',
      description: 'Only solution that operates completely without network connectivity, including semantic search capabilities.',
      advantage: 'Unique differentiator - no competitor offers this'
    },
    {
      icon: TrendingUp,
      title: 'First-to-Market Position',
      description: 'Pioneering the offline semantic search category in emergency communications.',
      advantage: '18-month head start on competition'
    },
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'Superior encryption and zero-knowledge architecture exceeds industry standards.',
      advantage: 'Higher security standards than existing solutions'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Market Leadership
          </Badge>
          <h1 className="section-header">Competitive Edge Overview</h1>
          <div className="section-divider mx-auto" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GrahmOS maintains decisive advantages over existing solutions through proprietary 
            technology and first-to-market positioning in offline semantic communications.
          </p>
        </div>

        {/* Market Share Projection */}
        <div className="mb-16">
          <Card className="investor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Projected Market Position by 2030
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Market Share Distribution</h3>
                  <div className="space-y-3">
                    {competitors.map((competitor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                        <span className="font-medium">{competitor.name}</span>
                        <span className="text-lg font-bold text-primary">{competitor.marketShare}%</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <span className="font-medium text-primary">GrahmOS (Target)</span>
                      <span className="text-lg font-bold text-primary">8.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                      <span className="font-medium">Others</span>
                      <span className="text-lg font-bold">21.8%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center p-8 bg-gradient-glow rounded-2xl border border-primary/30">
                    <div className="text-4xl font-bold text-primary mb-2">$49.1B</div>
                    <div className="text-muted-foreground mb-2">Target Market Value</div>
                    <div className="text-sm text-success">8.5% of $577.9B TAM</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitive Matrix */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison Matrix</h2>
          <Card className="investor-card">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4 font-semibold text-primary">GrahmOS</th>
                      <th className="text-center py-3 px-4 font-semibold">FireChat</th>
                      <th className="text-center py-3 px-4 font-semibold">Bridgefy</th>
                      <th className="text-center py-3 px-4 font-semibold">Traditional</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveMatrix.map((row, index) => (
                      <tr key={index} className="border-b border-border/30 hover:bg-card/30 transition-colors">
                        <td className="py-4 px-4 font-medium">{row.feature}</td>
                        <td className="py-4 px-4 text-center">{getIcon(row.grahmos)}</td>
                        <td className="py-4 px-4 text-center">{getIcon(row.firechat)}</td>
                        <td className="py-4 px-4 text-center">{getIcon(row.bridgefy)}</td>
                        <td className="py-4 px-4 text-center">{getIcon(row.traditional)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Full Support
                </div>
                <div className="flex items-center">
                  <Minus className="h-4 w-4 text-warning mr-2" />
                  Partial Support
                </div>
                <div className="flex items-center">
                  <X className="h-4 w-4 text-destructive mr-2" />
                  No Support
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Advantages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Decisive Advantages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="investor-card group hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <advantage.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{advantage.description}</p>
                  <Badge variant="outline" className="border-success text-success bg-success/10">
                    {advantage.advantage}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitor Analysis */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Competitive Landscape</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <Card key={index} className="investor-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {competitor.name}
                    <Badge variant="outline">{competitor.marketShare}% share</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-success mb-2">Strengths</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {competitor.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-destructive mb-2">Weaknesses</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {competitor.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-center">
                          <X className="h-4 w-4 text-destructive mr-2 flex-shrink-0" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Strategic Position */}
        <div className="mt-16">
          <Card className="investor-card bg-gradient-glow border-primary/30">
            <CardContent className="p-8">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-gradient">Strategic Position</h2>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  GrahmOS holds a <span className="text-primary font-semibold">unique position</span> as the only 
                  emergency communication system offering 100% offline functionality with semantic search. 
                  This creates an <span className="text-primary font-semibold">18-month competitive moat</span> 
                  and first-mover advantage in the fastest-growing market segment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">18</div>
                    <div className="text-sm text-muted-foreground">Months Head Start</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Offline Capability</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">0</div>
                    <div className="text-sm text-muted-foreground">Direct Competitors</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}