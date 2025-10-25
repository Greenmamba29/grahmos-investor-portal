import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, Shield, Users, CheckCircle2, TrendingUp, Building2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import VPoC from '@/components/VPoC';
import EmailSignup from '@/components/EmailSignup';

export default function Overview() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              The Operating System for a World That Works — Even When the Internet Doesn't.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              GrahmOS keeps critical data, education, and communication alive when connectivity fails — 
              empowering governments, schools, and communities to thrive offline.
            </p>

            {/* Primary CTA */}
            <div className="mb-12">
              <Button size="lg" asChild className="glow text-lg px-8 py-6 rounded-2xl">
                <a href="#how-it-works">
                  Discover How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Trust Strip */}
            <div className="border-t border-border/30 pt-8 mt-12">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Trusted By</p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <Badge 
                  variant="outline" 
                  className="text-sm py-2 px-4 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105 cursor-default"
                >
                  Ministry of Education
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-sm py-2 px-4 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105 cursor-default"
                >
                  Rural Health Network
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-sm py-2 px-4 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105 cursor-default"
                >
                  Telecom Infrastructure
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-sm py-2 px-4 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105 cursor-default"
                >
                  Government Pilot
                </Badge>
              </div>
            </div>

            {/* Leader Cred */}
            <p className="mt-8 text-sm text-muted-foreground">
              Led by crisis-ops and distributed-systems veterans.{' '}
              <Link to="/team" className="text-primary underline decoration-primary/30 hover:decoration-primary">
                Meet the team →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* VPoC Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <VPoC />
        </div>
      </section>

      {/* Principles Section */}
      <section id="principles" className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Principles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conviction, not abstraction. Every principle is tied to what GrahmOS actually does.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="investor-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Access Without Barriers</h3>
                    <p className="text-muted-foreground">
                      Works offline/low-bandwidth; local directories answer queries instantly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="investor-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Privacy by Design</h3>
                    <p className="text-muted-foreground">
                      Local-first storage, end-to-end encryption, role-based permissions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="investor-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Resilience at Scale</h3>
                    <p className="text-muted-foreground">
                      Mesh-aware transport; CRDT-based conflict-free sync during partitions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="investor-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Connection With Purpose</h3>
                    <p className="text-muted-foreground">
                      Empowers real communities and services; not another infinite feed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <a href="/technology#use-cases">Discover Use Cases</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Real Stories Section */}
      <section id="stories" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proven deployments with quantified outcomes and human impact
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case Study 1: Healthcare */}
            <Card className="investor-card group hover:border-primary/50 transition-all">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge className="mb-4 bg-success/10 text-success border-success/30">Healthcare</Badge>
                  <h3 className="text-2xl font-bold mb-3">
                    Kept 12 health districts operating during 14-day blackout (99.9% uptime)
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Context</p>
                    <p className="text-muted-foreground">Cyclone Beti, rural clinics across 50km radius</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Problem</p>
                    <p className="text-muted-foreground">Complete internet blackout; risk of data loss and service interruption</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Solution</p>
                    <p className="text-muted-foreground">GrahmOS local directories + mesh sync; conflict-free merges</p>
                  </div>
                </div>

                <div className="bg-card/50 rounded-lg p-4 mb-6 border border-border/50">
                  <p className="text-sm font-semibold mb-3">Results</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-success">99.9%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">2,400</div>
                      <div className="text-xs text-muted-foreground">Patients Served</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">14</div>
                      <div className="text-xs text-muted-foreground">Days Offline</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">0</div>
                      <div className="text-xs text-muted-foreground">Data Loss</div>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-6">
                  "For the first time, disaster didn't mean healthcare shutdown. GrahmOS kept us running."
                  <footer className="text-sm mt-2 not-italic">— Regional Health Director</footer>
                </blockquote>

                <Button variant="outline" className="w-full" asChild>
                  <a href="/stories/healthcare-cyclone-beti">Read full case →</a>
                </Button>
              </CardContent>
            </Card>

            {/* Case Study 2: Education */}
            <Card className="investor-card group hover:border-primary/50 transition-all">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">Education</Badge>
                  <h3 className="text-2xl font-bold mb-3">
                    Ministry of Education deployment: 99.7% uptime serving 12,000 students
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Context</p>
                    <p className="text-muted-foreground">Sub-Saharan district, 8 schools, bandwidth-constrained region</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Problem</p>
                    <p className="text-muted-foreground">Unreliable internet (40% downtime); students lost 8+ hours learning weekly</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Solution</p>
                    <p className="text-muted-foreground">GrahmOS offline-first LMS; automatic night-time syncs</p>
                  </div>
                </div>

                <div className="bg-card/50 rounded-lg p-4 mb-6 border border-border/50">
                  <p className="text-sm font-semibold mb-3">Results</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">99.7%</div>
                      <div className="text-xs text-muted-foreground">Uptime (vs 62%)</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">12,000</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">340</div>
                      <div className="text-xs text-muted-foreground">Teachers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">-60%</div>
                      <div className="text-xs text-muted-foreground">Bandwidth Cost</div>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-6">
                  "For the first time, connectivity doesn't determine whether our children can learn."
                  <footer className="text-sm mt-2 not-italic">— District Education Director</footer>
                </blockquote>

                <Button variant="outline" className="w-full" asChild>
                  <a href="/stories/education-ministry">Read full case →</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investor Narrative Section */}
      <section id="investor-narrative" className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Now, Why GrahmOS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="investor-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Why Now</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Global internet instability, rising data costs, and data-sovereignty regulation are reshaping 
                  how critical services operate.
                </p>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                  <div className="text-3xl font-bold text-primary mb-1">4B+</div>
                  <p className="text-sm text-muted-foreground">people can't rely on the cloud</p>
                </div>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Offline-first systems will power the next decade of access.
                </p>
              </CardContent>
            </Card>

            <Card className="investor-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Why GrahmOS</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">True offline-first OS (not cached cloud) with conflict-free sync</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Mesh-aware networking; pluggable SAT/LoRa gateways</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Proven deployments with public-sector and telecom partners</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="investor-card bg-gradient-glow border-primary/30">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6">The Opportunity</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Resilient access layer for education, health, civic services; licensing + partnerships with telcos/governments.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
                    <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">420M</div>
                    <p className="text-sm text-muted-foreground">Students in bandwidth-constrained regions</p>
                  </div>
                  <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
                    <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">$2.80</div>
                    <p className="text-sm text-muted-foreground">per student/year vs $18 cloud alternatives</p>
                  </div>
                  <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
                    <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">80M+</div>
                    <p className="text-sm text-muted-foreground">Underserved users across Africa & Asia</p>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-6 mb-6 border border-primary/30">
                  <p className="text-lg font-semibold text-primary mb-2">We're Raising $5M Pre-Seed</p>
                  <p className="text-muted-foreground mb-4">
                    Inviting <span className="font-semibold text-foreground">$250–$500k</span> strategic allocations 
                    to scale core engine and regional deployments
                  </p>
                </div>

                <Button size="lg" asChild className="glow">
                  <a href="/investor-relations#deck">
                    View Investor Deck
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join the Movement */}
      <section id="community" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A world that works shouldn't depend on a signal. Join the builders, educators, and operators 
            bringing resilient access to every community.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => {
                const element = document.querySelector('#newsletter');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  // Focus on email input after scroll
                  setTimeout(() => {
                    const emailInput = element.querySelector('input[type="email"]') as HTMLInputElement;
                    emailInput?.focus();
                  }, 500);
                }
              }}
            >
              Join the Movement
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Share functionality coming soon!'); }}>
                Share the Mission
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/partners">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="newsletter" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
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