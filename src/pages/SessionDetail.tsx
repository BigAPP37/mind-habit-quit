import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Check, Volume2, Square, Loader2, Music, Play, FlaskConical, ChevronDown, ExternalLink, Download } from 'lucide-react';
import { allSessions, scientificEvidence } from '@/data/content';
import { useAppState } from '@/hooks/useStore';
import { BreathingCircle } from '@/components/BreathingCircle';
import { Button } from '@/components/ui/button';
import { useSessionAudio, VOICE_OPTIONS, VoiceOption, getSavedVoice, saveVoicePreference } from '@/hooks/useSessionAudio';
import { useAmbientMusic } from '@/hooks/useAmbientMusic';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const typeLabels: Record<string, string> = {
  breathing: 'Respiración',
  mindfulness: 'Mindfulness',
  urge_surfing: 'Surfeo de impulsos',
  reprogramming: 'Reprogramación',
};

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addSessionCompletion } = useAppState();
  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>(getSavedVoice);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { play, stop, isLoading: audioLoading, isPlaying, cleanup } = useSessionAudio();
  const { play: playAmbient, stop: stopAmbient, isLoading: ambientLoading, isPlaying: ambientPlaying, cleanup: cleanupAmbient } = useAmbientMusic();

  // Stop ALL audio on unmount (navigation away)
  useEffect(() => {
    return () => {
      cleanup();
      cleanupAmbient();
    };
  }, [cleanup, cleanupAmbient]);

  const stopAllAudio = useCallback(() => {
    stop();
    cleanupAmbient();
  }, [stop, cleanupAmbient]);

  const handleGoBack = useCallback(() => {
    stopAllAudio();
    navigate(-1);
  }, [stopAllAudio, navigate]);

  const session = allSessions.find(s => s.id === id);
  if (!session) return <div className="p-8 text-center text-muted-foreground">Sesión no encontrada.</div>;

  const evidence = scientificEvidence.find(e => e.type === session.type);
  const isBreathing = session.type === 'breathing';
  const pattern = session.title.includes('4-4-4-4') ? '4-4-4-4' as const :
                  session.title.includes('4-7-8') ? '4-7-8' as const :
                  '5-5' as const;

  const handleStartSession = () => {
    setSessionStarted(true);
    playAmbient();
  };

  const handleComplete = () => {
    setCompleted(true);
    stopAmbient();
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

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadProgress(0);
    try {
      const { data: { session: authSession } } = await supabase.auth.getSession();
      const accessToken = authSession?.access_token;
      if (!accessToken) {
        toast.error('Inicia sesión para descargar audio.');
        return;
      }

      setDownloadProgress(20);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text: session.scriptText,
          voiceId: selectedVoice.voiceId,
          mode: 'download',
        }),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      setDownloadProgress(70);

      const data = await response.json();

      if (data?.url) {
        setDownloadProgress(100);
        // Open the signed URL — browser handles the download natively
        window.open(data.url, '_blank');
        toast.success('Audio listo para guardar');
      } else {
        throw new Error('No se recibió URL de descarga');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('No se pudo descargar el audio');
    } finally {
      setDownloading(false);
      setTimeout(() => setDownloadProgress(0), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 pt-4 pb-24">
        {/* Header */}
        <motion.button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-muted-foreground text-sm mb-6 hover:text-foreground transition-colors duration-300 min-h-[44px]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ArrowLeft size={18} /> Volver
        </motion.button>

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {/* Session header */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <p className="text-xs text-primary font-medium uppercase tracking-widest">
              {typeLabels[session.type] || session.type} · {session.durationMinutes} min
            </p>
            <h1 className="text-2xl font-serif font-bold text-foreground mt-1.5 leading-snug">
              {session.title}
            </h1>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {session.tags.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                  className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Scientific evidence */}
          {evidence && (
            <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <Collapsible open={showEvidence} onOpenChange={setShowEvidence}>
                <CollapsibleTrigger asChild>
                  <button className="flex items-center gap-2 w-full p-3 rounded-xl bg-secondary/60 hover:bg-secondary/80 transition-colors text-left group min-h-[44px]">
                    <FlaskConical size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground flex-1">
                      ¿Por qué funciona? Evidencia científica
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-muted-foreground transition-transform duration-300 ${showEvidence ? 'rotate-180' : ''}`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 p-4 rounded-xl bg-card border border-border/50 space-y-4"
                  >
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {evidence.explanation}
                    </p>
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Estudios de referencia
                      </p>
                      {evidence.references.map((ref, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-secondary/40 border border-border/30 space-y-1.5"
                        >
                          <p className="text-xs font-semibold text-foreground leading-snug">
                            {ref.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ref.authors} — <em>{ref.journal}</em> ({ref.year})
                          </p>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            📊 {ref.finding}
                          </p>
                          {ref.doi && (
                            <a
                              href={`https://doi.org/${ref.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <ExternalLink size={10} /> Ver estudio
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          )}

          {/* Start button */}
          <AnimatePresence mode="wait">
            {!sessionStarted && (
              <motion.div
                key="start-prompt"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <motion.div
                  className="inline-flex flex-col items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={handleStartSession}
                    disabled={ambientLoading}
                    className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg hover:shadow-xl"
                    style={{ background: 'var(--gradient-calm)' }}
                  >
                    {ambientLoading ? (
                      <Loader2 size={32} className="text-primary-foreground animate-spin" />
                    ) : (
                      <Play size={36} className="text-primary-foreground ml-1" />
                    )}
                  </button>
                  <p className="text-sm text-muted-foreground">
                    Toca para comenzar la sesión
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Session content */}
          <AnimatePresence mode="wait">
            {sessionStarted && (
              <motion.div
                key="session-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Ambient music indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center justify-center gap-2"
                >
                  {ambientPlaying && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/70 text-secondary-foreground text-xs">
                      <Music size={12} className="animate-pulse" />
                      <span>Música ambiental</span>
                      <button
                        onClick={() => stopAmbient()}
                        className="ml-1 opacity-60 hover:opacity-100 transition-opacity min-w-[24px] min-h-[24px] flex items-center justify-center"
                      >
                        <Square size={10} />
                      </button>
                    </div>
                  )}
                </motion.div>

                {/* Breathing Circle */}
                {isBreathing && !completed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    className="py-4"
                  >
                    <BreathingCircle
                      pattern={pattern}
                      durationSeconds={session.durationMinutes * 60}
                      onComplete={handleComplete}
                    />
                  </motion.div>
                )}

                {/* Script text + audio controls */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-4 sm:p-6 rounded-2xl bg-card shadow-[var(--shadow-card)] space-y-4 border border-border/50"
                >
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Guión de la sesión
                  </p>

                  {/* Voice selector */}
                  <Select
                    value={selectedVoice.id}
                    onValueChange={(val) => {
                      const voice = VOICE_OPTIONS.find(v => v.id === val);
                      if (voice) {
                        setSelectedVoice(voice);
                        saveVoicePreference(voice);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full h-11 text-xs rounded-full border-border/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VOICE_OPTIONS.map(v => (
                        <SelectItem key={v.id} value={v.id} className="text-xs">
                          {v.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Play + Download buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full gap-2 border-border/60 transition-all duration-300 h-11"
                      onClick={() => isPlaying ? stop() : play(session.scriptText, selectedVoice)}
                      disabled={audioLoading}
                    >
                      {audioLoading ? (
                        <><Loader2 size={14} className="animate-spin" /> Generando...</>
                      ) : isPlaying ? (
                        <><Square size={14} /> Parar</>
                      ) : (
                        <><Volume2 size={14} /> Escuchar</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2 border-border/60 transition-all duration-300 h-11 px-4 relative overflow-hidden"
                      onClick={handleDownload}
                      disabled={downloading || audioLoading}
                    >
                      {downloading && downloadProgress > 0 && (
                        <span
                          className="absolute inset-0 bg-primary/15 transition-all duration-300 ease-out"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      )}
                      <span className="relative flex items-center gap-2">
                        {downloading ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span className="text-xs tabular-nums">{downloadProgress}%</span>
                          </>
                        ) : (
                          <>
                            <Download size={14} />
                            <span className="hidden sm:inline">Descargar</span>
                          </>
                        )}
                      </span>
                    </Button>
                  </div>

                  <p className="text-foreground/90 leading-relaxed text-sm whitespace-pre-line">
                    {session.scriptText}
                  </p>
                </motion.div>

                {/* Complete / Rating */}
                <AnimatePresence mode="wait">
                  {!completed ? (
                    <motion.div
                      key="complete-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Button
                        onClick={handleComplete}
                        className="w-full rounded-xl h-12 font-semibold transition-all duration-300 hover:shadow-lg"
                      >
                        <Check size={18} className="mr-2" /> Marcar como completada
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="rating"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="text-center space-y-4 p-6 rounded-2xl bg-secondary/40 border border-border/30"
                    >
                      <p className="text-foreground font-medium font-serif">¿Cómo te sentó?</p>
                      <div className="flex justify-center gap-3">
                        {[1, 2, 3, 4, 5].map(r => (
                          <motion.button
                            key={r}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRate(r)}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                              r <= rating
                                ? 'bg-accent text-accent-foreground shadow-md'
                                : 'bg-card border border-border text-muted-foreground hover:border-accent/40'
                            }`}
                          >
                            <Star size={16} fill={r <= rating ? 'currentColor' : 'none'} />
                          </motion.button>
                        ))}
                      </div>
                      <AnimatePresence>
                        {rating > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <p className="text-sm text-muted-foreground">¡Registrado! Sigue así.</p>
                            <Button
                              onClick={() => {
                                stopAllAudio();
                                navigate('/sessions');
                              }}
                              variant="outline"
                              className="mt-3 rounded-full transition-all duration-300"
                            >
                              Ver más sesiones
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating audio control bar */}
      <AnimatePresence>
        {sessionStarted && (isPlaying || ambientPlaying) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-lg"
          >
            {isPlaying && (
              <button
                onClick={stop}
                className="flex items-center gap-2 text-sm font-medium text-foreground min-h-[44px] px-3 rounded-full hover:bg-secondary/60 transition-colors"
              >
                <Square size={14} className="text-primary" />
                Parar voz
              </button>
            )}
            {isPlaying && ambientPlaying && (
              <div className="w-px h-5 bg-border" />
            )}
            {ambientPlaying && (
              <button
                onClick={() => stopAmbient()}
                className="flex items-center gap-2 text-sm font-medium text-foreground min-h-[44px] px-3 rounded-full hover:bg-secondary/60 transition-colors"
              >
                <Music size={14} className="text-primary animate-pulse" />
                Parar música
              </button>
            )}
            <div className="w-px h-5 bg-border" />
            <button
              onClick={stopAllAudio}
              className="flex items-center gap-2 text-sm font-medium text-destructive min-h-[44px] px-3 rounded-full hover:bg-destructive/10 transition-colors"
            >
              <Square size={14} />
              Parar todo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
