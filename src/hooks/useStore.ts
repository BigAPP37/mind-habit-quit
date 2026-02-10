import { useState, useEffect, useCallback } from 'react';

export interface UserProfile {
  name: string;
  goalType: 'quit' | 'reduce';
  quitDate: string | null;
  baselineCigsPerDay: number;
  dependencyLevel: 'baja' | 'media' | 'alta';
  mainReasons: string[];
  triggers: string[];
  packPrice: number;
  cigsPerPack: number;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface DailyCheckin {
  date: string;
  smoked: boolean;
  cigsCount: number;
  cravingAvg: number;
  stress: number;
  mood: number;
  sleep: number;
  topTrigger: string;
  notes: string;
}

export interface CravingEvent {
  id: string;
  timestamp: string;
  intensity: number;
  trigger: string;
  emotion: string;
  interventionUsed: string;
  outcome: 'reduced' | 'smoked' | 'ignored';
  durationSeconds: number;
}

export interface SessionCompletion {
  id: string;
  sessionId: string;
  timestamp: string;
  rating: number;
  notes: string;
}

export interface AppState {
  profile: UserProfile | null;
  checkins: DailyCheckin[];
  cravingEvents: CravingEvent[];
  sessionCompletions: SessionCompletion[];
  ifThenRules: { id: string; ifTrigger: string; thenAction: string; active: boolean }[];
}

const STORAGE_KEY = 'rewire-smoke-data';

const defaultState: AppState = {
  profile: null,
  checkins: [],
  cravingEvents: [],
  sessionCompletions: [],
  ifThenRules: [],
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {}
  return defaultState;
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useAppState() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const updateProfile = useCallback((profile: UserProfile) => {
    setState(s => ({ ...s, profile }));
  }, []);

  const addCheckin = useCallback((checkin: DailyCheckin) => {
    setState(s => ({
      ...s,
      checkins: [...s.checkins.filter(c => c.date !== checkin.date), checkin],
    }));
  }, []);

  const addCravingEvent = useCallback((event: CravingEvent) => {
    setState(s => ({ ...s, cravingEvents: [...s.cravingEvents, event] }));
  }, []);

  const addSessionCompletion = useCallback((completion: SessionCompletion) => {
    setState(s => ({ ...s, sessionCompletions: [...s.sessionCompletions, completion] }));
  }, []);

  const setIfThenRules = useCallback((rules: AppState['ifThenRules']) => {
    setState(s => ({ ...s, ifThenRules: rules }));
  }, []);

  const resetData = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Computed values
  const daysSinceQuit = state.profile?.quitDate
    ? Math.max(0, Math.floor((Date.now() - new Date(state.profile.quitDate).getTime()) / 86400000))
    : 0;

  const cigsNotSmoked = daysSinceQuit * (state.profile?.baselineCigsPerDay || 0);
  const cigsPerPack = state.profile?.cigsPerPack || 20;
  const packPrice = state.profile?.packPrice || 5.50;
  const moneySaved = (cigsNotSmoked / cigsPerPack) * packPrice;
  const minutesSaved = cigsNotSmoked * 7; // ~7 min per cigarette

  return {
    state,
    updateProfile,
    addCheckin,
    addCravingEvent,
    addSessionCompletion,
    setIfThenRules,
    resetData,
    daysSinceQuit,
    cigsNotSmoked,
    moneySaved,
    minutesSaved,
  };
}
