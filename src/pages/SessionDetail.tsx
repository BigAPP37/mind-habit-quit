import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Check, Wind, Volume2, Square, Loader2 } from 'lucide-react';
import { allSessions } from '@/data/content';
import { useAppState } from '@/hooks/useStore';
import { BreathingCircle } from '@/components/BreathingCircle';
import { Button } from '@/components/ui/button';
import { useSessionAudio } from '@/hooks/useSessionAudio';

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addSessionCompletion } = useAppState();
  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const { play, stop, isLoading: audioLoading, isPlaying, cleanup } = useSessionAudio();

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const session = allSessions.find(s => s.id === id);
  if (!session) return <div className="p-8 text-center text-muted-foreground">Sesión no encontrada.</div>;

  const isBreathing = session.type === 'breathing';
  const pattern = session.title.includes('4-4-4-4') ? '4-4-4-4' as const :
                  session.title.includes('4-7-8') ? '4-7-8' as const :
                  '5-5' as const;

  const handleComplete = () => {
    setCompleted(true);
  };

  const handleRate = (r: number) => {
    setRating(r);
    addSessionCompletion({
      id: Date.now().toString(),
      sessionId: session.id,
      timestamp: new Date().toISOString(),
      rating: r,
      notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
          <ArrowLeft size={18} /> Volver
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <p className="text-xs text-primary font-medium uppercase tracking-wide">{session.type === 'breathing' ? 'Respiración' : session.type === 'mindfulness' ? 'Mindfulness' : session.type === 'urge_surfing' ? 'Urge Surfing' : 'Reprogramación'} · {session.durationMinutes} min</p>
            <h1 className="text-2xl font-serif font-bold text-foreground mt-1">{session.title}</h1>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {session.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">{t}</span>
              ))}
            </div>
          </div>

          {/* Breathing animation for breathing sessions */}
          {isBreathing && !completed && (
            <div className="py-4">
              <BreathingCircle
                pattern={pattern}
                durationSeconds={session.durationMinutes * 60}
                onComplete={handleComplete}
              />
            </div>
          )}

          {/* Script text + audio button */}
          <div className="p-5 rounded-xl bg-card shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Guión de la sesión</p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2"
                onClick={() => isPlaying ? stop() : play(session.scriptText)}
                disabled={audioLoading}
              >
                {audioLoading ? (
                  <><Loader2 size={14} className="animate-spin" /> Generando...</>
                ) : isPlaying ? (
                  <><Square size={14} /> Parar audio</>
                ) : (
                  <><Volume2 size={14} /> Escuchar</>
                )}
              </Button>
            </div>
            <p className="text-foreground leading-relaxed text-sm whitespace-pre-line">
              {session.scriptText}
            </p>
          </div>

          {!completed ? (
            <Button onClick={handleComplete} className="w-full rounded-xl h-12 font-semibold">
              <Check size={18} className="mr-2" /> Marcar como completada
            </Button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 p-6 rounded-xl bg-secondary/50">
              <p className="text-foreground font-medium">¿Cómo te sentó?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(r => (
                  <button
                    key={r}
                    onClick={() => handleRate(r)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      r <= rating ? 'bg-accent text-accent-foreground' : 'bg-card border border-border text-muted-foreground'
                    }`}
                  >
                    <Star size={16} fill={r <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-sm text-muted-foreground">¡Registrado! Sigue así.</p>
                  <Button onClick={() => navigate('/sessions')} variant="outline" className="mt-3 rounded-full">
                    Ver más sesiones
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
