import { useEffect, useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

type State = 'online' | 'outage' | 'reconnect';

const STATE_DURATION = 8000; // 8 seconds per state
const STATES: State[] = ['online', 'outage', 'reconnect'];

export default function VPoC() {
  const [state, setState] = useState<State>('online');
  const [prefersReduced, setReduced] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Advance to next state
  const advanceState = useCallback(() => {
    setState((current) => {
      const currentIndex = STATES.indexOf(current);
      const nextIndex = (currentIndex + 1) % STATES.length;
      return STATES[nextIndex];
    });
    setProgress(0);
  }, []);

  // Go to previous state
  const previousState = useCallback(() => {
    setState((current) => {
      const currentIndex = STATES.indexOf(current);
      const prevIndex = currentIndex === 0 ? STATES.length - 1 : currentIndex - 1;
      return STATES[prevIndex];
    });
    setProgress(0);
  }, []);

  // Reset to online state
  const resetToOnline = useCallback(() => {
    setState('online');
    setProgress(0);
    setIsPaused(false);
  }, []);

  // Auto-advance effect
  useEffect(() => {
    if (isPaused || prefersReduced) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (STATE_DURATION / 100));
      });
    }, 100);

    const advanceTimer = setTimeout(() => {
      advanceState();
    }, STATE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(advanceTimer);
    };
  }, [state, isPaused, prefersReduced, advanceState]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '1') { setState('online'); setProgress(0); }
      if (e.key === '2') { setState('outage'); setProgress(0); }
      if (e.key === '3') { setState('reconnect'); setProgress(0); }
      if (e.key === ' ') { e.preventDefault(); setIsPaused((p) => !p); }
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

  const stateLabels = useMemo(() => ({
    online: { title: 'Normal Operations | All Systems Connected', subtitle: 'Cloud Sync: Active ✓ | Avg Response: 45ms' },
    outage: { title: 'Internet Outage Detected | Local Mesh Active', subtitle: 'Local Sync: Active ✓ | Cloud Sync: Offline' },
    reconnect: { title: 'Connection Restored | Reconciliation Complete', subtitle: 'Merging offline transactions... Complete ✓' },
  }[state]), [state]);

  // 12 facility nodes in a circular/mesh layout
  const facilities = useMemo(() => [
    { x: 100, y: 160, label: 'Clinic 1' },
    { x: 160, y: 100, label: 'School 1' },
    { x: 240, y: 80, label: 'Clinic 2' },
    { x: 320, y: 100, label: 'Hub 1' },
    { x: 380, y: 160, label: 'Clinic 3' },
    { x: 400, y: 240, label: 'School 2' },
    { x: 360, y: 310, label: 'Clinic 4' },
    { x: 280, y: 340, label: 'Hub 2' },
    { x: 200, y: 320, label: 'Clinic 5' },
    { x: 140, y: 270, label: 'School 3' },
    { x: 100, y: 200, label: 'Clinic 6' },
    { x: 520, y: 200, label: 'Hub 3' },
  ], []);

  // Generate mesh links between nearby nodes
  const meshLinks = useMemo(() => [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
    [10, 0], [1, 3], [3, 5], [5, 7], [7, 9],
    [2, 11], [4, 11], [3, 11],
  ].map(([i, j]) => [facilities[i], facilities[j]]), [facilities]);

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
        {/* Status Banner */}
        <div className="mb-4 text-center">
          <div className={`text-sm font-bold mb-1 ${
            state === 'online' ? 'text-success' :
            state === 'outage' ? 'text-warning' : 'text-primary'
          }`}>
            {stateLabels.title}
          </div>
          <div className="text-xs text-muted-foreground">
            {stateLabels.subtitle}
          </div>
        </div>

        <svg 
          viewBox="0 0 640 420" 
          className="w-full h-auto max-h-[500px]"
          role="img"
          aria-label={`Network visualization showing ${state} state`}
        >
          {/* Cloud */}
          <g opacity={cloudVisible ? 1 : 0.2} className="transition-opacity duration-1000">
            <circle cx="580" cy="60" r="45" fill="currentColor" className="text-primary" opacity="0.15" />
            <circle cx="580" cy="60" r="35" fill="currentColor" className="text-primary" />
            {state === 'reconnect' && !prefersReduced && (
              <circle cx="580" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-success" opacity="0.6">
                <animate attributeName="r" from="35" to="50" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <text 
              x="580" 
              y="68" 
              textAnchor="middle" 
              className="fill-primary-foreground text-sm font-semibold"
            >
              Cloud
            </text>
            {state === 'reconnect' && (
              <text x="580" y="100" textAnchor="middle" className="fill-success text-[10px] font-bold">✓</text>
            )}
          </g>

          {/* Mesh links (peer-to-peer connections) */}
          {meshLinks.map(([n1, n2], i) => {
            const opacity = state === 'outage' ? 0.8 : 0.4;
            const strokeColor = state === 'outage' ? 'text-warning' : 
                               state === 'reconnect' ? 'text-primary' : 'text-success';
            
            return (
              <line
                key={`mesh-${i}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke="currentColor"
                className={strokeColor}
                strokeWidth={state === 'outage' ? 3 : 2}
                opacity={opacity}
                strokeDasharray={state === 'reconnect' && !prefersReduced ? '6 4' : '0'}
              >
                {!prefersReduced && state === 'outage' && (
                  <animate
                    attributeName="opacity"
                    values={`${opacity};${opacity * 0.5};${opacity}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                )}
              </line>
            );
          })}

          {/* Cloud links (from hub nodes to cloud) */}
          {[facilities[3], facilities[7], facilities[11]].map((facility, i) => (
            <line
              key={`cloud-link-${i}`}
              x1={facility.x}
              y1={facility.y}
              x2={580}
              y2={60}
              stroke="currentColor"
              className="text-primary"
              strokeWidth={3}
              opacity={cloudVisible ? 0.7 : 0.1}
              strokeDasharray={state === 'online' && !prefersReduced ? '8 6' : state === 'outage' ? '4 4' : '0'}
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

          {/* Local facility nodes */}
          {facilities.map(({ x, y, label }, i) => {
            const isHub = label.includes('Hub');
            return (
              <g key={i}>
                <circle 
                  cx={x} 
                  cy={y} 
                  r="22" 
                  fill="currentColor" 
                  className="text-success" 
                  opacity="0.15" 
                />
                <circle 
                  cx={x} 
                  cy={y} 
                  r="18" 
                  fill="currentColor" 
                  className={isHub ? 'text-primary' : 'text-success'}
                >
                  {!prefersReduced && state === 'online' && isHub && (
                    <animate
                      attributeName="opacity"
                      values="1;0.6;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                {state === 'outage' && !prefersReduced && (
                  <circle cx={x} cy={y} r="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-warning" opacity="0.4">
                    <animate attributeName="r" from="18" to="28" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <text 
                  x={x} 
                  y={y + 5} 
                  textAnchor="middle" 
                  className="fill-success-foreground text-xs font-bold"
                >
                  {i + 1}
                </text>
                <text 
                  x={x} 
                  y={y + 38} 
                  textAnchor="middle" 
                  className="fill-muted-foreground text-[10px]"
                >
                  {label}
                </text>
              </g>
            );
          })}
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

        {/* Control Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={previousState}
              className="p-2 rounded-lg bg-background hover:bg-primary/10 border border-border transition-colors"
              aria-label="Previous state"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-lg bg-background hover:bg-primary/10 border border-border transition-colors"
              aria-label={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button
              onClick={advanceState}
              className="p-2 rounded-lg bg-background hover:bg-primary/10 border border-border transition-colors"
              aria-label="Next state"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={resetToOnline}
              className="p-2 rounded-lg bg-background hover:bg-primary/10 border border-border transition-colors"
              aria-label="Reset to online"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium ${
                state === 'online' ? 'text-success' :
                state === 'outage' ? 'text-warning' : 'text-primary'
              }`}>
                {state === 'online' ? '● Online' :
                 state === 'outage' ? '● Outage' : '● Reconnect'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ${
                  state === 'online' ? 'bg-success' :
                  state === 'outage' ? 'bg-warning' : 'bg-primary'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Press <kbd className="px-1.5 py-0.5 bg-background rounded text-foreground text-[10px]">Space</kbd> to pause
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="mt-4 text-xs text-muted-foreground text-center md:text-left">
          💡 Keyboard shortcuts: <kbd className="px-2 py-1 bg-muted rounded text-foreground">1</kbd>,{' '}
          <kbd className="px-2 py-1 bg-muted rounded text-foreground">2</kbd>,{' '}
          <kbd className="px-2 py-1 bg-muted rounded text-foreground">3</kbd> to jump to states
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
