import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CinematicEarth from '@/components/CinematicEarth';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset.');
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/auth-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: form.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/auth?tab=signin');
        }, 3000);
      } else {
        setError(data.error || data.details || 'Failed to reset password');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
    
    setIsLoading(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-starfield relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-nebula opacity-30" />
        
        <div className="absolute top-6 left-6 z-50">
          <Link to="/auth">
            <Button variant="ghost" className="backdrop-glass">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Auth
            </Button>
          </Link>
        </div>

        <div className="flex min-h-screen items-center justify-center p-8">
          <Card className="w-full max-w-md backdrop-glass border-destructive/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gradient">Invalid Reset Link</CardTitle>
              <CardDescription>
                The password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  Please request a new password reset from the sign-in page.
                </AlertDescription>
              </Alert>
              <div className="mt-4">
                <Link to="/auth?tab=forgot">
                  <Button className="w-full">
                    Request New Reset Link
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-starfield relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-nebula opacity-30" />
        
        <div className="flex min-h-screen items-center justify-center p-8">
          <Card className="w-full max-w-md backdrop-glass border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-gradient">Password Reset Successfully</CardTitle>
              <CardDescription>
                Your password has been updated. You can now sign in with your new password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="border-primary/20 bg-primary/5">
                <AlertDescription className="text-primary">
                  Redirecting to sign in page in 3 seconds...
                </AlertDescription>
              </Alert>
              <div className="mt-4">
                <Link to="/auth?tab=signin">
                  <Button className="w-full glow">
                    Sign In Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-starfield relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-nebula opacity-30" />
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link to="/auth">
          <Button variant="ghost" className="backdrop-glass">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Auth
          </Button>
        </Link>
      </div>

      <div className="flex min-h-screen">
        {/* Left Panel - Reset Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <Card className="w-full max-w-md backdrop-glass border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-bold text-2xl text-primary-foreground glow mx-auto mb-4">
                G
              </div>
              <CardTitle className="text-2xl text-gradient">Reset Your Password</CardTitle>
              <CardDescription>
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={8}
                    className="backdrop-glass border-border/50"
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                    className="backdrop-glass border-border/50"
                    placeholder="Confirm your new password"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full glow" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Cinematic Earth */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-6 text-gradient text-center">
              Secure Access
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-center">
              Your security is our priority. Create a strong password to protect your account.
            </p>
            <CinematicEarth />
          </div>
        </div>
      </div>
    </div>
  );
}
