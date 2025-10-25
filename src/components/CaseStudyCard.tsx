import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
  type: 'percentage' | 'time' | 'count' | 'cost';
}

interface Results {
  summary: string;
  details: string[];
}

interface CaseStudyCardProps {
  id: string;
  industry: string;
  region: string;
  partner: string;
  challenge: string;
  solution: string;
  results: Results;
  metrics: Metric[];
  quote: string;
  quoteAttribution: string;
  ctaLink: string;
}

export default function CaseStudyCard({
  industry,
  region,
  partner,
  challenge,
  solution,
  results,
  metrics,
  quote,
  quoteAttribution,
  ctaLink,
}: CaseStudyCardProps) {
  const [expanded, setExpanded] = useState(false);

  const industryColors = {
    Healthcare: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400',
    Education: 'bg-purple-500/10 text-purple-600 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400',
    Commerce: 'bg-green-500/10 text-green-600 border-green-500/30 dark:bg-green-500/20 dark:text-green-400',
  };

  const metricColors = {
    percentage: 'text-success',
    time: 'text-primary',
    count: 'text-success',
    cost: 'text-success',
  };

  return (
    <Card 
      className="investor-card group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      itemScope 
      itemType="https://schema.org/Article"
    >
      <CardContent className="p-6 md:p-8">
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={`${industryColors[industry as keyof typeof industryColors]} font-semibold`}>
              {industry}
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              {region}
            </Badge>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors" itemProp="headline">
            {partner}
          </h3>
        </header>

        {/* Challenge Section */}
        <section className="mb-4 p-4 bg-destructive/5 border-l-4 border-destructive rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚠️</span>
            <h4 className="text-sm font-bold uppercase tracking-wide text-destructive">Challenge</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{challenge}</p>
        </section>

        {/* Solution Section */}
        <section className="mb-4 p-4 bg-primary/5 border-l-4 border-primary rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚙️</span>
            <h4 className="text-sm font-bold uppercase tracking-wide text-primary">Solution</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{solution}</p>
        </section>

        {/* Results Section */}
        <section className="mb-6 p-4 bg-success/5 border-l-4 border-success rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📊</span>
            <h4 className="text-sm font-bold uppercase tracking-wide text-success">Results</h4>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {metrics.map((metric, idx) => (
              <div 
                key={idx} 
                className="bg-background rounded-lg p-3 text-center border border-border hover:border-success/50 transition-colors"
              >
                <div className={`text-2xl md:text-3xl font-bold ${metricColors[metric.type]} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Details */}
          {results.details && results.details.length > 0 && (
            <>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-2"
                aria-expanded={expanded}
              >
                {expanded ? 'Show Less' : 'Show More Results'}
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expanded && (
                <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
                  <ul className="space-y-2">
                    {results.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-success font-bold mt-0.5">✓</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>

        {/* Quote Section */}
        {quote && (
          <blockquote 
            className="relative mb-6 p-5 rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-purple-500/20 border-l-4 border-primary overflow-hidden"
            itemProp="citation"
          >
            {/* Decorative quote mark */}
            <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif leading-none select-none">
              "
            </span>
            
            <p className="relative text-sm md:text-base italic text-foreground leading-relaxed mb-3 pl-6">
              "{quote}"
            </p>
            
            <footer className="text-xs md:text-sm font-semibold text-primary not-italic">
              — {quoteAttribution}
            </footer>
          </blockquote>
        )}

        {/* CTA Footer */}
        <footer className="pt-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-all" 
            asChild
          >
            <a href={ctaLink} className="flex items-center justify-center gap-2">
              Read Full Case Study
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </a>
          </Button>
        </footer>
      </CardContent>
    </Card>
  );
}
