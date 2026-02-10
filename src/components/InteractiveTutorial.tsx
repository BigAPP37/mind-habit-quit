import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Flame, BookOpen, CalendarDays, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tutorialSteps = [
  {
    icon: Flame,
    title: '¡Bienvenido a Rewire Smoke!',
    description: 'Tu sistema diario para dejar de fumar, basado en ciencia. Te guiaremos por las funciones principales.',
    target: null,
  },
  {
    icon: Flame,
    title: 'Botón de emergencia',
    description: 'Cuando tengas ganas de fumar, pulsa este botón. Te dará una intervención inmediata con respiración guiada y técnicas de urge surfing.',
    target: '[data-tutorial="emergency"]',
  },
  {
    icon: BarChart3,
    title: 'Tu progreso',
    description: 'Aquí verás tus estadísticas: días sin fumar, dinero ahorrado, cigarrillos evitados y ejemplos de lo que puedes comprar con tu ahorro.',
    target: '[data-tutorial="stats"]',
  },
  {
    icon: BookOpen,
    title: 'Sesiones guiadas',
    description: 'Respiración, meditación, urge surfing y reprogramación mental. Sesiones de 1 a 10 minutos con audio guiado y música ambiental.',
    target: null,
  },
  {
    icon: CalendarDays,
    title: 'Diario emocional',
    description: 'Registra cada día cómo te sientes: estado de ánimo, estrés, sueño y cravings. Esto te ayuda a identificar patrones.',
    target: null,
  },
  {
    icon: Target,
    title: 'Tu plan personalizado',
    description: 'Configura reglas si-entonces para tus disparadores. Cuando sientas X, haz Y. La ciencia lo llama "implementation intentions" y duplica las probabilidades de éxito.',
    target: null,
  },
];

interface Props {
  onComplete: () => void;
}

export function InteractiveTutorial({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [highlight, setHighlight] = useState<DOMRect | null>(null);
  const current = tutorialSteps[step];

  useEffect(() => {
    if (current.target) {
      const el = document.querySelector(current.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        setHighlight(rect);
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setHighlight(null);
      }
    } else {
      setHighlight(null);
    }
  }, [step, current.target]);

  const next = useCallback(() => {
    if (step < tutorialSteps.length - 1) {
      setStep(s => s + 1);
    } else {
      onComplete();
    }
  }, [step, onComplete]);

  const Icon = current.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/60" onClick={next} />

        {/* Highlight cutout */}
        {highlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute rounded-2xl ring-4 ring-primary/50 z-[101]"
            style={{
              top: highlight.top - 6,
              left: highlight.left - 6,
              width: highlight.width + 12,
              height: highlight.height + 12,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
            }}
          />
        )}

        {/* Tooltip card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute z-[102] left-4 right-4 mx-auto max-w-sm"
          style={{
            top: highlight ? Math.min(highlight.bottom + 16, window.innerHeight - 220) : '50%',
            transform: highlight ? undefined : 'translateY(-50%)',
          }}
        >
          <div className="bg-card rounded-2xl shadow-elevated p-5 border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{step + 1}/{tutorialSteps.length}</span>
              </div>
              <button onClick={onComplete} className="text-muted-foreground hover:text-foreground p-1">
                <X size={16} />
              </button>
            </div>
            <h3 className="font-serif font-bold text-foreground">{current.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{current.description}</p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-1">
                {tutorialSteps.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= step ? 'bg-primary' : 'bg-border'}`} />
                ))}
              </div>
              <Button size="sm" onClick={next} className="rounded-full text-xs">
                {step < tutorialSteps.length - 1 ? (
                  <>Siguiente <ArrowRight size={12} className="ml-1" /></>
                ) : 'Empezar'}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
