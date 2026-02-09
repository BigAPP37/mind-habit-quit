import { useState, useEffect, useCallback } from 'react';
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

export function BreathingCircle({
  pattern = '4-4-4-4',
  durationSeconds = 60,
  onComplete,
  size = 220,
}: BreathingCircleProps) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);

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
  };

  const stop = () => {
    setActive(false);
  };

  const scale = phase === 'inhale' ? 1 : phase === 'exhale' ? 0.6 : phase === 'hold-in' ? 1 : 0.6;
  const phaseLen = getPhaseSeconds(phase);
  const remaining = phaseLen - count;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />

        {/* Animated circle */}
        <motion.div
          className="absolute inset-4 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gradient-calm)' }}
          animate={active ? { scale, opacity: phase === 'exhale' || phase === 'hold-out' ? 0.6 : 1 } : { scale: 0.8, opacity: 0.5 }}
          transition={{ duration: phaseLen, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active ? phase : 'idle'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center"
            >
              {active ? (
                <>
                  <p className="text-primary-foreground text-lg font-serif font-semibold">
                    {phaseLabels[phase]}
                  </p>
                  <p className="text-primary-foreground/80 text-3xl font-bold font-serif">
                    {remaining}
                  </p>
                </>
              ) : (
                <p className="text-primary-foreground/90 text-sm font-medium">
                  Toca para empezar
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pulse rings when active */}
        {active && (
          <motion.div
            className="absolute inset-2 rounded-full border border-primary/30"
            animate={{ scale: [1, 1.2, 1.4], opacity: [0.3, 0.1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Click target */}
        <button
          onClick={active ? stop : start}
          className="absolute inset-0 rounded-full cursor-pointer z-10"
          aria-label={active ? 'Parar' : 'Empezar respiración'}
        />
      </div>

      {/* Info */}
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Patrón: {pattern} · {active ? `${Math.floor((durationSeconds - elapsed) / 60)}:${String((durationSeconds - elapsed) % 60).padStart(2, '0')}` : `${Math.floor(durationSeconds / 60)} min`}
        </p>
        {active && cycles > 0 && (
          <p className="text-xs text-muted-foreground">{cycles} ciclos completados</p>
        )}
      </div>
    </div>
  );
}
