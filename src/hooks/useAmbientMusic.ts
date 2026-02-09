import { useState, useRef, useCallback } from 'react';

/**
 * Generates gentle ambient meditation tones using Web Audio API.
 * No external API needed — runs entirely in the browser.
 */
export function useAmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gains: GainNode[]; masterGain: GainNode } | null>(null);

  const play = useCallback(async () => {
    if (isPlaying) return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 4); // Gentle fade in
    masterGain.connect(ctx.destination);

    // Layered ambient drone — warm, meditative frequencies
    const tones = [
      { freq: 174, type: 'sine' as OscillatorType, gain: 0.35 },    // Solfeggio — grounding
      { freq: 261.63, type: 'sine' as OscillatorType, gain: 0.15 }, // C4 — warm pad
      { freq: 329.63, type: 'sine' as OscillatorType, gain: 0.12 }, // E4 — gentle harmony
      { freq: 392, type: 'sine' as OscillatorType, gain: 0.1 },     // G4 — open fifth
      { freq: 528, type: 'sine' as OscillatorType, gain: 0.08 },    // Solfeggio — healing
    ];

    const gains: GainNode[] = [];

    tones.forEach((tone) => {
      const osc = ctx.createOscillator();
      osc.type = tone.type;
      osc.frequency.setValueAtTime(tone.freq, ctx.currentTime);

      // Very subtle frequency drift for organic feel
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.05 + Math.random() * 0.1, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      const toneGain = ctx.createGain();
      toneGain.gain.setValueAtTime(tone.gain, ctx.currentTime);

      osc.connect(toneGain);
      toneGain.connect(masterGain);
      osc.start();

      gains.push(toneGain);
    });

    // Soft filtered noise layer for texture
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.015;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, ctx.currentTime);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start();

    gains.push(noiseGain);
    nodesRef.current = { gains, masterGain };
    setIsPlaying(true);
  }, [isPlaying]);

  const stop = useCallback(async () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !nodes) return;

    // Gentle fade out over 2 seconds
    nodes.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);

    setTimeout(() => {
      ctx.close();
      ctxRef.current = null;
      nodesRef.current = null;
      setIsPlaying(false);
    }, 2200);
  }, []);

  const cleanup = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    nodesRef.current = null;
    setIsPlaying(false);
  }, []);

  return { play, stop, isLoading: false, isPlaying, cleanup };
}
