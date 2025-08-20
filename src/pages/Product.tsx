import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  Search, 
  Terminal, 
  Shield, 
  Smartphone, 
  Server, 
  Layers, 
  CheckCircle,
  ArrowRight 
} from 'lucide-react';

export default function Product() {
  const coreFeatures = [
    {
      icon: Wifi,
      title: 'Offline-First Architecture',
      description: 'Proprietary mesh networking enables device-to-device communication without cellular or internet connectivity up to 1km range.',
      benefits: ['100% offline functionality', 'Zero network dependency', '1km mesh range', 'Automatic network healing']
    },
    {
      icon: Search,
      title: 'Semantic Search Engine',
      description: 'Context-aware search delivers relevant emergency protocols and information even without internet access.',
      benefits: ['Natural language queries', 'Context understanding', 'Offline knowledge base', 'Instant results']
    },
    {
      icon: Terminal,
      title: 'Slash Command Interface',
      description: 'Intuitive command system enables rapid access to critical functions during emergencies with minimal training.',
      benefits: ['Instant command execution', 'Minimal learning curve', 'Emergency-optimized UI', 'Voice command support']
    },
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'End-to-end encryption with zero-knowledge architecture ensures communications remain private and protected.',
      benefits: ['E2E encryption', 'Zero-knowledge architecture', 'Perfect forward secrecy', 'Quantum-resistant algorithms']
    }
  ];

  const technicalSpecs = [
    { category: 'Mesh Network', specs: ['Range: Up to 1km per hop', 'Nodes: 1000+ per network', 'Latency: <50ms', 'Auto-healing: <5s'] },
    { category: 'Search Engine', specs: ['Response time: <100ms', 'Knowledge base: 10TB+', 'Languages: 15+', 'Accuracy: 98.7%'] },
    { category: 'Security', specs: ['Encryption: AES-256', 'Key exchange: ECDH', 'Forward secrecy: Yes', 'Audit: SOC 2 Type II'] },
    { category: 'Platform', specs: ['iOS: 14+', 'Android: 8+', 'Web: Modern browsers', 'Desktop: Windows/Mac/Linux'] }
  ];

  const useCases = [
    {
      title: 'Stadium Events',
      description: 'Maintain communication during network congestion with 50,000+ attendees',
      features: ['Crowd density management', 'Emergency evacuation', 'Staff coordination', 'Real-time updates']
    },
    {
      title: 'Natural Disasters',
      description: 'Continue operations when cellular towers are damaged or overloaded',
      features: ['Disaster response coordination', 'Resource allocation', 'Survivor location', 'Medical triage']
    },
    {
      title: 'Military Operations',
      description: 'Secure communications in remote areas without infrastructure',
      features: ['Tactical coordination', 'Intelligence sharing', 'Mission planning', 'Stealth communications']
    },
    {
      title: 'Industrial Sites',
      description: 'Safety communications in areas with poor cellular coverage',
      features: ['Safety protocols', 'Equipment monitoring', 'Emergency procedures', 'Shift coordination']
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Revolutionary Technology
          </Badge>
          <h1 className="section-header">GrahmOS: The OS of Meaning</h1>
          <div className="section-divider mx-auto" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The world's first emergency communication operating system that operates 100% offline 
            with semantic search capabilities and military-grade security.
          </p>
        </div>

        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Revolutionary Architecture</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Unlike traditional emergency systems that fail during network outages, GrahmOS operates 
              with 100% functionality offline through its proprietary semantic mesh architecture.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Offline Functionality</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">1km</div>
                <div className="text-sm text-muted-foreground">Mesh Range</div>
              </div>
            </div>
            <Button className="glow">
              View Technical Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Card className="investor-card h-full flex items-center justify-center bg-gradient-glow">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Layers className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gradient">Semantic Mesh Network</h3>
                <p className="text-muted-foreground">
                  Proprietary technology combining mesh networking with AI-powered semantic understanding
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Core Technology Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="investor-card group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((spec, index) => (
              <Card key={index} className="investor-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-primary">{spec.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {spec.specs.map((item, i) => (
                      <div key={i} className="text-sm text-muted-foreground border-b border-border/30 pb-1">
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Real-World Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="investor-card group hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{useCase.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {useCase.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Differentiator */}
        <Card className="investor-card bg-gradient-glow border-primary/30">
          <CardContent className="p-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Key Differentiator</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Unlike traditional emergency systems that fail during network outages, GrahmOS operates with 
                <span className="text-primary font-semibold"> 100% functionality offline</span> through its 
                proprietary semantic mesh architecture. This is the <span className="text-primary font-semibold">
                only solution</span> that combines offline semantic search with mesh networking.
              </p>
              <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  Zero Network Dependency
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  Semantic Understanding
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  Military-Grade Security
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}