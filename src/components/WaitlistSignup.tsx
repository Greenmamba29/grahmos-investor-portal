
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Gift, Users, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const WaitlistSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [isInvestor, setIsInvestor] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (isInvestor) {
      // Route to access portal for proper investor authentication
      toast.success('Redirecting to investor access...');
      setTimeout(() => {
        navigate('/access');
      }, 1000);
      return;
    }

    // Simulate waitlist signup
    setIsSubmitted(true);
    toast.success('Welcome to the future! Check your email for your unique referral link.');
  };

  const benefits = isInvestor ? [
    { icon: Building2, text: 'Private investor portal', color: 'text-purple-400' },
    { icon: Gift, text: 'SAFE calculator access', color: 'text-yellow-400' },
    { icon: Mail, text: 'Investment updates', color: 'text-blue-400' }
  ] : [
    { icon: Gift, text: 'Early access rewards', color: 'text-yellow-400' },
    { icon: Users, text: 'Exclusive community', color: 'text-green-400' },
    { icon: Mail, text: 'Priority notifications', color: 'text-blue-400' }
  ];

  if (isSubmitted) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="glass-morphism rounded-3xl p-8 mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-4">You're In!</h3>
          <p className="text-white/80 mb-6">
            Welcome to the /SYNC early access program. Your unique referral link has been sent to your email.
          </p>
          
          <div className="bg-blue-500/20 rounded-2xl p-6 mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">🎁 Referral Rewards</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-400">5 refs</div>
                <div className="text-white/60">Premium Access</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">10 refs</div>
                <div className="text-white/60">Beta Features</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">25 refs</div>
                <div className="text-white/60">Founder Status</div>
              </div>
            </div>
          </div>

          <div className="text-white/60">
            <p>Referrals: <span className="text-white font-semibold">{referralCount}</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {isInvestor ? 'Investor Access' : 'Join the Revolution'}
      </h2>
      <p className="text-white/80 mb-6 text-lg">
        {isInvestor 
          ? 'Access your private investor portal with SAFE calculator and investment tools.'
          : 'Be among the first to experience the future of search. Get early access and exclusive rewards.'
        }
      </p>
      
      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="glass-morphism rounded-2xl p-2 flex">
          <button
            type="button"
            onClick={() => setIsInvestor(false)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              !isInvestor 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Early Access
          </button>
          <button
            type="button"
            onClick={() => setIsInvestor(true)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isInvestor 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <Building2 className="h-4 w-4 inline mr-2" />
            Investor Portal
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="glass-morphism rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 text-lg rounded-xl"
                required
              />
            </div>
            <Button 
              type="submit"
              className={`${isInvestor 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
              } text-white font-semibold px-8 h-14 rounded-xl text-lg transition-all duration-300 transform hover:scale-105`}
            >
              {isInvestor ? 'Access Portal' : 'Get Early Access'}
            </Button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="glass-morphism rounded-xl p-4 flex items-center space-x-3">
            <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
            <span className="text-white/80 text-sm">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitlistSignup;
