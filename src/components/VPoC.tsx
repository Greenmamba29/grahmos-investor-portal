import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

type State = 'online' | 'outage' | 'reconnect';

export default function VPoC() {
  const [state, setState] = useState<State>('online');
  const [prefersReduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '1') setState('online');
      if (e.key === '2') setState('outage');
      if (e.key === '3') setState('reconnect');
    };
    
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const cloudVisible = useMemo(() => state !== 'outage', [state]);
  
  const status = useMemo(() => ({
    online: 'Online: cloud + mesh syncing normally',
    outage: 'Outage: cloud links severed; local mesh serving requests',
    reconnect: 'Reconnect: diff syncing; converging to latest state',
  }[state]), [state]);

  return (
    <section 
      id="how-it-works" 
      className="bg-card/50 backdrop-blur-sm text-foreground rounded-3xl p-6 md:p-8 lg:p-12 border border-border"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">How GrahmOS Works</h2>
          <p className="text-muted-foreground text-lg">
            Visual proof: GrahmOS remains functional during outages and cleanly resyncs after.
          </p>
        </div>
        
        {/* State Toggle */}
        <div 
          className="inline-flex rounded-xl bg-muted p-1 w-full lg:w-auto" 
          role="tablist" 
          aria-label="Network states"
        >
          {(['online', 'outage', 'reconnect'] as State[]).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={state === s}
              onClick={() => setState(s)}
              className={`flex-1 lg:flex-initial px-4 py-3 rounded-lg capitalize text-sm font-medium transition-all duration-200 ${
                state === s
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Screen reader announcement */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status}
      </p>

      {/* Visualization */}
      <div className="bg-background/80 rounded-2xl p-6 md:p-8 border border-border/50">
        <svg 
          viewBox="0 0 700 320" 
          className="w-full h-auto max-h-[400px]"
          role="img"
          aria-label={`Network visualization showing ${state} state`}
        >
          {/* Cloud */}
          <g opacity={cloudVisible ? 1 : 0.15} className="transition-opacity duration-500">
            <circle cx="600" cy="80" r="40" fill="currentColor" className="text-primary" opacity="0.2" />
            <circle cx="600" cy="80" r="32" fill="currentColor" className="text-primary" />
            <text 
              x="600" 
              y="88" 
              textAnchor="middle" 
              className="fill-primary-foreground text-sm font-semibold"
            >
              Cloud
            </text>
          </g>

          {/* Local nodes (healthcare facilities / schools) */}
          {[
            { x: 120, y: 240, label: 'Clinic A' },
            { x: 220, y: 180, label: 'Clinic B' },
            { x: 300, y: 260, label: 'School' },
            { x: 400, y: 200, label: 'Clinic C' },
            { x: 480, y: 250, label: 'Hub' },
          ].map(({ x, y, label }, i) => (
            <g key={i}>
              <circle 
                cx={x} 
                cy={y} 
                r="20" 
                fill="currentColor" 
                className="text-success" 
                opacity="0.2" 
              />
              <circle 
                cx={x} 
                cy={y} 
                r="16" 
                fill="currentColor" 
                className="text-success"
              />
              <text 
                x={x} 
                y={y + 5} 
                textAnchor="middle" 
                className="fill-success-foreground text-xs font-medium"
              >
                {i + 1}
              </text>
              <text 
                x={x} 
                y={y + 40} 
                textAnchor="middle" 
                className="fill-muted-foreground text-xs"
              >
                {label}
              </text>
            </g>
          ))}

          {/* Mesh links (local peer-to-peer) */}
          {[
            [120, 240, 220, 180],
            [220, 180, 300, 260],
            [300, 260, 400, 200],
            [400, 200, 480, 250],
            [220, 180, 400, 200],
            [120, 240, 300, 260],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              className="text-success"
              strokeWidth={3}
              opacity={0.6}
              strokeDasharray={state === 'reconnect' && !prefersReduced ? '6 4' : '0'}
            >
              {!prefersReduced && state === 'online' && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          ))}

          {/* Cloud links (from hub nodes to cloud) */}
          {[
            [400, 200],
            [480, 250],
          ].map(([x, y], i) => (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={600}
              y2={80}
              stroke="currentColor"
              className="text-primary"
              strokeWidth={3}
              opacity={cloudVisible ? 0.6 : 0.1}
              strokeDasharray={state === 'online' && !prefersReduced ? '8 6' : '0'}
            >
              {!prefersReduced && state === 'reconnect' && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="28"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          ))}

          {/* Status indicator */}
          <g transform="translate(50, 40)">
            <rect 
              width="200" 
              height="60" 
              rx="8" 
              fill="currentColor" 
              className={
                state === 'online' 
                  ? 'text-success/20' 
                  : state === 'outage' 
                  ? 'text-warning/20' 
                  : 'text-primary/20'
              }
            />
            <text 
              x="100" 
              y="30" 
              textAnchor="middle" 
              className={`text-xs font-semibold ${
                state === 'online' 
                  ? 'fill-success' 
                  : state === 'outage' 
                  ? 'fill-warning' 
                  : 'fill-primary'
              }`}
            >
              {state === 'online' && 'Mesh + Cloud Active'}
              {state === 'outage' && 'Mesh Only - Offline'}
              {state === 'reconnect' && 'Syncing Changes'}
            </text>
            <text 
              x="100" 
              y="48" 
              textAnchor="middle" 
              className="fill-muted-foreground text-[10px]"
            >
              {state === 'online' && 'Normal Operation'}
              {state === 'outage' && 'Zero Data Loss'}
              {state === 'reconnect' && 'Conflict-Free Merge'}
            </text>
          </g>
        </svg>

        {/* State description */}
        <div className="mt-6 p-4 bg-card rounded-lg border border-border">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {state === 'online' && (
              <>
                <span className="font-semibold text-success">Online:</span> Cloud and mesh networks are 
                healthy. Periodic sync pulses keep all directories updated. Data flows seamlessly between 
                local nodes and cloud infrastructure.
              </>
            )}
            {state === 'outage' && (
              <>
                <span className="font-semibold text-warning">Outage:</span> External links are down. 
                Local mesh network continues operating independently. Data is served from local directories 
                with conflict-free writes. <span className="text-foreground font-medium">Zero service interruption.</span>
              </>
            )}
            {state === 'reconnect' && (
              <>
                <span className="font-semibold text-primary">Reconnect:</span> Network restored. Backlog 
                diffs are syncing. All nodes converge deterministically using CRDT-based conflict resolution. 
                <span className="text-foreground font-medium"> Complete data integrity maintained.</span>
              </>
            )}
          </p>
        </div>

        {/* Keyboard hint */}
        <div className="mt-4 text-xs text-muted-foreground text-center md:text-left">
          💡 Pro tip: Press <kbd className="px-2 py-1 bg-muted rounded text-foreground">1</kbd>,{' '}
          <kbd className="px-2 py-1 bg-muted rounded text-foreground">2</kbd>, or{' '}
          <kbd className="px-2 py-1 bg-muted rounded text-foreground">3</kbd> to toggle states
        </div>
      </div>

      {/* Contextual CTAs */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" asChild className="w-full">
          <a href="/partners">
            <span className="mr-2">🤝</span> For Partners: Explore Deployments
          </a>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <a href="#investor-narrative">
            <span className="mr-2">📊</span> For Investors: View Business Case
          </a>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <a href="/technology">
            <span className="mr-2">🔧</span> For Developers: See SDK
          </a>
        </Button>
      </div>
    </section>
  );
}
