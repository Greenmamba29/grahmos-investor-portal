import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  FileText,
  Calendar,
  Briefcase,
  Globe,
  Shield,
  Zap,
  Award
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

export default function InvestorPortal() {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    
    if (!loading && profile) {
      if (profile.role !== 'investor' && profile.role !== 'admin') {
        navigate('/dashboard');
        return;
      }
      
      if (profile.approval_status === 'pending') {
        navigate('/dashboard');
        return;
      }
      
      if (profile.approval_status === 'rejected') {
        navigate('/dashboard');
        return;
      }
    }
  }, [user, profile, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading investor portal...</p>
        </div>
      </div>
    );
  }

  if (profile.approval_status !== 'approved') {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
        <Card className="max-w-md backdrop-glass border-warning/20">
          <CardHeader className="text-center">
            <CardTitle className="text-warning">Access Pending</CardTitle>
            <CardDescription>
              Your investor portal access is pending admin approval.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You will receive an email notification once your access has been approved.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Go to Standard Dashboard
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="w-full">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const keyMetrics = [
    {
      title: 'Total Addressable Market',
      value: '$577.9B',
      change: '+12.8%',
      trend: 'up',
      icon: Target,
      description: 'Global emergency communication market size'
    },
    {
      title: 'Revenue Projection',
      value: '$45M',
      change: '+285%',
      trend: 'up',
      icon: DollarSign,
      description: 'Year 3 projected revenue'
    },
    {
      title: 'Market Share Target',
      value: '8.5%',
      change: 'by 2030',
      trend: 'stable',
      icon: PieChart,
      description: 'Conservative market penetration goal'
    },
    {
      title: 'Active Pilots',
      value: '12',
      change: '+4 this month',
      trend: 'up',
      icon: Users,
      description: 'Stadium and enterprise deployments'
    }
  ];

  const investmentHighlights = [
    {
      category: 'Technology',
      title: 'Proprietary Mesh Networking',
      description: 'Patent-pending offline communication technology with 100% uptime guarantee',
      status: 'Completed',
      icon: Zap
    },
    {
      category: 'Market',
      title: 'Stadium Partnerships',
      description: 'Signed LOIs with 3 major sports venues, representing $2.1M ARR potential',
      status: 'In Progress',
      icon: Award
    },
    {
      category: 'Regulatory',
      title: 'FCC Compliance',
      description: 'Full regulatory approval for emergency communication systems',
      status: 'Completed',
      icon: Shield
    },
    {
      category: 'Team',
      title: 'Leadership Expansion',
      description: 'Former Motorola CTO joined as Head of Engineering',
      status: 'Completed',
      icon: Briefcase
    }
  ];

  const financialProjections = {
    year1: { revenue: 2.1, expenses: 3.8, funding: 5.0 },
    year2: { revenue: 8.9, expenses: 7.2, funding: 0 },
    year3: { revenue: 45.2, expenses: 18.6, funding: 0 },
    year4: { revenue: 128.7, expenses: 42.3, funding: 0 },
    year5: { revenue: 287.4, expenses: 89.1, funding: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="backdrop-glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground glow">
                G
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">GrahmOS Investor Portal</h1>
                <p className="text-sm text-muted-foreground">Confidential Investment Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Award className="w-3 h-3 mr-1" />
                Investor Access
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome, {profile.full_name || 'Investor'}
          </h2>
          <p className="text-muted-foreground mb-4">
            Confidential investment metrics and strategic insights for GrahmOS
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="team" className="hidden lg:block">Team</TabsTrigger>
            <TabsTrigger value="documents" className="hidden lg:block">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="investor-card glow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <metric.icon className="h-8 w-8 text-primary" />
                      <Badge 
                        variant="secondary" 
                        className={`${metric.trend === 'up' ? 'bg-success/10 text-success border-success/20' : 'bg-muted'}`}
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="stat-highlight">{metric.value}</div>
                    <p className="text-sm font-medium mb-1">{metric.title}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Investment Highlights */}
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="text-gradient">Recent Investment Highlights</CardTitle>
                <CardDescription>Key milestones and strategic updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {investmentHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border/50 last:border-b-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <highlight.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{highlight.title}</h3>
                          <Badge 
                            variant="secondary"
                            className={highlight.status === 'Completed' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}
                          >
                            {highlight.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{highlight.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {highlight.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financials Tab */}
          <TabsContent value="financials" className="space-y-6">
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="text-gradient flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  5-Year Financial Projections
                </CardTitle>
                <CardDescription>Revenue, expenses, and funding requirements (in millions USD)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(financialProjections).map(([year, data], index) => (
                    <div key={year} className="grid grid-cols-4 gap-4 items-center py-4 border-b border-border/50 last:border-b-0">
                      <div className="font-semibold">Year {index + 1}</div>
                      <div className="text-success">${data.revenue}M Revenue</div>
                      <div className="text-destructive">${data.expenses}M Expenses</div>
                      <div className="text-primary">${data.funding}M Funding</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Key Financial Assumptions</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Average stadium deployment: $180k annual recurring revenue</li>
                    <li>• Enterprise contracts: $25k-$75k annual licensing fees</li>
                    <li>• Gross margins: 85% by Year 3 due to software-centric model</li>
                    <li>• Break-even: Month 28 with current runway and projections</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="investor-card">
                <CardHeader>
                  <CardTitle className="text-gradient flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Market Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Addressable Market</span>
                      <span className="font-bold text-primary">$577.9B</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Serviceable Available Market</span>
                      <span className="font-bold text-primary">$45.2B</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Serviceable Obtainable Market</span>
                      <span className="font-bold text-primary">$3.8B</span>
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="font-semibold mb-2">Key Market Segments</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Sports venues and stadiums ($2.1B)</li>
                        <li>• Enterprise emergency systems ($1.2B)</li>
                        <li>• Government and military ($450M)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="investor-card">
                <CardHeader>
                  <CardTitle className="text-gradient flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Competitive Positioning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-primary mb-1">Unique Value Proposition</h4>
                      <p className="text-sm text-muted-foreground">
                        First and only 100% offline emergency communication platform with semantic search capabilities
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Competitive Advantages</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>Zero dependency on external networks</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>Military-grade encryption built-in</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>Proprietary mesh networking technology</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>Context-aware semantic search engine</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Product Tab */}
          <TabsContent value="product" className="space-y-6">
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="text-gradient">Product Roadmap & Development Status</CardTitle>
                <CardDescription>Current capabilities and upcoming features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                      <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-success" />
                      </div>
                      <h3 className="font-semibold text-success mb-2">Core Platform</h3>
                      <p className="text-sm text-muted-foreground">Completed & Deployed</p>
                    </div>
                    <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                      <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-6 w-6 text-warning" />
                      </div>
                      <h3 className="font-semibold text-warning mb-2">AI Enhancement</h3>
                      <p className="text-sm text-muted-foreground">In Development</p>
                    </div>
                    <div className="text-center p-4 bg-muted/5 rounded-lg border border-muted/20">
                      <div className="w-12 h-12 bg-muted/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Globe className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-muted-foreground mb-2">Global Scale</h3>
                      <p className="text-sm text-muted-foreground">Q3 2025 Target</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-border/50 pt-6">
                    <h4 className="font-semibold mb-4">Technology Stack</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-primary mb-2">Backend Infrastructure</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Distributed mesh networking protocol</li>
                          <li>• Real-time data synchronization</li>
                          <li>• Military-grade encryption (AES-256)</li>
                          <li>• Edge computing optimization</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-primary mb-2">Frontend Experience</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Progressive web application</li>
                          <li>• Offline-first architecture</li>
                          <li>• Voice and text interface</li>
                          <li>• Multi-device synchronization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="text-gradient">Leadership Team</CardTitle>
                <CardDescription>Experienced executives driving GrahmOS forward</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: 'Sarah Chen', role: 'CEO & Co-Founder', background: 'Former VP Engineering at Meta, 15+ years in distributed systems' },
                    { name: 'Marcus Rodriguez', role: 'CTO & Co-Founder', background: 'Ex-Motorola Principal Engineer, Led emergency communication systems for DoD' },
                    { name: 'Dr. Emily Watson', role: 'Head of AI Research', background: 'PhD Stanford AI Lab, Former Principal Scientist at Google DeepMind' },
                    { name: 'James Mitchell', role: 'VP Sales & Partnerships', background: 'Former Director at Cisco, 20+ years in enterprise communications' }
                  ].map((member, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border/50 last:border-b-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-primary mb-1">{member.role}</p>
                        <p className="text-sm text-muted-foreground">{member.background}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="text-gradient flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Investor Documents
                </CardTitle>
                <CardDescription>Confidential materials for qualified investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Executive Summary & Pitch Deck', size: '2.4 MB', updated: '2 days ago', type: 'PDF' },
                    { title: 'Financial Model & Projections', size: '1.8 MB', updated: '1 week ago', type: 'XLSX' },
                    { title: 'Technical Architecture Whitepaper', size: '3.2 MB', updated: '3 weeks ago', type: 'PDF' },
                    { title: 'Market Research Report', size: '4.7 MB', updated: '1 month ago', type: 'PDF' },
                    { title: 'Legal Documents & Terms Sheet', size: '892 KB', updated: '2 weeks ago', type: 'PDF' }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border/50 hover:bg-card transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">{doc.size} • Updated {doc.updated}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download {doc.type}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}