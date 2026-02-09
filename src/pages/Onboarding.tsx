import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState, UserProfile } from '@/hooks/useStore';
import { triggerOptions, reasonOptions } from '@/data/content';

const steps = ['Objetivo', 'Hábito', 'Disparadores', 'Motivos', 'Plan'];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile } = useAppState();
  const [step, setStep] = useState(0);

  const [goalType, setGoalType] = useState<'quit' | 'reduce'>('quit');
  const [cigsPerDay, setCigsPerDay] = useState(10);
  const [dependency, setDependency] = useState<'baja' | 'media' | 'alta'>('media');
  const [triggers, setTriggers] = useState<string[]>([]);
  const [reasons, setReasons] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [quitDate, setQuitDate] = useState('');

  const toggleItem = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  const finish = () => {
    const profile: UserProfile = {
      name: name || 'Usuario',
      goalType,
      quitDate: quitDate || new Date().toISOString().split('T')[0],
      baselineCigsPerDay: cigsPerDay,
      dependencyLevel: dependency,
      mainReasons: reasons,
      triggers,
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    };
    updateProfile(profile);
    // Save to localStorage synchronously before navigating
    const raw = localStorage.getItem('rewire-smoke-data');
    const current = raw ? JSON.parse(raw) : {};
    localStorage.setItem('rewire-smoke-data', JSON.stringify({ ...current, profile }));
    navigate('/dashboard');
  };

  const canNext = () => {
    if (step === 2) return triggers.length > 0;
    if (step === 3) return reasons.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Paso {step + 1} de {steps.length}: {steps[step]}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {step === 0 && (
              <>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">¿Cuál es tu objetivo?</h2>
                  <p className="text-muted-foreground text-sm mt-1">No hay respuesta correcta. Ambas son válidas.</p>
                </div>
                <div className="grid gap-3">
                  {[
                    { value: 'quit' as const, label: 'Dejar de fumar', desc: 'Fijo una fecha y lo dejo.' },
                    { value: 'reduce' as const, label: 'Reducir gradualmente', desc: 'Bajo poco a poco hasta dejarlo.' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setGoalType(opt.value)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        goalType === opt.value
                          ? 'border-primary bg-secondary'
                          : 'border-border bg-card hover:border-primary/30'
                      }`}
                    >
                      <p className="font-semibold text-foreground text-sm">{opt.label}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">Tu hábito actual</h2>
                  <p className="text-muted-foreground text-sm mt-1">Sin juzgar. Solo para calibrar tu plan.</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Tu nombre (opcional)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Cómo te llamamos"
                    className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    maxLength={50}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Cigarrillos al día: {cigsPerDay}</label>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={cigsPerDay}
                    onChange={e => setCigsPerDay(Number(e.target.value))}
                    className="w-full mt-2 accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span><span>60</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Dependencia percibida</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {(['baja', 'media', 'alta'] as const).map(d => (
                      <button
                        key={d}
                        onClick={() => setDependency(d)}
                        className={`py-2 rounded-lg text-sm font-medium border-2 transition-all capitalize ${
                          dependency === d ? 'border-primary bg-secondary text-foreground' : 'border-border bg-card text-muted-foreground'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">¿Cuándo fumas más?</h2>
                  <p className="text-muted-foreground text-sm mt-1">Selecciona todos los que apliquen.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {triggerOptions.map(t => (
                    <button
                      key={t}
                      onClick={() => toggleItem(triggers, t, setTriggers)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        triggers.includes(t)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">¿Por qué quieres dejarlo?</h2>
                  <p className="text-muted-foreground text-sm mt-1">Tus motivos. Tu fuerza.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {reasonOptions.map(r => (
                    <button
                      key={r}
                      onClick={() => toggleItem(reasons, r, setReasons)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        reasons.includes(r)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">
                    {goalType === 'quit' ? 'Elige tu fecha' : 'Tu plan de reducción'}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {goalType === 'quit' ? 'El día que dejas de fumar. Ponla cerca pero realista.' : 'Empezaremos reduciendo gradualmente.'}
                  </p>
                </div>
                {goalType === 'quit' && (
                  <div>
                    <label className="text-sm font-medium text-foreground">Quit date</label>
                    <input
                      type="date"
                      value={quitDate}
                      onChange={e => setQuitDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                )}
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-sm text-foreground font-medium">Tu resumen:</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>Objetivo: {goalType === 'quit' ? 'Dejar de fumar' : 'Reducción gradual'}</li>
                    <li>Cigarrillos/día: {cigsPerDay}</li>
                    <li>Dependencia: {dependency}</li>
                    <li>Disparadores: {triggers.join(', ') || 'Ninguno seleccionado'}</li>
                    <li>Motivos: {reasons.join(', ') || 'Ninguno seleccionado'}</li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tus datos se guardan localmente en tu dispositivo. No compartimos nada.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 flex gap-3 max-w-lg mx-auto w-full">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        )}
        <Button
          onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : finish()}
          disabled={!canNext()}
          className="flex-1 rounded-full font-semibold"
        >
          {step < steps.length - 1 ? (
            <>Siguiente <ArrowRight size={16} className="ml-2" /></>
          ) : (
            <>Empezar <Check size={16} className="ml-2" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
