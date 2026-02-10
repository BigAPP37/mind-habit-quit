import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

export interface VoiceOption {
  id: string;
  label: string;
  voiceId: string;
}

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'roger', label: 'Roger (narrativa)', voiceId: 'CwhRBWXzGAHq8TQ4Fs17' },
  { id: 'matilda', label: 'Matilda (femenina, cálida y suave)', voiceId: 'XrExE9yKIg1WjnnlVkGX' },
  { id: 'jessica', label: 'Jessica (femenina, gentil)', voiceId: 'cgSgspJ2msm6clMCkdW9' },
  { id: 'laura', label: 'Laura (femenina, serena)', voiceId: 'FGY2WhTYpPnrIDTdsKH5' },
  { id: 'lily', label: 'Lily (femenina, tranquila)', voiceId: 'pFZP5JQG7iQjIQuC4Bku' },
  { id: 'sarah', label: 'Sarah (femenina, suave)', voiceId: 'EXAVITQu4vr4xnSDxMaL' },
  { id: 'alice', label: 'Alice (femenina, clara)', voiceId: 'Xb7hH8MSUJpSbSDYk0k2' },
  { id: 'river', label: 'River (neutra, fluida y serena)', voiceId: 'SAz9YHcvj6GT2YYXdXww' },
  { id: 'callum', label: 'Callum (masculina, serena)', voiceId: 'N2lVS1w4EtoT3dr4eOWO' },
  { id: 'daniel', label: 'Daniel (masculina, calmada)', voiceId: 'onwK4e9ZLuTAKqWW03F9' },
  { id: 'george', label: 'George (masculina, profunda)', voiceId: 'JBFqnCBsd6RMkjVDRZzb' },
  { id: 'brian', label: 'Brian (masculina, grave)', voiceId: 'nPczCjzI2devNBz1zQrb' },
];

const VOICE_PREF_KEY = 'rewire-voice-preference';

export function getSavedVoice(): VoiceOption {
  try {
    const saved = localStorage.getItem(VOICE_PREF_KEY);
    if (saved) {
      const voice = VOICE_OPTIONS.find(v => v.id === saved);
      if (voice) return voice;
    }
  } catch {}
  return VOICE_OPTIONS[0];
}

export function saveVoicePreference(voice: VoiceOption) {
  localStorage.setItem(VOICE_PREF_KEY, voice.id);
}

// Tiny silent WAV to unlock audio on iOS (user gesture context)
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

export function useSessionAudio() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback(async (text: string, voice?: VoiceOption) => {
    if (isPlaying) {
      stop();
      return;
    }

    // CRITICAL: Create and play Audio immediately in user gesture context
    // This unlocks audio playback on iOS/Safari before any async work
    const audio = new Audio(SILENT_WAV);
    audio.volume = 1;
    audioRef.current = audio;

    try {
      // Play silent audio to unlock - must happen synchronously in gesture
      await audio.play();
    } catch (e) {
      console.warn('Silent audio unlock failed:', e);
    }

    setIsLoading(true);

    try {
      const selectedVoice = voice || VOICE_OPTIONS[0];

      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) {
        throw new Error('No hay sesión autenticada. Inicia sesión para escuchar audio.');
      }

      console.log('[TTS] Requesting audio, voice:', selectedVoice.id, 'textLen:', text.length);

      const response = await fetch(TTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text,
          voiceId: selectedVoice.voiceId,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.error('[TTS] Server error:', response.status, errorBody);
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type') || '';
      if (!contentType.includes('audio')) {
        const body = await response.text().catch(() => '');
        console.error('[TTS] Unexpected response type:', contentType, body);
        throw new Error('La respuesta no es audio válido');
      }

      // Clean up previous blob URL
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }

      const audioBlob = await response.blob();
      console.log('[TTS] Audio received, size:', audioBlob.size, 'type:', audioBlob.type);

      if (audioBlob.size < 100) {
        throw new Error('Audio recibido está vacío o corrupto');
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      blobUrlRef.current = audioUrl;

      // Now set the real audio source on the already-unlocked Audio element
      audio.src = audioUrl;
      audio.onended = () => setIsPlaying(false);
      audio.onerror = (e) => {
        console.error('[TTS] Audio playback error:', e);
        setIsPlaying(false);
        toast.error('Error al reproducir el audio');
      };

      await audio.play();
      setIsPlaying(true);
      console.log('[TTS] Playing audio successfully');
    } catch (error) {
      console.error('[TTS] Error:', error);
      toast.error(error instanceof Error ? error.message : 'No se pudo generar el audio');
      audio.src = '';
      setIsPlaying(false);
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
