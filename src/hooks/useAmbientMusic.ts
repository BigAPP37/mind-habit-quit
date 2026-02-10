import { useState, useRef, useCallback } from 'react';

/**
 * Generates natural ambient soundscape using Web Audio API.
 * Combines pink noise (rain-like), binaural beats (alpha 10Hz for relaxation),
 * and gentle evolving chime tones for a pleasant meditation backdrop.
 */
export function useAmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const play = useCallback(async () => {
    if (isPlaying) return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 5);
    master.connect(ctx.destination);
    masterRef.current = master;

    // ── Pink noise (rain-like) ──
    const bufLen = ctx.sampleRate * 4;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufLen; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.028;
      b6 = white * 0.115926;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.setValueAtTime(800, ctx.currentTime);
    rainFilter.Q.setValueAtTime(0.5, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.6, ctx.currentTime);

    noise.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(master);
    noise.start();

    // ── Binaural beats (alpha 10Hz — relaxation/subconscious) ──
    // Left ear: 200Hz, Right ear: 210Hz → 10Hz alpha difference
    const binauralMerger = ctx.createChannelMerger(2);
    const binauralGain = ctx.createGain();
    binauralGain.gain.setValueAtTime(0.12, ctx.currentTime);

    const oscL = ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(200, ctx.currentTime);
    const gainL = ctx.createGain();
    gainL.gain.setValueAtTime(1, ctx.currentTime);
    oscL.connect(gainL);
    gainL.connect(binauralMerger, 0, 0);

    const oscR = ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(210, ctx.currentTime);
    const gainR = ctx.createGain();
    gainR.gain.setValueAtTime(1, ctx.currentTime);
    oscR.connect(gainR);
    gainR.connect(binauralMerger, 0, 1);

    binauralMerger.connect(binauralGain);
    binauralGain.connect(master);
    oscL.start();
    oscR.start();

    // ── Gentle chime tones (random pentatonic notes, spaced out) ──
    const pentatonic = [261.63, 293.66, 329.63, 392, 523.25]; // C4 pentatonic
    const playChime = () => {
      if (!ctxRef.current || ctxRef.current.state === 'closed') return;
      const c = ctxRef.current;
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      const osc = c.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * (Math.random() > 0.5 ? 2 : 1), c.currentTime);

      const env = c.createGain();
      env.gain.setValueAtTime(0, c.currentTime);
      env.gain.linearRampToValueAtTime(0.06, c.currentTime + 0.8);
      env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 4);

      const reverb = c.createBiquadFilter();
      reverb.type = 'lowpass';
      reverb.frequency.setValueAtTime(1200, c.currentTime);

      osc.connect(reverb);
      reverb.connect(env);
      env.connect(master);
      osc.start();
      osc.stop(c.currentTime + 4.5);
    };

    // Play a chime every 4-8 seconds
    const chimeInterval = setInterval(() => {
      playChime();
    }, 4000 + Math.random() * 4000);

    // First chime after 2s
    setTimeout(playChime, 2000);

    intervalsRef.current = [chimeInterval];
    setIsPlaying(true);
  }, [isPlaying]);

  const stop = useCallback(async () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];

    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);

    setTimeout(() => {
      ctx.close();
      ctxRef.current = null;
      masterRef.current = null;
      setIsPlaying(false);
    }, 2700);
  }, []);

  const cleanup = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    masterRef.current = null;
    setIsPlaying(false);
  }, []);

  return { play, stop, isLoading, isPlaying, cleanup };
}
