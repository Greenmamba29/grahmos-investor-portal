import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 backdrop-glass mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-xl text-primary-foreground glow">
                G
              </div>
              <span className="text-xl font-bold text-gradient">GrahmOS</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              The next-generation emergency communication operating system. 
              Connecting people when it matters most, even when traditional networks fail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Investor Portal</h3>
            <ul className="space-y-2">
              <li><Link to="/market" className="text-muted-foreground hover:text-primary transition-colors">Market Analysis</Link></li>
              <li><Link to="/product" className="text-muted-foreground hover:text-primary transition-colors">Product Overview</Link></li>
              <li><Link to="/competitive" className="text-muted-foreground hover:text-primary transition-colors">Competitive Edge</Link></li>
              <li><Link to="/financial" className="text-muted-foreground hover:text-primary transition-colors">Financial Outlook</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 GrahmOS. All rights reserved. Confidential Investor Information.</p>
        </div>
      </div>
    </footer>
  );
}