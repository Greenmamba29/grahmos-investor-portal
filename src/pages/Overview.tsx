import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, Search, Wifi, Users, TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '@/components/CountdownTimer';
import CinematicEarth from '@/components/CinematicEarth';
import EmailSignup from '@/components/EmailSignup';

export default function Overview() {
  const keyMetrics = [
    { label: 'Total Addressable Market', value: '$577.9B', icon: Target, change: '+12.8% CAGR' },
    { label: 'Stadium Market Opportunity', value: '$45B', icon: Users, change: '+14.9% CAGR' },
    { label: 'Target Market Share', value: '8.5%', icon: TrendingUp, change: 'by 2030' },
  ];

  const keyFeatures = [
    {
      icon: Wifi,
      title: '100% Offline Functionality',
      description: 'Operates completely without internet or cellular connectivity through proprietary mesh networking.'
    },
    {
      icon: Search,
      title: 'Semantic Search Engine',
      description: 'Context-aware search delivers relevant emergency protocols even in offline mode.'
    },
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'End-to-end encryption with zero-knowledge architecture exceeds industry standards.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">GrahmOS</span><br />
                <span className="text-foreground">The OS of Meaning</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Revolutionary emergency communication platform that operates 100% offline. 
                Capturing the $577.9B emergency communication market with proprietary semantic mesh technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/market">
                  <Button size="lg" className="glow">
                    View Market Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                    Access Portal
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <CinematicEarth />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CountdownTimer />
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-header">Market Opportunity</h2>
            <div className="section-divider mx-auto" />
            <p className="text-xl text-muted-foreground">
              Massive addressable market with clear path to profitability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="investor-card glow hover:glow-strong transition-all duration-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <metric.icon className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded">
                      {metric.change}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="stat-highlight">{metric.value}</div>
                  <p className="text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-header">Competitive Advantages</h2>
            <div className="section-divider mx-auto" />
            <p className="text-xl text-muted-foreground">
              Proprietary technology that outperforms existing solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="investor-card group">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="investor-card bg-gradient-glow border-primary/30">
            <CardContent className="p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6 text-gradient">Investment Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Market Position</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• First-to-market with offline semantic search</li>
                      <li>• 14.9% CAGR in target stadium market segment</li>
                      <li>• Low competition in emergency communication</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Technology Edge</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Proprietary mesh networking technology</li>
                      <li>• Military-grade security architecture</li>
                      <li>• 100% offline functionality guarantee</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/market">
                    <Button size="lg" className="glow">
                      Explore Full Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <EmailSignup 
            type="investor_interest"
            title="Join the Investor Network"
            description="Get exclusive updates on funding rounds, partnership announcements, and product milestones"
          />
        </div>
      </section>
    </div>
  );
}