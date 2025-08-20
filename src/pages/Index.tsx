
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, Shield, ArrowLeft } from 'lucide-react';
import { useUser } from '@stackframe/react';
import { apiRequest } from '@/lib/stack-api';
import Earth3D from '@/components/Earth3D';
import FloatingElements from '@/components/FloatingElements';

interface User {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  stackUserId?: string;
  displayName?: string;
}

const Index = () => {
  const stackUser = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadUser = async () => {
      if (stackUser) {
        try {
          const accessToken = await stackUser.getIdToken();
          const response = await apiRequest.get('/.netlify/functions/auth-me', accessToken);
          const data = await response.json();
          
          if (data.user) {
            setUser(data.user);
          }
        } catch (error) {
          console.error('Failed to load user:', error);
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, [stackUser]);

  const cards = [
    {
      title: 'Standard User',
      description: 'Create an account for the basic dashboard and features.',
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      action: () => (window.location.href = '/handler/signup'),
      available: true
    },
    {
      title: 'Investor Portal',
      description: user?.role === 'investor' 
        ? 'Access your investor dashboard and tools.' 
        : 'Apply for investor access. We will review your application quickly.',
      icon: Building2,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      action: () => (window.location.href = user?.role === 'investor' ? '/investor' : '/investor/apply'),
      available: true
    },
    user?.role === 'admin' && {
      title: 'Super Admin',
      description: 'Review investor applications and manage user roles.',
      icon: Shield,
      color: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      action: () => (window.location.href = '/admin/requests'),
      available: true
    }
  ].filter(Boolean) as any[];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Earth3D />
      <FloatingElements />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            {/* GrahmOS Access Portal Header */}
            <div className={`transition-all duration-1000 ${mounted ? 'animate-slide-up opacity-100' : 'opacity-0'}`}>
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl font-bold text-white">G</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                Access Portal
              </h1>
              <p className="text-xl text-white/70 mb-2">
                Enter the GrahmOS ecosystem
              </p>
            </div>
            
            {/* Join the Future Section */}
            <div className={`mt-16 transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up opacity-100' : 'opacity-0'}`}>
              <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
                Join the Future
              </h2>
              <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Access the most advanced emergency communication platform ever created
              </p>
            </div>
          </div>

          {/* Access Cards */}
          <div className={`grid md:grid-cols-3 gap-8 mb-8 transition-all duration-1000 delay-500 ${mounted ? 'animate-slide-up opacity-100' : 'opacity-0'}`}>
            {cards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-full ${card.color} flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {card.title}
                    </h2>
                    
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {card.description}
                    </p>
                    
                    <Button 
                      onClick={card.action}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-300"
                      disabled={!card.available}
                    >
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Status Info */}
          {user && (
            <div className="text-center">
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 max-w-md mx-auto">
                <CardContent className="p-6">
                  <p className="text-white/70 text-sm mb-2">Current Status</p>
                  <p className="text-white font-semibold capitalize">
                    {user.role} User
                  </p>
                  {user.role === 'standard' && (
                    <p className="text-white/50 text-xs mt-2">
                      Apply for investor access to unlock additional features
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Login/Logout Actions */}
          <div className="text-center mt-8">
            {user ? (
              <Button
                variant="outline"
                onClick={async () => {
                  if (stackUser) {
                    await stackUser.signOut();
                    setUser(null);
                    window.location.reload();
                  }
                }}
                className="text-white border-white/30 hover:bg-white/10"
              >
                Sign Out
              </Button>
            ) : (
              <div className="space-x-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/handler/signin'}
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => window.location.href = '/handler/signup'}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                >
                  Create Account
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
