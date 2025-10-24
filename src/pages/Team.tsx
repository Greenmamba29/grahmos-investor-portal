import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, Trophy, Users, Target, Lightbulb } from 'lucide-react';

export default function Team() {
  const leadership = [
    {
      name: 'Miquel McDonald',
      title: 'Founder & CEO',
      bio: 'Founder of GrahmOS, an offline-first directory operating system connecting over 80 million underserved users across Africa, Asia, and beyond — bridging the gap between technology and humanity.',
      expertise: ['AI Systems & Multi-Agent Architecture', 'Product Vision & Ecosystem Strategy', 'Global Partnerships & Accessibility Technology'],
      achievements: [
        'Founded GrahmOS to unify the web into directory-based systems accessible offline',
        'Leading discussions with Olympic Committee Nigeria & UN networks for pilot deployment',
        'Architect of FileInASnap, an AI-powered file orchestration engine integrated into GrahmOS',
        'Featured founder in LvlUp Labs and other global startup acceleration programs'
      ]
    },
    {
      name: 'Dr. Sarah Chen',
      title: 'CTO & Co-Founder',
      bio: 'Former Principal Engineer at Google, expert in mesh networking and distributed systems. Holds a PhD in Computer Science from Stanford, with 20+ patents and 40+ publications in resilient network design.',
      expertise: ['Mesh Networking & Distributed Systems', 'Offline-first Data Synchronization', 'AI/ML for Communications Infrastructure'],
      achievements: [
        'Led Google\'s mesh networking research group',
        'Architected large-scale, low-bandwidth communication protocols',
        'Author of multiple patents advancing decentralized connectivity'
      ]
    },
    {
      name: 'Amanda Foster',
      title: 'VP of Engineering',
      bio: 'Former Staff Engineer at Signal, specializing in secure, encrypted, and zero-knowledge communications. Expert in cryptography and scalable mobile system architecture.',
      expertise: ['Security Architecture', 'Cryptography & End-to-End Encryption', 'Mobile System Design'],
      achievements: [
        'Core contributor to the Signal Protocol',
        'Led mobile encryption rollout for Fortune 500 clients',
        'Deep expertise in privacy-preserving communication systems'
      ]
    },
    {
      name: 'Michael Torres',
      title: 'VP of Partnerships & Adoption',
      bio: 'Former VP of Enterprise Sales at Motorola Solutions with 12+ years scaling mission-critical communication systems across government and enterprise sectors.',
      expertise: ['Strategic Partnerships', 'Channel Development', 'Government & NGO Adoption'],
      achievements: [
        'Built Motorola\'s global emergency communications sales team',
        'Trusted partner to agencies in 30+ countries',
        'Experienced in aligning government adoption with humanitarian goals'
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
      title: 'Domain Mastery',
      description: '50+ combined years in emergency communications, AI, and software systems',
      metrics: ['Deep understanding of global crisis communication challenges', 'Experience designing mission-critical protocols', 'Used by governments and NGOs']
    },
    {
      icon: Target,
      title: 'Technical Edge',
      description: 'Pioneering offline-first operating system architecture',
      metrics: ['Integrating mesh networking + AI agents', 'Intelligent, resilient communications', 'Secure, decentralized infrastructure']
    },
    {
      icon: Lightbulb,
      title: 'Execution Capability',
      description: 'Proven operators from Google, Signal, and Motorola',
      metrics: ['Globally connected advisory network', 'Early pilot interest from international agencies', 'Military, tech, and enterprise experience']
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            🌍 World-Class Team
          </Badge>
          <h1 className="section-header">Leadership Team</h1>
          <div className="section-divider mx-auto" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A visionary team of operators, engineers, and strategists united by one mission: to make communication and 
            information access unstoppable — anywhere on Earth.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">🧠 Executive Leadership</h2>
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
                To ensure that critical communication and access to information never fail — even when the internet does.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                GrahmOS reimagines connectivity through a directory-based operating system that organizes, compresses, 
                and delivers data offline, across mesh networks, and in low-bandwidth regions.
              </p>
              <h4 className="font-semibold mb-3 text-primary">Guiding Principles</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Lives first. Technology second.</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Resilience over complexity.</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Access for all — online or off.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="investor-card">
            <CardHeader>
              <CardTitle>Why We Win</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're not building another app — we're building the infrastructure layer for global resilience.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                GrahmOS isn't competing with the web; it's redefining it for the 80 million people who have been left out.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Decades of combined experience in resilient tech</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>Real-world crisis management and network design experience</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span>A founding team that's lived the problem and built the solution</span>
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
                With our <span className="text-primary font-semibold">$5M pre-seed raise</span>, GrahmOS will transition from 
                prototype to pilot deployments, expand our technical team, and launch regional partnerships across Africa and Asia.
              </p>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">2025–2026 Roadmap</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-2">+15</div>
                    <div className="text-sm text-muted-foreground mb-2">Engineering & AI</div>
                    <div className="text-xs text-muted-foreground">Core OS & mesh platform development</div>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-2">+10</div>
                    <div className="text-sm text-muted-foreground mb-2">Deployment & Partnerships</div>
                    <div className="text-xs text-muted-foreground">Government & NGO pilot support</div>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-2">+5</div>
                    <div className="text-sm text-muted-foreground mb-2">Ops & Compliance</div>
                    <div className="text-xs text-muted-foreground">Regional rollout, localization, training</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-primary">Pilot Targets</p>
                <p className="text-muted-foreground">Nigeria, Kenya, Japan, and rural U.S.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}