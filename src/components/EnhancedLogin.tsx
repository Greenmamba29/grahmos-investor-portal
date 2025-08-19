import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Shield, Sparkles, Users, Building2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { api, validateEmail } from '@/lib/api';

interface EnhancedLoginProps {
  onAuthSuccess?: (userData: any) => void;
}

const EnhancedLogin = ({ onAuthSuccess }: EnhancedLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('waitlist');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = async (e: React.FormEvent, mode: 'waitlist') => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast.error('Invalid email address', {
        description: 'Please enter a valid email address',
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Add to newsletter signup in Neon database
      const result = await api.subscribeToNewsletter({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        signupSource: 'waitlist'
      });

      if (result.success) {
        toast.success(
          `Welcome to /GRAHMOS waitlist!`,
          {
            description: `Confirmation sent to ${formData.email}`,
            duration: 6000,
          }
        );
        
                  // Reset form
          setFormData({ email: '', firstName: '', lastName: '' });
      } else {
        toast.error('Waitlist signup failed', {
          description: result.error || 'Please try again',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
      toast.error('Connection failed', {
        description: 'Unable to connect to database. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle direct navigation to specific tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset form when switching tabs
    setFormData({ email: '', firstName: '', lastName: '' });
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <Card className="glass-morphism border-white/20 bg-black/20 backdrop-blur-xl">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 rounded-t-2xl">
              <TabsTrigger 
                value="waitlist" 
                className="data-[state=active]:bg-blue-500/30 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                Waitlist
              </TabsTrigger>
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white"
                onClick={() => navigate('/login')}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Portal Login
              </TabsTrigger>
              <TabsTrigger 
                value="create"
                className="data-[state=active]:bg-emerald-500/30 data-[state=active]:text-white"
                onClick={() => navigate('/register')}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signup" className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Join the Waitlist</h3>
                <p className="text-white/70">
                  Be the first to experience the future of AI-powered search
                </p>
              </div>
              
              <form onSubmit={(e) => handleSubmit(e, 'waitlist')} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white/80">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Joining...</span>
                    </div>
                  ) : (
                    'Join Waitlist'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="login" className="p-8 space-y-6">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Investor Portal Access</h3>
                  <p className="text-white/70">
                    Access your private investor dashboard and SAFE calculator
                  </p>
                </div>
                
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Sign In to Portal</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="create" className="p-8 space-y-6">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Create Account</h3>
                  <p className="text-white/70">
                    Get full access to /GRAHMOS platform and investor tools
                  </p>
                </div>
                
                <Button 
                  onClick={() => navigate('/register')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLogin;
