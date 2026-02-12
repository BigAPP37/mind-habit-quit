import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useAppState, DailyCheckin } from '@/hooks/useStore';
import { triggerOptions } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, Sparkles, Loader2, Bot } from 'lucide-react';
import { toast } from 'sonner';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diary-therapist`;

export default function Diary() {
  const { state, addCheckin, daysSinceQuit } = useAppState();
  const today = new Date().toISOString().split('T')[0];
  const todayCheckin = state.checkins.find(c => c.date === today);

  const [smoked, setSmoked] = useState(todayCheckin?.smoked ?? false);
  const [cigsCount, setCigsCount] = useState(todayCheckin?.cigsCount ?? 0);
  const [cravingAvg, setCravingAvg] = useState(todayCheckin?.cravingAvg ?? 5);
  const [stress, setStress] = useState(todayCheckin?.stress ?? 5);
  const [mood, setMood] = useState(todayCheckin?.mood ?? 5);
  const [sleep, setSleep] = useState(todayCheckin?.sleep ?? 5);
  const [topTrigger, setTopTrigger] = useState(todayCheckin?.topTrigger ?? '');
  const [notes, setNotes] = useState(todayCheckin?.notes ?? '');
  const [saved, setSaved] = useState(!!todayCheckin);

  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

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
      notes,
    };
    addCheckin(checkin);
    setSaved(true);
    setViewMode('history');
  };

  const askTherapist = useCallback(async () => {
    if (!notes.trim() || notes.trim().length < 10) {
      toast.error('Escribe al menos unas palabras sobre cómo te sientes.');
      return;
    }
    setAiLoading(true);
    setAiResponse('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) {
        toast.error('Debes iniciar sesión para usar esta función.');
        setAiLoading(false);
        return;
      }

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          journalEntry: notes,
          context: { daysSinceQuit, cravingAvg, mood, stress },
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || 'Error al conectar con el terapeuta IA');
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error('No stream');
      const decoder = new TextDecoder();
      let buffer = '';
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              full += content;
              setAiResponse(full);
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Error al obtener respuesta');
    } finally {
      setAiLoading(false);
    }
  }, [notes, daysSinceQuit, cravingAvg, mood, stress]);

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
        className="w-full mt-1 accent-primary h-2" />
    </div>
  );

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pt-4 sm:pt-6 pb-4 space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground">Diario</h1>
          <div className="flex gap-1">
            <button onClick={() => setViewMode('checkin')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium min-h-[36px] ${viewMode === 'checkin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
            >Registro</button>
            <button onClick={() => setViewMode('history')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium min-h-[36px] ${viewMode === 'history' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
            >Historial</button>
          </div>
        </div>

        {viewMode === 'checkin' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 sm:space-y-5">
            <p className="text-sm text-muted-foreground">Registro rápido del día · {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>

            {/* Smoked? */}
            <div className="flex gap-2.5 sm:gap-3">
              <button onClick={() => { setSmoked(false); setCigsCount(0); }}
                className={`flex-1 p-3 rounded-xl border-2 text-center text-sm font-medium transition-all min-h-[52px] ${!smoked ? 'border-success bg-success/10 text-success' : 'border-border text-muted-foreground'}`}
              >🎉 No fumé</button>
              <button onClick={() => setSmoked(true)}
                className={`flex-1 p-3 rounded-xl border-2 text-center text-sm font-medium transition-all min-h-[52px] ${smoked ? 'border-emergency bg-emergency/10 text-emergency' : 'border-border text-muted-foreground'}`}
              >Fumé</button>
            </div>

            {smoked && (
              <div>
                <label className="text-sm font-medium text-foreground">¿Cuántos? {cigsCount}</label>
                <input type="range" min={1} max={40} value={cigsCount} onChange={e => setCigsCount(Number(e.target.value))}
                  className="w-full mt-1 accent-emergency h-2" />
              </div>
            )}

            <SliderRow label="Ansia promedio" value={cravingAvg} onChange={setCravingAvg} emoji="🔥" />
            <SliderRow label="Estrés" value={stress} onChange={setStress} emoji="😰" />
            <SliderRow label="Ánimo" value={mood} onChange={setMood} emoji="😊" />
            <SliderRow label="Sueño" value={sleep} onChange={setSleep} emoji="😴" />

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Disparador principal</label>
              <div className="flex flex-wrap gap-2">
                {triggerOptions.slice(0, 8).map(t => (
                  <button key={t} onClick={() => setTopTrigger(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all min-h-[36px] ${topTrigger === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}
                  >{t}</button>
                ))}
              </div>
            </div>

            {/* Journal */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                ✍️ ¿Cómo te sientes hoy?
              </label>
              <Textarea
                placeholder="Escribe lo que quieras… cómo te sientes, qué te preocupa, cualquier pensamiento…"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="min-h-[100px] sm:min-h-[120px] rounded-xl border-border bg-card text-foreground placeholder:text-muted-foreground/60 resize-none text-sm"
              />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">{notes.length} car.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={askTherapist}
                  disabled={aiLoading || notes.trim().length < 10}
                  className="rounded-full gap-2 border-primary/30 text-primary hover:bg-primary/10 h-10"
                >
                  {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Orientación
                </Button>
              </div>
            </div>

            {/* AI Response */}
            <AnimatePresence>
              {(aiResponse || aiLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-3.5 sm:p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Bot size={16} />
                    Tu terapeuta IA
                  </div>
                  {aiLoading && !aiResponse && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 size={14} className="animate-spin" /> Analizando…
                    </div>
                  )}
                  {aiResponse && (
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <Button onClick={save} className="w-full rounded-xl h-12 font-semibold">
              <Check size={18} className="mr-2" /> Guardar registro
            </Button>
          </motion.div>
        )}

        {viewMode === 'history' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {last7.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">Aún no hay registros.</p>
                <Button onClick={() => setViewMode('checkin')} variant="outline" className="mt-4 rounded-full">
                  Hacer mi primer registro
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
                  <div className="flex gap-3 sm:gap-4 mt-2 text-xs text-muted-foreground">
                    <span>🔥 {c.cravingAvg}</span>
                    <span>😰 {c.stress}</span>
                    <span>😊 {c.mood}</span>
                    <span>😴 {c.sleep}</span>
                  </div>
                  {c.topTrigger && <p className="text-xs text-muted-foreground mt-1">Disparador: {c.topTrigger}</p>}
                  {c.notes && (
                    <p className="text-xs text-muted-foreground mt-2 italic border-t border-border pt-2">
                      "{c.notes.length > 100 ? c.notes.slice(0, 100) + '…' : c.notes}"
                    </p>
                  )}
                </div>
              ))
            )}

            {last7.length > 1 && (
              <div className="p-4 rounded-xl bg-card shadow-card">
                <p className="text-xs font-medium text-muted-foreground mb-3">Ansia últimos días</p>
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
