import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, Brain, Waves, Sparkles, Lock, Clock, Search } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { allSessions, Session } from '@/data/content';

const typeConfig: Record<string, { icon: typeof Wind; label: string; color: string }> = {
  breathing: { icon: Wind, label: 'Respiración', color: 'text-primary' },
  mindfulness: { icon: Brain, label: 'Mindfulness', color: 'text-calm' },
  urge_surfing: { icon: Waves, label: 'Surfeo de impulsos', color: 'text-accent' },
  reprogramming: { icon: Sparkles, label: 'Reprogramación', color: 'text-primary' },
};

const durationFilters = [
  { label: 'Todas', value: 0 },
  { label: '≤2 min', value: 2 },
  { label: '≤5 min', value: 5 },
  { label: '≤10 min', value: 10 },
];

export default function Sessions() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState(0);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return allSessions.filter(s => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      if (durationFilter > 0 && s.durationMinutes > durationFilter) return false;
      if (search && !s.title.toLowerCase().includes(search.toLowerCase()) && !s.tags.some(t => t.includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [typeFilter, durationFilter, search]);

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-4">
        <h1 className="text-2xl font-serif font-bold text-foreground">Sesiones</h1>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar sesiones..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            maxLength={100}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
              typeFilter === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'
            }`}
          >Todas</button>
          {Object.entries(typeConfig).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                typeFilter === key ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'
              }`}
            >{val.label}</button>
          ))}
        </div>

        {/* Duration filter */}
        <div className="flex gap-2">
          {durationFilters.map(d => (
            <button
              key={d.value}
              onClick={() => setDurationFilter(d.value)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                durationFilter === d.value ? 'bg-secondary text-foreground border-primary/30' : 'border-border text-muted-foreground'
              }`}
            >{d.label}</button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">No hay sesiones con estos filtros.</p>
          )}
          {filtered.map((s, i) => {
            const config = typeConfig[s.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={`/sessions/${s.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{s.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={10} /> {s.durationMinutes} min
                      </span>
                      <span className={`text-xs ${config.color}`}>{config.label}</span>
                    </div>
                  </div>
                  {s.premium && (
                    <Lock size={14} className="text-muted-foreground flex-shrink-0" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
