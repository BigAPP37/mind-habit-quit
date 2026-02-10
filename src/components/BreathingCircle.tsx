import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';
type Pattern = '4-4-4-4' | '4-7-8' | '5-5';

const patterns: Record<Pattern, { inhale: number; holdIn: number; exhale: number; holdOut: number }> = {
  '4-4-4-4': { inhale: 4, holdIn: 4, exhale: 4, holdOut: 4 },
  '4-7-8': { inhale: 4, holdIn: 7, exhale: 8, holdOut: 0 },
  '5-5': { inhale: 5, holdIn: 0, exhale: 5, holdOut: 0 },
};

const phaseLabels: Record<Phase, string> = {
  'inhale': 'Inhala',
  'hold-in': 'Mantén',
  'exhale': 'Exhala',
  'hold-out': 'Espera',
};

interface BreathingCircleProps {
  pattern?: Pattern;
  durationSeconds?: number;
  onComplete?: () => void;
  size?: number;
}

/** Generate organic blob path using sine harmonics */
function blobPath(radius: number, cx: number, cy: number, t: number, morph: number): string {
  const points = 120;
  const coords: string[] = [];
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = radius
      + Math.sin(angle * 3 + t * 0.8) * (8 + morph * 6)
      + Math.sin(angle * 5 - t * 1.2) * (4 + morph * 3)
      + Math.cos(angle * 2 + t * 0.5) * (6 + morph * 4);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    coords.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return coords.join(' ') + 'Z';
}

export function BreathingCircle({
  pattern = '4-4-4-4',
  durationSeconds = 60,
  onComplete,
  size = 260,
}: BreathingCircleProps) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [time, setTime] = useState(0);

  const p = patterns[pattern];

  const getPhaseSeconds = useCallback((ph: Phase) => {
    switch (ph) {
      case 'inhale': return p.inhale;
      case 'hold-in': return p.holdIn;
      case 'exhale': return p.exhale;
      case 'hold-out': return p.holdOut;
    }
  }, [p]);

  const getNextPhase = useCallback((ph: Phase): Phase => {
    switch (ph) {
      case 'inhale': return p.holdIn > 0 ? 'hold-in' : 'exhale';
      case 'hold-in': return 'exhale';
      case 'exhale': return p.holdOut > 0 ? 'hold-out' : 'inhale';
      case 'hold-out': return 'inhale';
    }
  }, [p]);

  // Animation frame loop for organic blob morphing
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const tick = () => {
      setTime(t => t + 0.03);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Breathing timer
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      setElapsed(e => {
        if (e + 1 >= durationSeconds) {
          setActive(false);
          onComplete?.();
          return 0;
        }
        return e + 1;
      });
      setCount(c => {
        const phaseLen = getPhaseSeconds(phase);
        if (c + 1 >= phaseLen) {
          const next = getNextPhase(phase);
          setPhase(next);
          if (next === 'inhale') setCycles(cy => cy + 1);
          return 0;
        }
        return c + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [active, phase, getPhaseSeconds, getNextPhase, durationSeconds, onComplete]);

  const start = () => {
    setActive(true);
    setPhase('inhale');
    setCount(0);
    setElapsed(0);
    setCycles(0);
    setTime(0);
  };

  const stop = () => setActive(false);

  // Scale and morph based on breathing phase
  const scale = phase === 'inhale' ? 1 : phase === 'exhale' ? 0.65 : phase === 'hold-in' ? 1 : 0.65;
  const morph = phase === 'inhale' || phase === 'hold-in' ? 1 : 0.3;
  const phaseLen = getPhaseSeconds(phase);
  const remaining = phaseLen - count;

  const cx = size / 2;
  const cy = size / 2;
  const baseRadius = (size / 2) * 0.38;

  const path = useMemo(() => blobPath(baseRadius, cx, cy, time, morph), [baseRadius, cx, cy, time, morph]);

  const phaseColor = phase === 'inhale' || phase === 'hold-in'
    ? 'hsl(160 30% 38%)'
    : 'hsl(180 25% 45%)';

  const glowColor = phase === 'inhale' || phase === 'hold-in'
    ? 'hsl(160 35% 50% / 0.25)'
    : 'hsl(180 25% 50% / 0.15)';

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="cursor-pointer"
          onClick={active ? stop : start}
          aria-label={active ? 'Parar' : 'Empezar respiración'}
        >
          <defs>
            <radialGradient id="blobGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="hsl(160 40% 55%)" stopOpacity="0.9" />
              <stop offset="60%" stopColor={phaseColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(180 25% 35%)" stopOpacity="0.6" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Soft outer glow */}
          {active && (
            <motion.ellipse
              cx={cx}
              cy={cy}
              rx={baseRadius * 1.6}
              ry={baseRadius * 1.6}
              fill="none"
              stroke={glowColor}
              strokeWidth="1.5"
              animate={{
                rx: [baseRadius * 1.5, baseRadius * 1.8, baseRadius * 1.5],
                ry: [baseRadius * 1.5, baseRadius * 1.7, baseRadius * 1.5],
                opacity: [0.3, 0.12, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Main organic blob */}
          <motion.path
            d={path}
            fill="url(#blobGrad)"
            filter="url(#glow)"
            animate={{ scale, opacity: active ? (phase === 'exhale' || phase === 'hold-out' ? 0.7 : 1) : 0.6 }}
            transition={{ duration: phaseLen, ease: 'easeInOut' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Subtle secondary blob layer */}
          {active && (
            <motion.path
              d={blobPath(baseRadius * 0.85, cx, cy, time * 1.3 + 2, morph * 0.7)}
              fill="hsl(160 40% 60% / 0.15)"
              animate={{ scale: scale * 0.95 }}
              transition={{ duration: phaseLen, ease: 'easeInOut' }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          )}
        </svg>

        {/* Text overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          onClick={active ? stop : start}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active ? phase : 'idle'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {active ? (
                <>
                  <p className="text-primary-foreground text-lg font-serif font-semibold drop-shadow-sm">
                    {phaseLabels[phase]}
                  </p>
                  <p className="text-primary-foreground/80 text-3xl font-bold font-serif drop-shadow-sm">
                    {remaining}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground text-sm font-medium">
                  Toca para empezar
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Info */}
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Patrón: {pattern} · {active ? `${Math.floor((durationSeconds - elapsed) / 60)}:${String((durationSeconds - elapsed) % 60).padStart(2, '0')}` : `${Math.floor(durationSeconds / 60)} min`}
        </p>
        {active && cycles > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground"
          >
            {cycles} ciclos completados
          </motion.p>
        )}
      </div>
    </div>
  );
}
