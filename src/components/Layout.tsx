import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Flame, BookOpen, CalendarDays, Target } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Inicio' },
  { path: '/craving', icon: Flame, label: 'Emergencia' },
  { path: '/sessions', icon: BookOpen, label: 'Sesiones' },
  { path: '/diary', icon: CalendarDays, label: 'Diario' },
  { path: '/plan', icon: Target, label: 'Plan' },
];

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-safe">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-50">
        <div className="flex items-center justify-around max-w-lg mx-auto h-16">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = pathname === path || pathname.startsWith(path + '/');
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                  path === '/craving'
                    ? 'text-emergency'
                    : active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={path === '/craving' ? 24 : 20} strokeWidth={active ? 2.5 : 1.8} />
                <span className={`text-[10px] font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
