import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function EcosystemFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30 mt-24">
      {/* Ecosystem Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-4">Part of the GrahmOS Ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://grahmos.com"
              className="px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-card transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-sm font-semibold">GrahmOS.com</div>
              <div className="text-xs text-muted-foreground">Business & Partnerships</div>
            </a>
            <a
              href="https://grahmos.app"
              className="px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-card transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-sm font-semibold">GrahmOS.app</div>
              <div className="text-xs text-muted-foreground">Product Experience</div>
            </a>
            <a
              href="https://grahmos.store"
              className="px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-card transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-sm font-semibold">GrahmOS.store</div>
              <div className="text-xs text-muted-foreground">Marketplace</div>
            </a>
            <a
              href="https://grahmos.org"
              className="px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-card transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-sm font-semibold">GrahmOS.org</div>
              <div className="text-xs text-muted-foreground">Community Governance</div>
            </a>
          </div>
        </div>

        {/* Main Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-border/50">
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#how-it-works');
                    if (element) {
                      const yOffset = -80;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#principles" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#principles');
                    if (element) {
                      const yOffset = -80;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Principles
                </a>
              </li>
              <li>
                <a 
                  href="#stories" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#stories');
                    if (element) {
                      const yOffset = -80;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Stories
                </a>
              </li>
              <li>
                <Link to="/product" className="text-muted-foreground hover:text-foreground transition-colors">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/investor-relations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <a 
                  href="#newsletter" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#newsletter');
                    if (element) {
                      const yOffset = -80;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                      // Focus on email input
                      setTimeout(() => {
                        const emailInput = element.querySelector('input[type="email"]') as HTMLInputElement;
                        emailInput?.focus();
                      }, 500);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Join the Newsletter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/manifesto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Manifesto
                </Link>
              </li>
              <li>
                <a href="https://docs.grahmos.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://status.grahmos.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  System Status
                </a>
              </li>
              <li>
                <Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:investor@grahmos.info" className="text-muted-foreground hover:text-foreground transition-colors">
                  investor@grahmos.info
                </a>
              </li>
              <li>
                <a href="mailto:partners@grahmos.info" className="text-muted-foreground hover:text-foreground transition-colors">
                  partners@grahmos.info
                </a>
              </li>
              <li>
                <a href="mailto:hello@grahmos.info" className="text-muted-foreground hover:text-foreground transition-colors">
                  hello@grahmos.info
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-border/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground">
              G
            </div>
            <span>© {currentYear} GrahmOS. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
