import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAppState } from '@/hooks/useStore';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Trash2, Download, LogOut } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const { state, resetData, updateProfile } = useAppState();
  const { signOut, user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const profile = state.profile;
  const [packPrice, setPackPrice] = useState(profile?.packPrice ?? 5.50);
  const [cigsPerPack, setCigsPerPack] = useState(profile?.cigsPerPack ?? 20);

  const savePrice = () => {
    if (profile) {
      updateProfile({ ...profile, packPrice, cigsPerPack });
    }
  };

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

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-4">
        <h1 className="text-2xl font-serif font-bold text-foreground">Ajustes</h1>

        <div className="space-y-2">
          {/* Profile */}
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-1">Perfil</h3>
            <p className="text-sm text-muted-foreground">
              {profile?.name || 'Usuario'} · {profile?.goalType === 'quit' ? 'Dejar' : 'Reducir'} · {profile?.baselineCigsPerDay} cig/día
            </p>
            {user && <p className="text-xs text-muted-foreground mt-1">{user.email}</p>}
            <Button variant="outline" size="sm" className="mt-2 rounded-full text-xs" onClick={() => navigate('/onboarding')}>
              Editar perfil
            </Button>
          </div>

          {/* Pack price */}
          <div className="p-4 rounded-xl bg-card shadow-card space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Precio del tabaco</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Precio cajetilla (€)</label>
                <input type="number" step="0.10" min={1} max={30} value={packPrice}
                  onChange={e => setPackPrice(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Cigarrillos/cajetilla</label>
                <input type="number" min={1} max={40} value={cigsPerPack}
                  onChange={e => setCigsPerPack(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <Button size="sm" className="rounded-full text-xs" onClick={savePrice}>Guardar precio</Button>
          </div>

          {/* Export */}
          <button onClick={exportData} className="w-full p-4 rounded-xl bg-card shadow-card flex items-center gap-3 hover:shadow-elevated transition-shadow text-left">
            <Download size={18} className="text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Exportar datos</p>
              <p className="text-xs text-muted-foreground">Descarga todo en JSON</p>
            </div>
          </button>

          {/* Logout */}
          <button onClick={handleLogout} className="w-full p-4 rounded-xl bg-card shadow-card flex items-center gap-3 hover:shadow-elevated transition-shadow text-left">
            <LogOut size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">Cerrar sesión</p>
              <p className="text-xs text-muted-foreground">Salir de tu cuenta</p>
            </div>
          </button>

          {/* Delete */}
          <div className="p-4 rounded-xl bg-card shadow-card space-y-3">
            <div className="flex items-center gap-3">
              <Trash2 size={18} className="text-emergency" />
              <div>
                <p className="text-sm font-semibold text-foreground">Borrar cuenta y datos</p>
                <p className="text-xs text-muted-foreground">Elimina todos tus datos permanentemente.</p>
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
            Esta app no sustituye el consejo médico profesional.
          </p>
        </div>
      </div>
    </Layout>
  );
}
