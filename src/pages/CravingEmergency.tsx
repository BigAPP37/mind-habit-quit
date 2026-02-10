import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Droplets, Footprints, Candy, Snowflake, MessageSquare, Check } from 'lucide-react';
import { BreathingCircle } from '@/components/BreathingCircle';
import { useAppState, CravingEvent } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { triggerOptions, emotionOptions } from '@/data/content';

type Stage = 'intro' | 'breathing' | 'urge-surfing' | 'choice' | 'result';

const urgeSurfingSteps = [
  'Nota el ansia. ¿Dónde la sientes? ¿Pecho, garganta, manos?',
  'Dale una intensidad del 1 al 10. No luches contra él.',
  'Observa cómo cambia… sube… llega al pico…',
  'Y empieza a bajar. Como una ola. Tú miras desde la orilla.',
  'Ya pasó el pico. Respira. Lo hiciste.',
];

const quickActions = [
  { icon: Droplets, label: 'Agua', color: 'text-calm' },
  { icon: Footprints, label: 'Caminar 3 min', color: 'text-success' },
  { icon: Candy, label: 'Chicle/menta', color: 'text-accent' },
  { icon: Snowflake, label: 'Agua fría cara', color: 'text-primary' },
  { icon: MessageSquare, label: 'Mensaje a mi yo futuro', color: 'text-primary' },
];

export default function CravingEmergency() {
  const navigate = useNavigate();
  const { addCravingEvent } = useAppState();
  const [stage, setStage] = useState<Stage>('intro');
  const [surfStep, setSurfStep] = useState(0);
  const [intensity, setIntensity] = useState(7);
  const [outcome, setOutcome] = useState<'reduced' | 'smoked' | 'ignored' | null>(null);
  const [trigger, setTrigger] = useState('');
  const [emotion, setEmotion] = useState('');
  const startTime = useState(Date.now())[0];

  const saveEvent = (result: 'reduced' | 'smoked' | 'ignored') => {
    setOutcome(result);
    const event: CravingEvent = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      intensity,
      trigger,
      emotion,
      interventionUsed: stage === 'breathing' ? 'breathing' : 'urge_surfing',
      outcome: result,
      durationSeconds: Math.floor((Date.now() - startTime) / 1000),
    };
    addCravingEvent(event);
    setStage('result');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 pt-4">
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <ArrowLeft size={18} /> Volver
        </button>

        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 pt-8">
              <div className="text-center">
                <h1 className="text-3xl font-serif font-bold text-foreground">El ansia está aquí</h1>
                <p className="text-muted-foreground mt-2">Durará 3-5 minutos. Vamos a pasarla juntos.</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Intensidad: {intensity}/10</label>
                <input
                  type="range" min={1} max={10} value={intensity}
                  onChange={e => setIntensity(Number(e.target.value))}
                  className="w-full mt-2 accent-emergency"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">¿Qué lo disparó?</label>
                <div className="flex flex-wrap gap-2">
                  {triggerOptions.slice(0, 8).map(t => (
                    <button key={t} onClick={() => setTrigger(t)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${trigger === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}
                    >{t}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">¿Cómo te sientes?</label>
                <div className="flex flex-wrap gap-2">
                  {emotionOptions.slice(0, 6).map(e => (
                    <button key={e} onClick={() => setEmotion(e)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${emotion === e ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}
                    >{e}</button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <Button onClick={() => setStage('breathing')} className="w-full rounded-xl h-12 font-semibold">
                  🫁 Respiración guiada (90s)
                </Button>
                <Button onClick={() => { setStage('urge-surfing'); setSurfStep(0); }} variant="outline" className="w-full rounded-xl h-12 font-semibold">
                  🌊 Surfeo de impulsos (90s)
                </Button>
                <Button onClick={() => setStage('choice')} variant="outline" className="w-full rounded-xl h-12">
                  ⚡ Acción rápida
                </Button>
              </div>
            </motion.div>
          )}

          {stage === 'breathing' && (
            <motion.div key="breathing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-12 text-center space-y-6">
              <h2 className="text-xl font-serif font-semibold text-foreground">Respira conmigo</h2>
              <BreathingCircle pattern="4-4-4-4" durationSeconds={90} onComplete={() => setStage('choice')} />
              <p className="text-sm text-muted-foreground">El pico del ansia está pasando...</p>
              <Button variant="ghost" onClick={() => setStage('choice')} className="text-sm">
                Saltar → Acción rápida
              </Button>
            </motion.div>
          )}

          {stage === 'urge-surfing' && (
            <motion.div key="surfing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-12 space-y-8">
              <h2 className="text-xl font-serif font-semibold text-foreground text-center">Surfeo de impulsos</h2>
              <div className="min-h-[120px] flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={surfStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center text-foreground text-lg leading-relaxed"
                  >
                    {urgeSurfingSteps[surfStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex gap-1 justify-center">
                {urgeSurfingSteps.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= surfStep ? 'bg-primary' : 'bg-border'}`} />
                ))}
              </div>
              <Button
                onClick={() => surfStep < urgeSurfingSteps.length - 1 ? setSurfStep(s => s + 1) : setStage('choice')}
                className="w-full rounded-xl h-12"
              >
                {surfStep < urgeSurfingSteps.length - 1 ? 'Siguiente' : 'Continuar'}
              </Button>
            </motion.div>
          )}

          {stage === 'choice' && (
            <motion.div key="choice" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-8 space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-serif font-semibold text-foreground">Elige una acción</h2>
                <p className="text-sm text-muted-foreground mt-1">Algo simple para los próximos 3 minutos</p>
              </div>
              <div className="grid gap-2">
                {quickActions.map(a => (
                  <button key={a.label} className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow text-left">
                    <a.icon size={20} className={a.color} />
                    <span className="text-sm font-medium text-foreground">{a.label}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium text-foreground text-center">¿Cómo fue?</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button onClick={() => saveEvent('reduced')} className="rounded-xl bg-success hover:bg-success/90 text-success-foreground">
                    Bajó 🎉
                  </Button>
                  <Button onClick={() => saveEvent('ignored')} variant="outline" className="rounded-xl">
                    Me distraje
                  </Button>
                  <Button onClick={() => saveEvent('smoked')} variant="outline" className="rounded-xl text-muted-foreground">
                    Fumé
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="pt-16 text-center space-y-6">
              {outcome === 'smoked' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-foreground">Un tropiezo, no un fracaso</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    No has perdido tu progreso. Identifica qué lo causó y prepárate para la próxima vez. Cada intento te hace más fuerte.
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    Disparador: {trigger || 'no identificado'}. Prepara tu regla "Si-Entonces" para esto.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-success/10 mx-auto flex items-center justify-center">
                    <Check size={32} className="text-success" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-foreground">¡Ansia superada!</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    Lo hiciste. El pico pasó y tú sigues aquí, sin fumar. Cada vez se vuelve más fácil.
                  </p>
                </>
              )}
              <Button onClick={() => navigate('/dashboard')} className="rounded-full px-8">
                Volver al inicio
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
