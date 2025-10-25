import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Activity, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Case Studies
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Proven Impact in <span className="text-gradient">Real-World Deployments</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Real stories from healthcare, education, and disaster response deployments 
            across bandwidth-constrained regions.
          </p>
        </div>

        {/* Case Study 1: Healthcare */}
        <Card className="investor-card mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <Activity className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <Badge className="mb-3 bg-success/10 text-success border-success/30">
                  Healthcare
                </Badge>
                <h2 className="text-3xl font-bold mb-2">
                  Healthcare Network: 14-Day Blackout, Zero Data Loss
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    12 Districts, Sub-Saharan Africa
                  </span>
                  <span>•</span>
                  <span>Q3 2024</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A regional healthcare network serving 12 districts faced a critical infrastructure failure 
                  when undersea cable damage caused a 14-day internet blackout. Traditional cloud-based 
                  electronic health records (EHR) systems became completely inaccessible, threatening 
                  patient care continuity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  GrahmOS's offline-first architecture enabled healthcare workers to continue accessing 
                  and updating patient records throughout the blackout. CRDT-based conflict resolution 
                  automatically synchronized data across 47 clinics when connectivity was restored.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">99.9% uptime</span> maintained across 47 clinics during blackout
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Zero data loss</span> with automatic conflict-free sync
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">2,400+ patients</span> served without interruption
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">0</div>
                  <p className="text-sm text-muted-foreground">Data Loss Events</p>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">47</div>
                  <p className="text-sm text-muted-foreground">Connected Clinics</p>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-6 border border-border/50">
                <p className="text-sm text-muted-foreground italic">
                  "GrahmOS kept our patient records accessible when everything else failed. During the blackout, 
                  our staff continued documenting care, and when connectivity returned, everything synchronized 
                  perfectly. This system literally saved lives."
                </p>
                <p className="text-sm font-semibold mt-3">
                  — Dr. Amina Okafor, Regional Health Director
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Study 2: Education */}
        <Card className="investor-card mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <Users className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <Badge className="mb-3 bg-blue-500/10 text-blue-500 border-blue-500/30">
                  Education
                </Badge>
                <h2 className="text-3xl font-bold mb-2">
                  Education Platform: 12,000 Students, 99.7% Uptime
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    8 Schools, Southeast Asia
                  </span>
                  <span>•</span>
                  <span>Q2-Q4 2024</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Eight rural schools serving 12,000 students faced unreliable internet connectivity 
                  (average 3-4 hours of downtime daily) that disrupted digital learning initiatives. 
                  Cloud-based Learning Management Systems (LMS) were unusable, forcing teachers back 
                  to paper-based methods.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  GrahmOS enabled fully offline learning experiences with automatic content sync during 
                  brief connectivity windows. Teachers and students could access curriculum, submit 
                  assignments, and track progress regardless of network status.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">99.7% platform availability</span> vs 65% with previous cloud LMS
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">12,000 students</span> with uninterrupted digital learning access
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">45% increase</span> in assignment completion rates
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">99.7%</div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">12K</div>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">+45%</div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-6 border border-border/50">
                <p className="text-sm text-muted-foreground italic">
                  "Before GrahmOS, our internet issues meant digital learning was more frustrating than helpful. 
                  Now our students can work seamlessly offline, and everything syncs when we get connectivity. 
                  It's transformed our classroom experience."
                </p>
                <p className="text-sm font-semibold mt-3">
                  — Principal Maria Santos, Regional Education Coordinator
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Study 3: Disaster Response */}
        <Card className="investor-card mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <TrendingUp className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <Badge className="mb-3 bg-orange-500/10 text-orange-500 border-orange-500/30">
                  Disaster Response
                </Badge>
                <h2 className="text-3xl font-bold mb-2">
                  Cyclone Beti: Critical Response Coordination
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Madagascar
                  </span>
                  <span>•</span>
                  <span>February 2024</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When Cyclone Beti devastated Madagascar's northeastern coast, all traditional communications 
                  infrastructure was destroyed. Emergency responders needed to coordinate rescue operations, 
                  track resources, and document medical interventions without any internet connectivity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  GrahmOS's mesh-aware networking enabled peer-to-peer coordination across 15 emergency 
                  response teams using local WiFi and LoRa gateways. Critical information synced between 
                  teams without relying on centralized infrastructure.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">2,400+ patients</span> tracked and treated during 10-day response
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">15 response teams</span> coordinated via peer-to-peer mesh
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">100% data integrity</span> maintained throughout disaster response
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">2,400+</div>
                  <p className="text-sm text-muted-foreground">Patients Served</p>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">15</div>
                  <p className="text-sm text-muted-foreground">Response Teams</p>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="text-4xl font-bold text-primary mb-2">10</div>
                  <p className="text-sm text-muted-foreground">Days of Operations</p>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-6 border border-border/50">
                <p className="text-sm text-muted-foreground italic">
                  "In disaster response, reliable communication means the difference between life and death. 
                  GrahmOS's offline-first approach let us coordinate rescue operations when all traditional 
                  infrastructure was destroyed. This technology saves lives."
                </p>
                <p className="text-sm font-semibold mt-3">
                  — Commander Jean-Baptiste, Emergency Response Coordinator
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card className="investor-card bg-gradient-glow border-primary/30 mb-12">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Cumulative Impact Across All Deployments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
                <div className="text-4xl font-bold text-primary mb-2">14,400+</div>
                <p className="text-sm text-muted-foreground">Total Users Served</p>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
                <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
                <p className="text-sm text-muted-foreground">Average Uptime</p>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">Data Loss Events</p>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
                <div className="text-4xl font-bold text-primary mb-2">4</div>
                <p className="text-sm text-muted-foreground">Active Regions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="investor-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want to Learn More About Our Deployments?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact our team for detailed case study reports and technical specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:investor@grahmos.info">
                  Request Full Case Studies
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/investor-relations">
                  View Investor Information
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
