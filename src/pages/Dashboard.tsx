import { useState, useEffect } from 'react';
import { useUser } from '@stackframe/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Building2, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Calculator, 
  Users,
  Mail,
  Settings,
  Bell,
  Upload,
  Moon,
  Sun,
  LogOut,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Area, AreaChart, Pie } from 'recharts';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

export default function Dashboard() {
  const user = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // SAFE Calculator State (from InvestorPortal)
  const [pre, setPre] = useState(5000000); // $5M
  const [ticket, setTicket] = useState(1000000); // $1M
  const [cap, setCap] = useState(8000000); // $8M
  const [discount, setDiscount] = useState(20); // 20%

  useEffect(() => {
    setMounted(true);
    if (user) {
      toast.success(`Welcome back!`, {
        description: `Hello ${user.displayName || user.primaryEmail}, your dashboard is ready.`,
        duration: 4000,
      });
    }
  }, [user]);

  // Sample investor data based on your database structure
  const investorStats = {
    totalInvestors: 127,
    totalInvestment: 24500000,
    pendingApplications: 8,
    activePortalSessions: 23,
    avgInvestment: 192913,
    monthlyGrowth: 15.7
  };

  const recentInvestors = [
    { name: "User", email: "user@example.com", amount: 500000, status: "verified", date: "2024-08-19" },
    { name: "McDonald", email: "mcdonald@example.com", amount: 750000, status: "verified", date: "2024-08-18" },
    { name: "John Doe", email: "john@example.com", amount: 250000, status: "pending", date: "2024-08-17" },
  ];

  const monthlyData = [
    { month: 'Jan', investments: 2100000, investors: 15 },
    { month: 'Feb', investments: 3200000, investors: 23 },
    { month: 'Mar', investments: 2800000, investors: 19 },
    { month: 'Apr', investments: 4100000, investors: 31 },
    { month: 'May', investments: 3500000, investors: 27 },
    { month: 'Jun', investments: 4800000, investors: 35 },
  ];

  const portfolioData = [
    { name: 'Individual Investors', value: 65, fill: '#3b82f6' },
    { name: 'Institutional', value: 25, fill: '#8b5cf6' },
    { name: 'Strategic Partners', value: 10, fill: '#10b981' },
  ];

  // SAFE calculations
  const effectivePrice = Math.min(cap * (1 - discount/100), pre + ticket);
  const sharesFromInvestment = ticket / effectivePrice * (pre + ticket);
  const totalShares = pre + ticket + sharesFromInvestment;
  const ownership = (sharesFromInvestment / totalShares) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleSignOut = async () => {
    if (user) {
      await user.signOut();
      toast.success('Signed out successfully');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 dark:from-gray-950 dark:via-black dark:to-blue-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 dark:from-gray-950 dark:via-black dark:to-blue-950 text-white transition-all duration-500">
      {/* Fixed Header with Notification & Quick Upload */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Grahmos Portal
                </h1>
                <p className="text-sm text-white/60">
                  {user?.displayName || user?.primaryEmail || 'Welcome back'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notification Bell with Glow */}
              <Button
                size="icon"
                variant="ghost"
                className="relative hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </Button>

              {/* Quick Upload with Glow */}
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
              >
                <Upload className="h-4 w-4 mr-2" />
                Quick Upload
              </Button>

              {/* Theme Toggle */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:bg-white/10 transition-all duration-300"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Settings */}
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-white/10 transition-all duration-300"
              >
                <Settings className="h-5 w-5" />
              </Button>

              {/* Sign Out */}
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSignOut}
                className="hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-lg border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="investors" className="data-[state=active]:bg-white/20">Investors</TabsTrigger>
            <TabsTrigger value="calculator" className="data-[state=active]:bg-white/20">SAFE Calculator</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium">Total Investment</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(investorStats.totalInvestment)}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-green-400 text-sm mt-2 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +{investorStats.monthlyGrowth}% this month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium">Active Investors</p>
                      <p className="text-2xl font-bold text-white">{investorStats.totalInvestors}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-blue-400 text-sm mt-2">{investorStats.activePortalSessions} active sessions</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium">Avg Investment</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(investorStats.avgInvestment)}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium">Pending Applications</p>
                      <p className="text-2xl font-bold text-white">{investorStats.pendingApplications}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-amber-400 text-sm mt-2">Awaiting review</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    <span>Monthly Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#ffffff', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        formatter={(value, name) => [
                          name === 'investments' ? formatCurrency(Number(value)) : value,
                          name === 'investments' ? 'Investment Amount' : 'New Investors'
                        ]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="investments" 
                        fill="url(#colorGradient)" 
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <PieChart className="h-5 w-5" />
                    <span>Investor Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investors" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Recent Investors</span>
                  </span>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInvestors.map((investor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{investor.name}</p>
                          <p className="text-white/60 text-sm">{investor.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{formatCurrency(investor.amount)}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={investor.status === 'verified' ? 'default' : 'secondary'}>
                            {investor.status}
                          </Badge>
                          <p className="text-white/60 text-sm">{investor.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            {/* SAFE Calculator (from InvestorPortal) */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Calculator className="h-5 w-5" />
                  <span>SAFE Investment Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Pre-money Valuation: {formatCurrency(pre)}
                      </label>
                      <Slider
                        value={[pre]}
                        onValueChange={(value) => setPre(value[0])}
                        min={1000000}
                        max={50000000}
                        step={500000}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Investment Amount: {formatCurrency(ticket)}
                      </label>
                      <Slider
                        value={[ticket]}
                        onValueChange={(value) => setTicket(value[0])}
                        min={100000}
                        max={5000000}
                        step={50000}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Valuation Cap: {formatCurrency(cap)}
                      </label>
                      <Slider
                        value={[cap]}
                        onValueChange={(value) => setCap(value[0])}
                        min={1000000}
                        max={100000000}
                        step={1000000}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Discount: {discount}%
                      </label>
                      <Slider
                        value={[discount]}
                        onValueChange={(value) => setDiscount(value[0])}
                        min={0}
                        max={30}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{ownership.toFixed(2)}%</h3>
                    <p className="text-white/70 mb-4">Projected Ownership</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Investment:</span>
                        <span className="text-white font-semibold">{formatCurrency(ticket)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Pre-money:</span>
                        <span className="text-white font-semibold">{formatCurrency(pre)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Activity className="h-5 w-5" />
                  <span>Portfolio Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#ffffff', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Line type="monotone" dataKey="investments" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                    <Line type="monotone" dataKey="investors" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
