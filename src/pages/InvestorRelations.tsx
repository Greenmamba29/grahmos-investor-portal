import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Users, TrendingUp, Building2, CheckCircle2, ArrowRight, DollarSign, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InvestorRelations() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Investor Relations
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Building the Infrastructure for <span className="text-gradient">Global Resilience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're raising $5M pre-seed to scale the world's first offline-first directory operating system 
            and bring resilient access to 80M+ underserved users.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="investor-card text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">80M+</div>
              <p className="text-sm text-muted-foreground">Underserved Users</p>
            </CardContent>
          </Card>
          <Card className="investor-card text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">4</div>
              <p className="text-sm text-muted-foreground">Pilot Regions</p>
            </CardContent>
          </Card>
          <Card className="investor-card text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">420M</div>
              <p className="text-sm text-muted-foreground">TAM Students</p>
            </CardContent>
          </Card>
          <Card className="investor-card text-center">
            <CardContent className="p-6">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">$5M</div>
              <p className="text-sm text-muted-foreground">Pre-Seed Round</p>
            </CardContent>
          </Card>
        </div>

        {/* Investment Deck CTA */}
        <Card className="investor-card bg-gradient-glow border-primary/30 mb-16" id="deck">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Download Investor Deck</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Get the complete picture: market opportunity, technology architecture, 
                  go-to-market strategy, financials, and team credentials.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="glow" asChild>
                    <a href="/assets/GrahmOS-Investor-Deck.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Download Deck (PDF)
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="mailto:investor@grahmos.info">
                      Schedule Meeting
                    </a>
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="w-full md:w-48 h-48 bg-card/50 rounded-xl border border-border/50 flex items-center justify-center">
                  <Download className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Now, Why GrahmOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="investor-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Why Now</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Global internet instability, rising data costs, and data-sovereignty regulation 
                are reshaping how critical services operate.
              </p>
              <div className="bg-primary/10 rounded-lg p-6 border border-primary/30 mb-6">
                <div className="text-4xl font-bold text-primary mb-2">4B+</div>
                <p className="text-sm text-muted-foreground">
                  people globally can't rely on the cloud for daily operations
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Offline-first systems will power the next decade of access for governments, 
                schools, healthcare, and community services in bandwidth-constrained regions.
              </p>
            </CardContent>
          </Card>

          <Card className="investor-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Why GrahmOS</h2>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">True Offline-First OS</p>
                    <p className="text-sm text-muted-foreground">
                      Not cached cloud. CRDT-based conflict-free sync that works when networks fail.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Mesh-Aware Networking</p>
                    <p className="text-sm text-muted-foreground">
                      Pluggable SAT/LoRa gateways; peer-to-peer resilience at the infrastructure layer.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Proven Deployments</p>
                    <p className="text-sm text-muted-foreground">
                      Live pilots with public-sector and telecom partners across 4 regions.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* The Opportunity */}
        <Card className="investor-card mb-16">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">The Opportunity</h2>
            <p className="text-lg text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
              Resilient access layer for education, health, civic services through licensing and 
              partnerships with telcos and governments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
                <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">420M</div>
                <p className="text-sm text-muted-foreground mb-3">Students in bandwidth-constrained regions</p>
                <div className="text-xs text-muted-foreground">Primary TAM</div>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
                <Building2 className="h-10 w-10 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">$2.80</div>
                <p className="text-sm text-muted-foreground mb-3">per student/year</p>
                <div className="text-xs text-muted-foreground">vs $18 cloud alternatives</div>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">80M+</div>
                <p className="text-sm text-muted-foreground mb-3">Underserved users</p>
                <div className="text-xs text-muted-foreground">Africa & Asia focus</div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-6 border border-primary/30 text-center">
              <p className="text-lg font-semibold text-primary mb-2">
                Unit Economics: 84% gross margin at scale
              </p>
              <p className="text-sm text-muted-foreground">
                SaaS licensing model with government procurement cycles
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fundraise Details */}
        <Card className="investor-card bg-gradient-glow border-primary/30 mb-16">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">Fundraise Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Round Structure</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">Total Raise:</span> $5M pre-seed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">Allocation Size:</span> $250k – $500k per strategic investor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">Stage:</span> Pre-seed (product-market validation)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">Timeline:</span> Closing Q1 2026</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Use of Funds</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">45%:</span> Core engineering & AI (15 hires)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">30%:</span> Regional pilots & partnerships (10 hires)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">15%:</span> Operations & compliance (5 hires)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <span><span className="font-semibold text-foreground">10%:</span> Reserve & contingency</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Preview */}
        <Card className="investor-card mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Leadership Team</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crisis-ops and distributed-systems veterans with decades of combined experience 
              in resilient technology.
            </p>
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link to="/team">
                  Meet the Full Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Traction */}
        <Card className="investor-card mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Traction & Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Deployed Pilots
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Healthcare network: 12 districts, 99.9% uptime during 14-day blackout</li>
                  <li>• Education deployment: 8 schools, 12,000 students, 99.7% uptime</li>
                  <li>• 2,400+ patients served during Cyclone Beti disaster response</li>
                  <li>• Zero data loss across all deployments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Partnership Pipeline
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Olympic Committee Nigeria: pilot discussions underway</li>
                  <li>• UN network partnerships in evaluation</li>
                  <li>• Ministry of Education partnerships across 3 countries</li>
                  <li>• Telecom infrastructure partners in 4 regions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="investor-card bg-gradient-glow border-primary/30">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join us in building the infrastructure layer for global resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow" asChild>
                <a href="mailto:investor@grahmos.info">
                  Schedule Intro Call
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/assets/GrahmOS-Investor-Deck.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Deck
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Email: <a href="mailto:investor@grahmos.info" className="text-primary underline">investor@grahmos.info</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
