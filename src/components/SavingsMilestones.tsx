import { motion } from 'framer-motion';
import { Gift, Check } from 'lucide-react';

const milestones = [
  { amount: 10, emoji: '☕', label: '5 cafés especiales' },
  { amount: 30, emoji: '🍕', label: 'Cena para dos en pizzería' },
  { amount: 55, emoji: '🎬', label: 'Cine + palomitas + cena' },
  { amount: 100, emoji: '🛍️', label: 'Ropa nueva o zapatillas' },
  { amount: 200, emoji: '🎧', label: 'Auriculares inalámbricos' },
  { amount: 350, emoji: '📱', label: 'Un smartwatch' },
  { amount: 500, emoji: '🍽️', label: 'Restaurante estrella Michelin' },
  { amount: 750, emoji: '✈️', label: 'Vuelo ida y vuelta europeo' },
  { amount: 1000, emoji: '📺', label: 'Televisión 55 pulgadas' },
  { amount: 1500, emoji: '📱', label: 'iPhone o Samsung Galaxy nuevo' },
  { amount: 2000, emoji: '🏖️', label: 'Vacaciones una semana todo incluido' },
  { amount: 3000, emoji: '💻', label: 'MacBook o portátil gaming' },
  { amount: 5000, emoji: '🚗', label: 'Entrada para un coche' },
];

interface Props {
  saved: number;
}

export function SavingsMilestones({ saved }: Props) {
  const nextMilestone = milestones.find(m => m.amount > saved);
  const achieved = milestones.filter(m => m.amount <= saved);
  const upcoming = milestones.filter(m => m.amount > saved).slice(0, 3);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Gift size={16} className="text-accent" />
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          Con tu ahorro podrías...
        </p>
      </div>

      {/* Next milestone progress */}
      {nextMilestone && (
        <div className="p-3 rounded-xl bg-card shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {nextMilestone.emoji} {nextMilestone.label}
            </span>
            <span className="text-xs text-muted-foreground">{saved.toFixed(0)}€ / {nextMilestone.amount}€</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (saved / nextMilestone.amount) * 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Achieved */}
      {achieved.length > 0 && (
        <div className="space-y-1.5">
          {achieved.slice(-3).reverse().map((m, i) => (
            <motion.div
              key={m.amount}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50"
            >
              <Check size={14} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{m.emoji} {m.label}</span>
              <span className="text-xs text-muted-foreground ml-auto">{m.amount}€</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && achieved.length > 0 && (
        <div className="space-y-1.5 opacity-60">
          {upcoming.map(m => (
            <div key={m.amount} className="flex items-center gap-3 p-2.5 rounded-lg">
              <div className="w-3.5 h-3.5 rounded-full border border-border flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{m.emoji} {m.label}</span>
              <span className="text-xs text-muted-foreground ml-auto">{m.amount}€</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
