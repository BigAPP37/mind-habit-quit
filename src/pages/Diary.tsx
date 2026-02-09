import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useAppState, DailyCheckin } from '@/hooks/useStore';
import { triggerOptions, emotionOptions } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Diary() {
  const { state, addCheckin } = useAppState();
  const today = new Date().toISOString().split('T')[0];
  const todayCheckin = state.checkins.find(c => c.date === today);

  const [smoked, setSmoked] = useState(todayCheckin?.smoked ?? false);
  const [cigsCount, setCigsCount] = useState(todayCheckin?.cigsCount ?? 0);
  const [cravingAvg, setCravingAvg] = useState(todayCheckin?.cravingAvg ?? 5);
  const [stress, setStress] = useState(todayCheckin?.stress ?? 5);
  const [mood, setMood] = useState(todayCheckin?.mood ?? 5);
  const [sleep, setSleep] = useState(todayCheckin?.sleep ?? 5);
  const [topTrigger, setTopTrigger] = useState(todayCheckin?.topTrigger ?? '');
  const [saved, setSaved] = useState(!!todayCheckin);

  // History view
  const [viewMode, setViewMode] = useState<'checkin' | 'history'>(todayCheckin ? 'history' : 'checkin');

  const save = () => {
    const checkin: DailyCheckin = {
      date: today,
      smoked,
      cigsCount: smoked ? cigsCount : 0,
      cravingAvg,
      stress,
      mood,
      sleep,
      topTrigger,
      notes: '',
    };
    addCheckin(checkin);
    setSaved(true);
    setViewMode('history');
  };

  const last7 = state.checkins
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7);

  const SliderRow = ({ label, value, onChange, emoji }: { label: string; value: number; onChange: (v: number) => void; emoji: string }) => (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground">{emoji} {value}/10</span>
      </div>
      <input type="range" min={0} max={10} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full mt-1 accent-primary" />
    </div>
  );

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-foreground">Diario</h1>
          <div className="flex gap-1">
            <button onClick={() => setViewMode('checkin')}
              className={`px-3 py-1 rounded-md text-xs font-medium ${viewMode === 'checkin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
            >Check-in</button>
            <button onClick={() => setViewMode('history')}
              className={`px-3 py-1 rounded-md text-xs font-medium ${viewMode === 'history' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
            >Historial</button>
          </div>
        </div>

        {viewMode === 'checkin' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <p className="text-sm text-muted-foreground">Check-in rápido del día · {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>

            {/* Smoked? */}
            <div className="flex gap-3">
              <button onClick={() => { setSmoked(false); setCigsCount(0); }}
                className={`flex-1 p-3 rounded-xl border-2 text-center text-sm font-medium transition-all ${!smoked ? 'border-success bg-success/10 text-success' : 'border-border text-muted-foreground'}`}
              >🎉 No fumé</button>
              <button onClick={() => setSmoked(true)}
                className={`flex-1 p-3 rounded-xl border-2 text-center text-sm font-medium transition-all ${smoked ? 'border-emergency bg-emergency/10 text-emergency' : 'border-border text-muted-foreground'}`}
              >Fumé</button>
            </div>

            {smoked && (
              <div>
                <label className="text-sm font-medium text-foreground">¿Cuántos? {cigsCount}</label>
                <input type="range" min={1} max={40} value={cigsCount} onChange={e => setCigsCount(Number(e.target.value))}
                  className="w-full mt-1 accent-emergency" />
              </div>
            )}

            <SliderRow label="Craving promedio" value={cravingAvg} onChange={setCravingAvg} emoji="🔥" />
            <SliderRow label="Estrés" value={stress} onChange={setStress} emoji="😰" />
            <SliderRow label="Ánimo" value={mood} onChange={setMood} emoji="😊" />
            <SliderRow label="Sueño" value={sleep} onChange={setSleep} emoji="😴" />

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Disparador principal</label>
              <div className="flex flex-wrap gap-2">
                {triggerOptions.slice(0, 8).map(t => (
                  <button key={t} onClick={() => setTopTrigger(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${topTrigger === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}
                  >{t}</button>
                ))}
              </div>
            </div>

            <Button onClick={save} className="w-full rounded-xl h-12 font-semibold">
              <Check size={18} className="mr-2" /> Guardar check-in
            </Button>
          </motion.div>
        )}

        {viewMode === 'history' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {last7.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">Aún no hay registros.</p>
                <Button onClick={() => setViewMode('checkin')} variant="outline" className="mt-4 rounded-full">
                  Hacer mi primer check-in
                </Button>
              </div>
            ) : (
              last7.map(c => (
                <div key={c.date} className="p-3 rounded-xl bg-card shadow-card">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-foreground">
                      {new Date(c.date + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.smoked ? 'bg-emergency/10 text-emergency' : 'bg-success/10 text-success'}`}>
                      {c.smoked ? `${c.cigsCount} cig` : 'Sin fumar ✓'}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>🔥 {c.cravingAvg}</span>
                    <span>😰 {c.stress}</span>
                    <span>😊 {c.mood}</span>
                    <span>😴 {c.sleep}</span>
                  </div>
                  {c.topTrigger && <p className="text-xs text-muted-foreground mt-1">Disparador: {c.topTrigger}</p>}
                </div>
              ))
            )}

            {/* Simple bar chart */}
            {last7.length > 1 && (
              <div className="p-4 rounded-xl bg-card shadow-card">
                <p className="text-xs font-medium text-muted-foreground mb-3">Craving últimos días</p>
                <div className="flex items-end gap-1 h-20">
                  {[...last7].reverse().map(c => (
                    <div key={c.date} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm bg-primary/70 min-h-[2px] transition-all"
                        style={{ height: `${(c.cravingAvg / 10) * 100}%` }}
                      />
                      <span className="text-[9px] text-muted-foreground">
                        {new Date(c.date + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
