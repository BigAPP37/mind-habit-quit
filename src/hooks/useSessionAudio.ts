import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

export function useSessionAudio() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const play = useCallback(async (text: string) => {
    if (isPlaying) {
      stop();
      return;
    }

    setIsLoading(true);

    try {
      // Wait for voices to load if needed
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        await new Promise<void>((resolve) => {
          window.speechSynthesis.onvoiceschanged = () => resolve();
          setTimeout(resolve, 1000);
        });
        voices = window.speechSynthesis.getVoices();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      utterance.pitch = 0.95;

      // Prefer a Spanish female voice for a calming tone
      const spanishVoice = voices.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('female'))
        || voices.find(v => v.lang.startsWith('es'))
        || voices[0];
      if (spanishVoice) utterance.voice = spanishVoice;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (e) => {
        if (e.error !== 'canceled') {
          toast.error('Error al reproducir el audio');
        }
        setIsPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } catch (error) {
      console.error('TTS error:', error);
      toast.error('No se pudo generar el audio. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, stop]);

  const cleanup = useCallback(() => {
    stop();
  }, [stop]);

  return { play, stop, isLoading, isPlaying, cleanup };
}
