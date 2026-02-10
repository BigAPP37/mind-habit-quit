import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Calendar, Coins, Clock, SmilePlus, TrendingDown, Wind, BookOpen, Beaker, Settings as SettingsIcon } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useAppState } from '@/hooks/useStore';
import { dailyMessages, allSessions } from '@/data/content';
import { Button } from '@/components/ui/button';
import { SavingsMilestones } from '@/components/SavingsMilestones';
import { InteractiveTutorial } from '@/components/InteractiveTutorial';

export default function Dashboard() {
  const navigate = useNavigate();
  const { state, daysSinceQuit, cigsNotSmoked, moneySaved, minutesSaved } = useAppState();
  const profile = state.profile;
  const [showTutorial, setShowTutorial] = useState(false);

  const todayMessage = useMemo(() => {
    const day = daysSinceQuit % dailyMessages.length;
    return dailyMessages[day];
  }, [daysSinceQuit]);

  const suggestedSession = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 10) return allSessions.find(s => s.tags.includes('mañana') || s.tags.includes('despertar'));
    if (hour >= 12 && hour < 15) return allSessions.find(s => s.tags.includes('post-comida'));
    if (hour >= 21) return allSessions.find(s => s.tags.includes('noche') || s.tags.includes('sueño'));
    return allSessions.find(s => s.tags.includes('calma') && s.durationMinutes <= 5);
  }, []);

  const todayCheckin = state.checkins.find(
    c => c.date === new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    if (!profile?.onboardingComplete) {
      navigate('/onboarding');
      return;
    }
    // Show tutorial on first visit
    const tutorialDone = localStorage.getItem('rewire-tutorial-done');
    if (!tutorialDone) {
      setShowTutorial(true);
    }
  }, [profile, navigate]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('rewire-tutorial-done', 'true');
  };

  if (!profile?.onboardingComplete) {
    return null;
  }

  const stats = [
    { icon: Calendar, label: 'Días', value: daysSinceQuit, color: 'text-primary' },
    { icon: TrendingDown, label: 'Cigarros evitados', value: cigsNotSmoked, color: 'text-success' },
    { icon: Coins, label: 'Ahorrado', value: `${moneySaved.toFixed(0)}€`, color: 'text-accent' },
    { icon: Clock, label: 'Tiempo ganado', value: `${Math.floor(minutesSaved / 60)}h`, color: 'text-calm' },
  ];

  return (
    <Layout>
      {showTutorial && <InteractiveTutorial onComplete={handleTutorialComplete} />}
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-5">
        {/* Header with settings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Hola, {profile.name || 'compañero'}</p>
            <h1 className="text-2xl font-serif font-bold text-foreground">Tu día {daysSinceQuit + 1}</h1>
          </div>
          <Link to="/settings" className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <SettingsIcon size={20} />
          </Link>
        </motion.div>

        {/* Daily message */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-secondary border border-border">
          <p className="text-sm text-foreground italic leading-relaxed">"{todayMessage.text}"</p>
        </motion.div>

        {/* Emergency button */}
        <motion.div data-tutorial="emergency" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
          <Button asChild size="lg" className="w-full rounded-xl h-14 text-base font-bold bg-emergency hover:bg-emergency/90 text-emergency-foreground shadow-elevated">
            <Link to="/craving">
              <Flame size={22} className="mr-2" />
              Tengo ganas de fumar
            </Link>
          </Button>
        </motion.div>

        {/* Stats grid */}
        <div data-tutorial="stats" className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
              className="p-3 rounded-xl bg-card shadow-card">
              <s.icon size={18} className={s.color} />
              <p className="text-xl font-bold text-foreground mt-1 font-serif">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Savings milestones */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <SavingsMilestones saved={moneySaved} />
        </motion.div>

        {/* Quick check-in */}
        {!todayCheckin && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Button asChild variant="outline" className="w-full rounded-xl">
              <Link to="/diary">
                <SmilePlus size={18} className="mr-2" />
                Check-in del día (10s)
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Suggested session */}
        {suggestedSession && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Sesión sugerida</p>
            <Link to={`/sessions/${suggestedSession.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                {suggestedSession.type === 'breathing' ? <Wind size={18} className="text-primary" /> : <BookOpen size={18} className="text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{suggestedSession.title}</p>
                <p className="text-xs text-muted-foreground">{suggestedSession.durationMinutes} min</p>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Science link */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
          <Link to="/science" className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Beaker size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">La ciencia detrás</p>
              <p className="text-xs text-muted-foreground">Estudios y evidencia científica</p>
            </div>
          </Link>
        </motion.div>

        {/* Today's actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Hoy: 3 micro-acciones</p>
          <div className="space-y-2">
            {[
              '🫁 Haz 1 sesión de respiración (2 min)',
              '📝 Registra tu estado de ánimo',
              '💧 Bebe un vaso de agua extra',
            ].map((action, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card">
                <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0" />
                <p className="text-sm text-foreground">{action}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
