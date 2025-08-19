import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Settings, Bell, BarChart3, Calendar, FileText, Mail, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Portal = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Welcome toast with smooth animation
    toast.success(`Welcome to your portal, ${slug || 'User'}!`, {
      description: 'Your private Grahmos dashboard is now active',
      duration: 5000,
    });
  }, [slug]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Connecting you with support...',
        success: 'Support request sent! We\'ll get back to you within 24 hours.',
        error: 'Failed to send support request. Please try again.',
        duration: 5000,
      }
    );
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully', {
      description: 'You have been signed out of your portal',
      duration: 3000,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0 transition-all duration-1000 ${mounted ? 'animate-slide-up opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleGoBack}
              className="border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome, {slug || 'User'}
              </h1>
              <p className="text-sm sm:text-base text-white/70">Your Private Grahmos Dashboard</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <Badge className="bg-green-500/20 text-green-400 border-green-400/30 mb-2">
              <User className="h-3 w-3 mr-1" />
              Portal Access Active
            </Badge>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/60">Live Session</span>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400/50 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80">
                  Welcome to your personal Grahmos dashboard! Here you can access all the features and tools available to platform users.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">0</div>
                    <div className="text-sm text-white/60">Active Searches</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">0</div>
                    <div className="text-sm text-white/60">Saved Results</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Settings className="h-5 w-5" />
                  <span>Available Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white/80">AI-Powered Search</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white/80">Context Understanding</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white/80">Fast Results</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-white/80">Personal Dashboard</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-lg font-semibold text-white">{slug || 'User'}</div>
                  <div className="text-sm text-white/60">Platform User</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 hover:bg-white/10 text-white"
                    onClick={() => navigate('/')}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Go to Search
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 hover:bg-white/10 text-white"
                    onClick={handleContactSupport}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-3">Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Account:</span>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Plan:</span>
                    <span className="text-white">Basic</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Member Since:</span>
                    <span className="text-white">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-white/60">
          <p className="text-sm">
            This portal is for demonstration purposes. Features and access may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portal;