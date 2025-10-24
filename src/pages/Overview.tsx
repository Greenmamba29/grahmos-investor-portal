import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, Search, Wifi, Users, TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '@/components/CountdownTimer';
import CinematicEarth from '@/components/CinematicEarth';
import EmailSignup from '@/components/EmailSignup';

export default function Overview() {
  const keyMetrics = [
    { label: 'Underserved Users', value: '80M+', icon: Users, change: 'Africa & Asia' },
    { label: 'Offline-First Architecture', value: '100%', icon: Wifi, change: 'No Internet Required' },
    { label: 'Target Markets', value: '4', icon: Target, change: 'Pilot Regions' },
  ];

  const keyFeatures = [
    {
      icon: Wifi,
      title: 'Offline-First Directory OS',
      description: 'Revolutionary directory-based operating system that organizes, compresses, and delivers data offline across mesh networks.'
    },
    {
      icon: Search,
      title: 'AI-Powered Intelligence',
      description: 'Multi-agent AI architecture for intelligent file orchestration and resilient communication, even without connectivity.'
    },
    {
      icon: Shield,
      title: 'Resilient Infrastructure',
      description: 'Designed to survive outages and disasters — communication that works when traditional systems fail.'
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
                <span className="text-foreground">The Operating System for the Next Billion Users</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The world's first offline-first directory operating system — connecting over 80 million underserved users 
                across Africa, Asia, and beyond when the internet fails.
              </p>
              <div className="bg-card/50 border border-primary/30 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-3 text-primary">The World Problem We're Solving</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fragile communications infrastructure leaves billions disconnected during crises. 
                  GrahmOS ensures critical communication and information access never fail — even when the internet does.
                </p>
              </div>
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
            <h2 className="section-header">Global Impact & Reach</h2>
            <div className="section-divider mx-auto" />
            <p className="text-xl text-muted-foreground">
              Bridging the gap between technology and humanity for underserved populations
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
            <h2 className="section-header">The Breakthrough Product</h2>
            <div className="section-divider mx-auto" />
            <p className="text-xl text-muted-foreground">
              We're not building another app — we're building the infrastructure layer for global resilience
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
                <h2 className="text-3xl font-bold mb-6 text-gradient">Why GrahmOS is Inevitable</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">The Mission</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Lives first. Technology second.</li>
                      <li>• Resilience over complexity</li>
                      <li>• Access for all — online or off</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">The Execution</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Pioneering directory-based OS architecture</li>
                      <li>• Early pilot interest: Nigeria, Kenya, Japan, rural US</li>
                      <li>• Mission-driven founder with global credibility</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-card/50 rounded-lg border border-primary/30">
                  <p className="text-lg font-semibold text-primary mb-2">$5M Pre-Seed Raise</p>
                  <p className="text-muted-foreground">
                    Transitioning from prototype to pilot deployments across Africa and Asia
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/team">
                    <Button size="lg" className="glow">
                      Meet the Team
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