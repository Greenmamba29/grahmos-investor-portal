
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Link, Copy } from 'lucide-react';
import { toast } from 'sonner';

const SocialShare = () => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = 'https://sync-search.com';
  const shareText = 'Check out /SYNC - the revolutionary AI-powered search engine launching soon! 🚀';

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-500/20 hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600/20 hover:text-blue-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-700/20 hover:text-blue-600'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleSocialShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold text-white mb-6">
        Spread the Word & Earn Rewards
      </h3>
      
      <div className="glass-morphism rounded-2xl p-6 max-w-lg mx-auto">
        <p className="text-white/80 mb-6 text-sm">
          Share /SYNC with friends and unlock exclusive benefits. The more you share, the more you earn!
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="ghost"
              size="sm"
              onClick={() => handleSocialShare(platform.url)}
              className={`glass-morphism rounded-xl p-3 transition-all duration-300 ${platform.color} group`}
            >
              <platform.icon className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">{platform.name}</span>
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="glass-morphism rounded-xl p-3 transition-all duration-300 hover:bg-green-500/20 hover:text-green-400"
          >
            {copied ? <Copy className="h-5 w-5" /> : <Link className="h-5 w-5" />}
            <span className="ml-2 hidden sm:inline">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </Button>
        </div>
        
        <div className="text-xs text-white/60">
          🎁 Earn premium features for every 5 successful referrals
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
