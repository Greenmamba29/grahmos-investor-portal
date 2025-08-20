import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Bell, 
  Activity, 
  Wifi, 
  Shield, 
  Search,
  LogOut,
  Users,
  Globe,
  Zap
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    logout();
    navigate('/');
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: 'Active Connections',
      value: '24',
      description: 'Mesh network nodes',
      icon: Wifi,
      color: 'text-primary'
    },
    {
      title: 'Security Level',
      value: 'Military Grade',
      description: 'Encryption active',
      icon: Shield,
      color: 'text-success'
    },
    {
      title: 'System Status',
      value: 'Operational',
      description: '100% uptime',
      icon: Activity,
      color: 'text-primary'
    },
    {
      title: 'Search Queries',
      value: '1,247',
      description: 'Today',
      icon: Search,
      color: 'text-warning'
    }
  ];

  const recentActivities = [
    { action: 'Emergency protocol updated', time: '2 minutes ago', status: 'success' },
    { action: 'New node connected to mesh', time: '15 minutes ago', status: 'info' },
    { action: 'Security scan completed', time: '1 hour ago', status: 'success' },
    { action: 'System backup created', time: '3 hours ago', status: 'info' },
  ];

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
                <h1 className="text-xl font-bold text-gradient">GrahmOS Dashboard</h1>
                <p className="text-sm text-muted-foreground">Standard User Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user.firstName || 'User'}
              </h2>
              <p className="text-muted-foreground mb-4">
                Your GrahmOS system is operational and ready for emergency communication.
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <User className="w-3 h-3 mr-1" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Access
                </Badge>
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  <Activity className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="investor-card glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color.includes('primary') ? 'bg-primary/10' : 
                    stat.color.includes('success') ? 'bg-success/10' : 'bg-warning/10'} 
                    flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Features */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="flex items-center text-gradient">
                  <Zap className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Access your most-used GrahmOS features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2 glow">
                    <Wifi className="h-6 w-6" />
                    <span>Connect to Mesh</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-primary/20">
                    <Search className="h-6 w-6" />
                    <span>Emergency Search</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-primary/20">
                    <Shield className="h-6 w-6" />
                    <span>Security Check</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-primary/20">
                    <Users className="h-6 w-6" />
                    <span>Find Contacts</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="flex items-center text-gradient">
                  <Globe className="h-5 w-5 mr-2" />
                  Network Status
                </CardTitle>
                <CardDescription>
                  Real-time mesh network information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Connection Quality</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-primary">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Signal Strength</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-success">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Encryption Level</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      AES-256
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="space-y-6">
            <Card className="investor-card">
              <CardHeader>
                <CardTitle className="flex items-center text-gradient">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-3 border-b border-border/50 last:border-b-0">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="investor-card bg-gradient-glow border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Emergency Protocols</CardTitle>
                <CardDescription>
                  Quick access to emergency procedures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start border-primary/20">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Breach Protocol
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start border-primary/20">
                    <Wifi className="h-4 w-4 mr-2" />
                    Network Failure Response
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start border-primary/20">
                    <Users className="h-4 w-4 mr-2" />
                    Mass Communication
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
