import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Earth3D from '@/components/Earth3D';
import FloatingElements from '@/components/FloatingElements';

export default function AccessPortal() {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    accessLevel: 'Standard User'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For sign in, redirect to Neon Auth
    if (activeForm === 'signin') {
      window.location.href = '/handler/signin';
      return;
    }
    
    // For sign up, redirect to Neon Auth
    if (activeForm === 'signup') {
      window.location.href = '/handler/signup';
      return;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <Earth3D />
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Access Portal */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-white/70 hover:text-white mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            <Card className="bg-black/40 backdrop-blur-xl border-white/20">
              <CardContent className="p-8">
                {/* Logo */}
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <span className="text-3xl font-bold text-white">G</span>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Access Portal
                  </h1>
                  <p className="text-white/70">
                    Enter the GrahmOS ecosystem
                  </p>
                </div>

                {/* Form Toggle */}
                <div className="flex mb-6 bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setActiveForm('signin')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeForm === 'signin'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveForm('signup')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeForm === 'signup'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Sign In Form */}
                {activeForm === 'signin' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white/80">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-white/80">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3"
                    >
                      Access Portal
                    </Button>
                  </form>
                )}

                {/* Sign Up Form */}
                {activeForm === 'signup' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-white/80">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signupEmail" className="text-white/80">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accessLevel" className="text-white/80">Access Level</Label>
                      <Select value={formData.accessLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, accessLevel: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Standard User">Standard User</SelectItem>
                          <SelectItem value="Investor Portal">Investor Portal</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.accessLevel === 'Investor Portal' && (
                        <p className="text-white/60 text-xs mt-1">
                          Investor access requires admin approval
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="signupPassword" className="text-white/80">Password</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3"
                    >
                      Create Account
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Join the Future */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <div className="text-center text-white max-w-lg">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
              Join the Future
            </h1>
            <p className="text-2xl text-white/80 leading-relaxed">
              Access the most advanced emergency communication platform ever created
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
