import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAppState } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Trash2, Download, LogOut } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const { state, resetData } = useAppState();
  const [showConfirm, setShowConfirm] = useState(false);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rewire-smoke-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    resetData();
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-4">
        <h1 className="text-2xl font-serif font-bold text-foreground">Ajustes</h1>

        <div className="space-y-2">
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-1">Perfil</h3>
            <p className="text-sm text-muted-foreground">
              {state.profile?.name || 'Usuario'} · {state.profile?.goalType === 'quit' ? 'Dejar' : 'Reducir'} · {state.profile?.baselineCigsPerDay} cig/día
            </p>
            <Button variant="outline" size="sm" className="mt-2 rounded-full text-xs" onClick={() => navigate('/onboarding')}>
              Editar perfil
            </Button>
          </div>

          <button onClick={exportData} className="w-full p-4 rounded-xl bg-card shadow-card flex items-center gap-3 hover:shadow-elevated transition-shadow text-left">
            <Download size={18} className="text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Exportar datos</p>
              <p className="text-xs text-muted-foreground">Descarga todo en JSON</p>
            </div>
          </button>

          <div className="p-4 rounded-xl bg-card shadow-card space-y-3">
            <div className="flex items-center gap-3">
              <Trash2 size={18} className="text-emergency" />
              <div>
                <p className="text-sm font-semibold text-foreground">Borrar cuenta y datos</p>
                <p className="text-xs text-muted-foreground">Elimina todos tus datos locales permanentemente.</p>
              </div>
            </div>
            {!showConfirm ? (
              <Button variant="outline" size="sm" className="rounded-full text-xs text-emergency border-emergency/30" onClick={() => setShowConfirm(true)}>
                Borrar todo
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" className="rounded-full text-xs bg-emergency hover:bg-emergency/90 text-emergency-foreground" onClick={handleDelete}>
                  Confirmar borrado
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => setShowConfirm(false)}>
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Rewire Smoke v1.0 · Tus datos se guardan localmente.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Esta app no sustituye el consejo médico profesional. Si experimentas ansiedad, depresión,
            estás embarazada o tomas medicación, consulta a tu médico.
          </p>
        </div>
      </div>
    </Layout>
  );
}
