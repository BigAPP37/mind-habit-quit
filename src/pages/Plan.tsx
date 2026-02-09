import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useAppState } from '@/hooks/useStore';
import { defaultIfThenRules, alternativeResponses, autosuggestionPhrases } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Target, Zap, MessageCircle, Plus, Trash2, Calendar } from 'lucide-react';

export default function Plan() {
  const { state, setIfThenRules } = useAppState();
  const profile = state.profile;
  const [tab, setTab] = useState<'plan' | 'ifthen' | 'sustitutos' | 'frases'>('plan');

  // Init rules if empty
  const rules = state.ifThenRules.length > 0
    ? state.ifThenRules
    : defaultIfThenRules.map(r => ({ ...r, active: true }));

  const toggleRule = (id: string) => {
    setIfThenRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const tabs = [
    { key: 'plan', label: 'Mi plan', icon: Target },
    { key: 'ifthen', label: 'Si-Entonces', icon: Zap },
    { key: 'sustitutos', label: 'Sustitutos', icon: MessageCircle },
    { key: 'frases', label: 'Frases', icon: MessageCircle },
  ];

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-4">
        <h1 className="text-2xl font-serif font-bold text-foreground">Mi Plan</h1>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}
            >{t.label}</button>
          ))}
        </div>

        {tab === 'plan' && profile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-4 rounded-xl bg-card shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <h3 className="font-semibold text-foreground text-sm">Objetivo</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.goalType === 'quit'
                  ? `Dejar de fumar el ${profile.quitDate ? new Date(profile.quitDate).toLocaleDateString('es-ES') : 'fecha por definir'}`
                  : 'Reducción gradual'}
              </p>
              <p className="text-sm text-muted-foreground">Base: {profile.baselineCigsPerDay} cigarrillos/día</p>
              <p className="text-sm text-muted-foreground">Dependencia: {profile.dependencyLevel}</p>
            </div>

            <div className="p-4 rounded-xl bg-card shadow-card">
              <h3 className="font-semibold text-foreground text-sm mb-2">Mis disparadores</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.triggers.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-emergency/10 text-emergency text-xs">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card shadow-card">
              <h3 className="font-semibold text-foreground text-sm mb-2">Mis motivos</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.mainReasons.map(r => (
                  <span key={r} className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs">{r}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'ifthen' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="text-xs text-muted-foreground">Reglas automáticas: cuando ocurra X, haz Y. Actívalas o desactívalas.</p>
            {rules.map(r => (
              <div key={r.id} className={`p-3 rounded-xl border transition-all ${r.active ? 'bg-card shadow-card border-transparent' : 'bg-muted/50 border-border opacity-60'}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleRule(r.id)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${r.active ? 'bg-primary border-primary' : 'border-border'}`}
                  >
                    {r.active && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                  </button>
                  <div>
                    <p className="text-sm text-foreground"><strong>Si</strong> {r.ifTrigger}</p>
                    <p className="text-sm text-primary"><strong>→</strong> {r.thenAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'sustitutos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-xs text-muted-foreground">Alternativas para cada disparador.</p>
            {alternativeResponses.slice(0, 12).map(ar => (
              <div key={ar.trigger} className="p-3 rounded-xl bg-card shadow-card">
                <p className="text-sm font-semibold text-foreground mb-1.5">{ar.trigger}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ar.alternatives.map(a => (
                    <span key={a} className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">{a}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'frases' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="text-xs text-muted-foreground">Frases de autosugestión. Repítelas en voz baja, con convicción, varias veces al día.</p>
            {autosuggestionPhrases.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-card shadow-card">
                <p className="text-sm text-foreground italic">"{p}"</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center pt-2">
              ⚠️ Técnica de enfoque y visualización. La evidencia varía. Úsalo como complemento.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
