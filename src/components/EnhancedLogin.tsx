import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, Eye, EyeOff, Shield, Sparkles, Users, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { api, validateEmail, generateSlug } from '@/lib/api';

interface EnhancedLoginProps {
  onAuthSuccess?: (userData: any) => void;
}

const EnhancedLogin = ({ onAuthSuccess }: EnhancedLoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

  const validateForm = (mode: 'login' | 'signup' | 'waitlist') => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields', {
        description: 'Email and password are required',
        duration: 4000,
      });
      return false;
    }

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match', {
          description: 'Please ensure both passwords match',
          duration: 4000,
        });
        return false;
      }
      if (formData.password.length < 8) {
        toast.error('Password too short', {
          description: 'Password must be at least 8 characters long',
          duration: 4000,
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent, mode: 'login' | 'signup' | 'waitlist') => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast.error('Invalid email address', {
        description: 'Please enter a valid email address',
        duration: 4000,
      });
      return;
    }

    if (mode !== 'waitlist' && !validateForm(mode)) return;

    setIsLoading(true);

    try {
      if (mode === 'waitlist') {
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
          setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
        } else {
          toast.error('Waitlist signup failed', {
            description: result.error || 'Please try again',
            duration: 5000,
          });
        }
        return;
      }

      if (mode === 'signup') {
        // Create user account in Neon database
        const result = await api.registerUser({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          userType: 'user'
        });

        if (result.success) {
          toast.success(
            `Account created! Welcome, ${formData.firstName || 'User'}!`,
            {
              description: 'You can now access your portal',
              duration: 6000,
            }
          );
          
          // Switch to login tab
          setActiveTab('login');
          setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        } else {
          toast.error('Account creation failed', {
            description: result.error || 'Please try again',
            duration: 5000,
          });
        }
        return;
      }

      if (mode === 'login') {
        // Login user
        const result = await api.loginUser(formData.email, formData.password);
        
        if (result.success && result.data) {
          const userData = {
            id: result.data.id,
            email: result.data.email,
            firstName: result.data.firstName || 'User',
            lastName: result.data.lastName,
            userType: result.data.userType,
            slug: generateSlug(result.data.email)
          };

          toast.success('Login successful!', {
            description: 'Redirecting to your portal...',
            duration: 3000,
          });

          if (onAuthSuccess) {
            onAuthSuccess(userData);
          }

          // Navigate to appropriate portal based on user type
          setTimeout(() => {
            const isInvestor = (userData.userType || '').toLowerCase() === 'investor';
            navigate(isInvestor ? `/investor/${userData.slug}` : `/portal/${userData.slug}`);
          }, 1500);
        } else {
          toast.error('Login failed', {
            description: result.error || 'Invalid email or password',
            duration: 5000,
          });
        }
      }

    } catch (error) {
      console.error('Authentication error:', error);
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
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <Card className="glass-morphism border-white/20 bg-black/20 backdrop-blur-xl">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 rounded-t-2xl">
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-blue-500/30 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                Waitlist
              </TabsTrigger>
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Portal Login
              </TabsTrigger>
              <TabsTrigger 
                value="create"
                className="data-[state=active]:bg-emerald-500/30 data-[state=active]:text-white"
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
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Investor Portal Access</h3>
                <p className="text-white/70">
                  Access your private investor dashboard and SAFE calculator
                </p>
              </div>
              
              <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginEmail" className="text-white/80">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="loginEmail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="investor@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loginPassword" className="text-white/80">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="loginPassword"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Accessing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Access Portal</span>
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="create" className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Create Account</h3>
                <p className="text-white/70">
                  Get full access to /GRAHMOS platform and investor tools
                </p>
              </div>
              
              <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signupFirstName" className="text-white/80">First Name</Label>
                    <Input
                      id="signupFirstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupLastName" className="text-white/80">Last Name</Label>
                    <Input
                      id="signupLastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-white/80">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="signupEmail"
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

                <div className="space-y-2">
                  <Label htmlFor="signupPassword" className="text-white/80">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="signupPassword"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/80">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLogin;
