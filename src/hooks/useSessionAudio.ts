import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

export interface VoiceOption {
  id: string;
  label: string;
  voiceId: string;
}

export const VOICE_OPTIONS: VoiceOption[] = [
  // Voces femeninas ideales para meditación
  { id: 'matilda', label: 'Matilda (femenina, cálida y suave)', voiceId: 'XrExE9yKIg1WjnnlVkGX' },
  { id: 'jessica', label: 'Jessica (femenina, gentil)', voiceId: 'cgSgspJ2msm6clMCkdW9' },
  { id: 'laura', label: 'Laura (femenina, serena)', voiceId: 'FGY2WhTYpPnrIDTdsKH5' },
  { id: 'lily', label: 'Lily (femenina, tranquila)', voiceId: 'pFZP5JQG7iQjIQuC4Bku' },
  { id: 'sarah', label: 'Sarah (femenina, suave)', voiceId: 'EXAVITQu4vr4xnSDxMaL' },
  { id: 'alice', label: 'Alice (femenina, clara)', voiceId: 'Xb7hH8MSUJpSbSDYk0k2' },
  // Voces neutras / masculinas para meditación
  { id: 'river', label: 'River (neutra, fluida y serena)', voiceId: 'SAz9YHcvj6GT2YYXdXww' },
  { id: 'callum', label: 'Callum (masculina, serena)', voiceId: 'N2lVS1w4EtoT3dr4eOWO' },
  { id: 'daniel', label: 'Daniel (masculina, calmada)', voiceId: 'onwK4e9ZLuTAKqWW03F9' },
  { id: 'george', label: 'George (masculina, profunda)', voiceId: 'JBFqnCBsd6RMkjVDRZzb' },
  { id: 'brian', label: 'Brian (masculina, grave)', voiceId: 'nPczCjzI2devNBz1zQrb' },
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
          voiceId: selectedVoice.voiceId,
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
