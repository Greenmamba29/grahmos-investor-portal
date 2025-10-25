import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailSignupProps {
  type?: 'newsletter' | 'investor_interest';
  title?: string;
  description?: string;
}

export default function EmailSignup({ 
  type = 'newsletter', 
  title = "Stay Updated", 
  description = "Get the latest updates on GrahmOS development and launch" 
}: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Mock signup - in production, this would integrate with a backend service
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "✅ Subscribed Successfully!",
        description: type === 'investor_interest' 
          ? "You'll receive exclusive investor updates and funding announcements."
          : "You'll receive the latest updates on GrahmOS development.",
      });
      
      setEmail('');
      
      // Optional: You could send this to your actual backend here
      console.log(`Email signup: ${email} for ${type}`);
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Card className="investor-card">
      <CardHeader>
        <CardTitle className="flex items-center text-gradient">
          <Mail className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 backdrop-glass border-border/50"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="glow">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Mail className="h-4 w-4 mr-2" />
            )}
            {type === 'investor_interest' ? 'Get Updates' : 'Subscribe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}