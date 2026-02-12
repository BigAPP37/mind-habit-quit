import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, Brain, Shield, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Wind, title: 'Respiración guiada', desc: 'Técnicas científicas para calmar la ansia en minutos.' },
  { icon: Brain, title: 'Reprogramación mental', desc: 'Reestructura tus hábitos con técnicas cognitivas probadas.' },
  { icon: Shield, title: 'Modo emergencia', desc: 'Intervención inmediata cuando la ansia aparece.' },
  { icon: Heart, title: 'Sin juicios', desc: 'Si recaes, te ayudamos a volver. Sin culpa, con plan.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative max-w-lg mx-auto px-6 pt-16 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
              <Wind size={14} />
              Basado en evidencia científica
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-4">
              Rewire<br />
              <span className="text-primary">Smoke</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed">
              Tu sistema diario para dejar de fumar. Sin moralina. Con ciencia, respiración y micro-acciones que funcionan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-full px-8 font-semibold">
                <Link to="/auth">
                  Empezar gratis
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/sessions">Ver sesiones</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-lg mx-auto px-6 py-16">
        <div className="grid gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="flex gap-4 p-4 rounded-xl bg-card shadow-card"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <f.icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
                <p className="text-muted-foreground text-sm mt-0.5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-lg mx-auto px-6 py-12">
        <h2 className="text-2xl font-serif font-bold text-center text-foreground mb-2">Cómo funciona</h2>
        <p className="text-muted-foreground text-center text-sm mb-8">3 pasos, tu ritmo, sin presión</p>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Configura tu plan', desc: 'Define tu objetivo, disparadores y fecha. 5 minutos.' },
            { step: '2', title: 'Practica cada día', desc: 'Micro-acciones, respiración y sesiones de 2-10 minutos.' },
            { step: '3', title: 'Supera las ansias', desc: 'Modo emergencia con intervención inmediata cuando lo necesites.' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="flex gap-4 items-start"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="max-w-lg mx-auto px-6 py-12 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Rewire Smoke no sustituye el consejo médico profesional. Si experimentas ansiedad, depresión, 
          estás embarazada o tomas medicación, consulta a tu médico antes de usar esta aplicación.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-lg mx-auto px-6 pb-16 text-center">
        <Button asChild size="lg" className="rounded-full px-10 font-semibold">
          <Link to="/auth">
            Empezar ahora
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
