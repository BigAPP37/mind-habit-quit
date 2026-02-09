import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-tts`;

export interface VoiceOption {
  id: string;
  label: string;
  voiceName: string;
  ssmlGender: string;
}

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'female-a', label: 'Femenina suave (Neural2-A)', voiceName: 'es-ES-Neural2-A', ssmlGender: 'FEMALE' },
  { id: 'female-c', label: 'Femenina cálida (Neural2-C)', voiceName: 'es-ES-Neural2-C', ssmlGender: 'FEMALE' },
  { id: 'female-e', label: 'Femenina clara (Neural2-E)', voiceName: 'es-ES-Neural2-E', ssmlGender: 'FEMALE' },
  { id: 'male-b', label: 'Masculina profunda (Neural2-B)', voiceName: 'es-ES-Neural2-B', ssmlGender: 'MALE' },
  { id: 'male-d', label: 'Masculina serena (Neural2-D)', voiceName: 'es-ES-Neural2-D', ssmlGender: 'MALE' },
  { id: 'male-f', label: 'Masculina grave (Neural2-F)', voiceName: 'es-ES-Neural2-F', ssmlGender: 'MALE' },
];

export function useSessionAudio() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback(async (text: string, voice?: VoiceOption) => {
    if (isPlaying) {
      stop();
      return;
    }

    setIsLoading(true);

    try {
      const selectedVoice = voice || VOICE_OPTIONS[0];

      const response = await fetch(TTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          text,
          voiceName: selectedVoice.voiceName,
          ssmlGender: selectedVoice.ssmlGender,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      blobUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        toast.error('Error al reproducir el audio');
      };

      await audio.play();
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
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, [stop]);

  return { play, stop, isLoading, isPlaying, cleanup };
}
