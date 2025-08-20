import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Building2, FileText, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export default function InvestorApply() {
  // Mock user - Stack Auth temporarily disabled
  const stackUser = null;
  const [user] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    pitch: '',
    accreditation: false
  });
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Stack Auth temporarily disabled
    toast.error('Authentication is temporarily disabled. Please check back later.');
    setCheckingAuth(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Stack Auth temporarily disabled
      toast.error('Authentication is temporarily disabled. Application submission unavailable.');
    } catch (error) {
      toast.error('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-white/70">Please sign in to apply for investor access.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/access'}
          className="text-white/70 hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Access Portal
        </Button>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Investor Application</h1>
              <p className="text-white/70">Apply for access to the GrahmOS investor portal</p>
            </div>

            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/70 text-sm mb-2">Applying as:</p>
              <p className="text-white font-semibold">
                {user.firstName} {user.lastName} ({user.email})
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pitch" className="text-white/80 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Investment Pitch
                </Label>
                <Textarea
                  id="pitch"
                  value={formData.pitch}
                  onChange={(e) => setFormData(prev => ({ ...prev, pitch: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
                  placeholder="Tell us about your investment interests, experience, and why you want access to the GrahmOS investor portal..."
                  required
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="accreditation"
                  checked={formData.accreditation}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, accreditation: !!checked }))
                  }
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="accreditation" className="text-white/80 text-sm leading-relaxed">
                    I am an accredited investor
                  </Label>
                  <p className="text-white/50 text-xs leading-relaxed">
                    Accredited investors have access to additional investment opportunities and advanced features.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Our team will review your application</li>
                  <li>• You'll receive an email notification of our decision</li>
                  <li>• If approved, you'll gain access to the investor portal</li>
                  <li>• Review typically takes 1-2 business days</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Submitting Application...</span>
                  </div>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
