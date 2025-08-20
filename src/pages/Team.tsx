import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, Trophy, Users, Target, Lightbulb } from 'lucide-react';

export default function Team() {
  const leadership = [
    {
      name: 'Graham Richardson',
      title: 'Founder & CEO',
      bio: 'Former emergency response coordinator with 15 years experience in crisis communications. Led development of semantic search algorithms for government applications.',
      expertise: ['Emergency Communications', 'Product Strategy', 'Government Relations'],
      achievements: [
        'Led emergency response for 50+ major incidents',
        'Published researcher in crisis communication protocols',
        'Former consultant to Department of Homeland Security'
      ]
    },
    {
      name: 'Dr. Sarah Chen',
      title: 'CTO & Co-Founder',
      bio: 'Former Principal Engineer at Google with expertise in distributed systems and mesh networking. PhD in Computer Science from Stanford.',
      expertise: ['Mesh Networking', 'Distributed Systems', 'AI/ML'],
      achievements: [
        '20+ patents in networking technology',
        'Led mesh networking team at Google',
        'Published 40+ papers in peer-reviewed journals'
      ]
    },
    {
      name: 'Michael Torres',
      title: 'VP of Sales',
      bio: 'Former VP of Enterprise Sales at Motorola Solutions. 12 years experience selling mission-critical communication systems to government and enterprise.',
      expertise: ['Enterprise Sales', 'Channel Development', 'Customer Success'],
      achievements: [
        '$200M+ in career sales',
        'Built sales teams from 0 to 50+',
        'Established partnerships with major integrators'
      ]
    },
    {
      name: 'Amanda Foster',
      title: 'VP of Engineering',
      bio: 'Former Staff Engineer at Signal with deep expertise in secure communications and cryptography. Led development of encrypted messaging protocols.',
      expertise: ['Security Architecture', 'Cryptography', 'Mobile Development'],
      achievements: [
        'Core contributor to Signal Protocol',
        'Security consultant for Fortune 500 companies',
        'Expert in zero-knowledge cryptography'
      ]
    }
  ];

  const advisors = [
    {
      name: 'General Patricia Williams (Ret.)',
      title: 'Strategic Advisor',
      background: 'Former Director of Emergency Management, 30 years military experience'
    },
    {
      name: 'Dr. James Liu',
      title: 'Technical Advisor', 
      background: 'Former VP Engineering at Zoom, expert in real-time communications'
    },
    {
      name: 'Maria Santos',
      title: 'Business Advisor',
      background: 'Former VP Sales at Salesforce, enterprise SaaS expertise'
    }
  ];

  const organizationalStrengths = [
    {
      icon: Users,
      title: 'Proven Track Record',
      description: 'Combined 50+ years experience in emergency communications and enterprise software',
      metrics: ['$500M+ career revenue generated', '100+ enterprise deals closed', '20+ patents filed']
    },
    {
      icon: Target,
      title: 'Domain Expertise',
      description: 'Deep understanding of emergency response protocols and mission-critical systems',
      metrics: ['15 years emergency response', '200+ crisis situations managed', '50+ safety protocols designed']
    },
    {
      icon: Lightbulb,
      title: 'Technical Innovation',
      description: 'Cutting-edge expertise in mesh networking, cryptography, and semantic search',
      metrics: ['40+ research publications', '20+ networking patents', '10+ security protocols']
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            World-Class Team
          </Badge>
          <h1 className="section-header">Leadership Team</h1>
          <div className="section-divider mx-auto" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proven executives and technical leaders with deep domain expertise in emergency 
            communications, enterprise software, and mission-critical systems.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Executive Leadership</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="investor-card group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{leader.name}</CardTitle>
                      <p className="text-primary font-semibold">{leader.title}</p>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{leader.bio}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {leader.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <Trophy className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Advisory Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <Card key={index} className="investor-card text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{advisor.name}</h3>
                  <p className="text-primary font-medium mb-3">{advisor.title}</p>
                  <p className="text-sm text-muted-foreground">{advisor.background}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Organizational Strengths */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Organizational Strengths</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {organizationalStrengths.map((strength, index) => (
              <Card key={index} className="investor-card group hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <strength.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{strength.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{strength.description}</p>
                  <div className="space-y-2">
                    {strength.metrics.map((metric, i) => (
                      <div key={i} className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {metric}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Culture & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="investor-card">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To ensure that critical communications never fail when people need them most. 
                We believe that access to information and the ability to communicate during 
                emergencies should be a fundamental right, not dependent on fragile infrastructure.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Lives first, technology second</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Resilience over complexity</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Universal access to emergency communications</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="investor-card">
            <CardHeader>
              <CardTitle>Why We Win</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our team combines unique domain expertise with proven execution capability. 
                We've lived through the failures of existing systems and designed GrahmOS 
                to address real-world challenges that others don't understand.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground">Years Combined Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">$500M+</div>
                  <div className="text-xs text-muted-foreground">Career Revenue Generated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-xs text-muted-foreground">Patents & IP</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-xs text-muted-foreground">Crisis Situations Managed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hiring Plans */}
        <Card className="investor-card bg-gradient-glow border-primary/30">
          <CardContent className="p-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Growth & Hiring Plan</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                With Series A funding, we plan to scale from <span className="text-primary font-semibold">15 to 65 employees</span> 
                by end of 2026, focusing on engineering, sales, and customer success to support rapid growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">+20</div>
                  <div className="text-sm text-muted-foreground">Engineering Hires</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">+15</div>
                  <div className="text-sm text-muted-foreground">Sales Team</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">+10</div>
                  <div className="text-sm text-muted-foreground">Customer Success</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">+5</div>
                  <div className="text-sm text-muted-foreground">Operations</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}