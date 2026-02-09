import { useState, useRef, useCallback } from 'react';

const AMBIENT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-ambient`;
const CACHE_KEY = 'rewire-ambient-music';

export function useAmbientMusic() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  const fadeIn = useCallback((audio: HTMLAudioElement, targetVolume: number, durationMs: number) => {
    audio.volume = 0;
    const steps = 20;
    const stepTime = durationMs / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);
  }, []);

  const fadeOut = useCallback((audio: HTMLAudioElement, durationMs: number): Promise<void> => {
    return new Promise((resolve) => {
      const startVolume = audio.volume;
      const steps = 20;
      const stepTime = durationMs / steps;
      const volumeStep = startVolume / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(startVolume - volumeStep * currentStep, 0);
        if (currentStep >= steps) {
          clearInterval(interval);
          audio.pause();
          resolve();
        }
      }, stepTime);
    });
  }, []);

  const play = useCallback(async (sessionDurationMin: number = 5) => {
    if (isPlaying || isLoading) return;

    setIsLoading(true);

    try {
      // Check cache first
      const cached = sessionStorage.getItem(CACHE_KEY);
      let audioUrl: string;

      if (cached) {
        audioUrl = cached;
      } else {
        const response = await fetch(AMBIENT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompt: 'Gentle ambient meditation music, soft piano notes with warm atmospheric pads, very calm and soothing, minimal melody, slow tempo, spa and mindfulness atmosphere, no drums, no vocals',
            duration: Math.min(sessionDurationMin * 60, 120),
          }),
        });

        if (!response.ok) throw new Error(`Error ${response.status}`);

        if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
        const blob = await response.blob();
        audioUrl = URL.createObjectURL(blob);
        blobUrlRef.current = audioUrl;
      }

      const audio = new Audio(audioUrl);
      audio.loop = true;
      audioRef.current = audio;

      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };

      await audio.play();
      fadeIn(audio, 0.25, 3000); // Fade in over 3s to low volume
      setIsPlaying(true);
    } catch (error) {
      console.error('Ambient music error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, isLoading, fadeIn]);

  const stop = useCallback(async () => {
    if (audioRef.current && isPlaying) {
      await fadeOut(audioRef.current, 2000); // Gentle 2s fade out
      setIsPlaying(false);
    }
  }, [isPlaying, fadeOut]);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  return { play, stop, isLoading, isPlaying, cleanup };
}
