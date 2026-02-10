import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Wind, HeartPulse, BookOpen, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';

const sections = [
  {
    icon: Brain,
    title: 'El subconsciente y los hábitos',
    content: `El 95% de nuestras decisiones diarias son automáticas, gestionadas por los ganglios basales —una región del cerebro que automatiza patrones repetidos. Fumar se convierte en un «programa» grabado en esta área tras miles de repeticiones.

Cada vez que enciendes un cigarrillo en respuesta a un disparador (estrés, café, aburrimiento), el circuito se refuerza. La nicotina libera dopamina en el nucleus accumbens, creando una asociación de recompensa que el cerebro subconsciente interpreta como «esto es importante para sobrevivir».

Para reprogramar un hábito, la neurociencia muestra que se necesitan tres elementos:
• Interrumpir la respuesta automática (técnica de pausa/respiración)
• Sustituir la conducta por una alternativa que active el mismo circuito de recompensa
• Repetir la nueva conducta hasta que se automatice (~66 días según Phillippa Lally, UCL)`,
    refs: [
      { text: 'Lally et al. (2010). "How are habits formed." European Journal of Social Psychology', url: 'https://doi.org/10.1002/ejsp.674' },
      { text: 'Graybiel, A.M. (2008). "Habits, Rituals, and the Evaluative Brain." Annual Review of Neuroscience', url: 'https://doi.org/10.1146/annurev.neuro.29.051605.112851' },
    ],
  },
  {
    icon: Wind,
    title: 'Respiración y sistema nervioso',
    content: `La respiración controlada activa directamente el nervio vago, principal regulador del sistema nervioso parasimpático. Cuando exhalas más largo que inhalas (ej: 4-7-8), la frecuencia cardíaca baja, el cortisol disminuye, y la amígdala (centro del miedo y la ansiedad) reduce su actividad.

La técnica de coherencia cardíaca (5-5: inhalar 5s, exhalar 5s) fue validada por el HeartMath Institute y utilizada en programas militares de control de estrés. Solo 5 minutos al día reducen significativamente la reactividad al estrés.

Un estudio publicado en Addictive Behaviors (2013) demostró que ejercicios de respiración controlada redujeron la intensidad del craving de tabaco en un 30% en comparación con el grupo control.`,
    refs: [
      { text: 'Zaccaro et al. (2018). "How Breath-Control Can Change Your Life." Frontiers in Human Neuroscience', url: 'https://doi.org/10.3389/fnhum.2018.00353' },
      { text: 'McClernon et al. (2013). "Pranayamic breathing and smoking cessation." Addictive Behaviors', url: 'https://doi.org/10.1016/j.addbeh.2013.06.002' },
    ],
  },
  {
    icon: HeartPulse,
    title: 'Ondas cerebrales y binaural beats',
    content: `Rewire Smoke utiliza frecuencias binaurales de 10Hz (ondas alfa) durante las sesiones de meditación. Las ondas alfa (8-12Hz) se asocian con estados de relajación alerta, receptividad mental y reducción de ansiedad.

El mecanismo funciona así: al reproducir un tono de 200Hz en un oído y 210Hz en el otro, el cerebro genera internamente una oscilación de 10Hz (la diferencia), un fenómeno documentado por Gerald Oster en Scientific American (1973).

Un meta-análisis de García-Argibay et al. (2019) publicado en Psychological Research confirmó que los binaural beats en rango alfa producen reducciones significativas en la ansiedad estado (d = -0.45).`,
    refs: [
      { text: 'García-Argibay et al. (2019). "Efficacy of binaural auditory beats." Psychological Research', url: 'https://doi.org/10.1007/s00426-019-01235-2' },
      { text: 'Oster, G. (1973). "Auditory Beats in the Brain." Scientific American', url: 'https://www.scientificamerican.com/' },
    ],
  },
  {
    icon: BookOpen,
    title: 'Urge surfing y mindfulness',
    content: `La técnica de «surfear el craving» (urge surfing) fue desarrollada por el Dr. Alan Marlatt en la Universidad de Washington. Se basa en un principio simple: los cravings son como olas — suben, alcanzan un pico, y bajan solos en 3-5 minutos si no los alimentas.

Un ensayo clínico randomizado de Brewer et al. (2011) publicado en Drug and Alcohol Dependence demostró que el mindfulness-based training fue más efectivo que el tratamiento estándar (American Lung Association) para dejar de fumar, con tasas de abstinencia un 31% mayores a las 17 semanas.

La reestructuración cognitiva —otra técnica usada en Rewire Smoke— ayuda a cuestionar pensamientos automáticos como «solo uno no pasa nada», desarmando los argumentos que el hábito utiliza para perpetuarse.`,
    refs: [
      { text: 'Brewer et al. (2011). "Mindfulness training for smoking cessation." Drug and Alcohol Dependence', url: 'https://doi.org/10.1016/j.drugalcdep.2011.05.027' },
      { text: 'Marlatt, G.A. & Gordon, J.R. (1985). Relapse Prevention. Guilford Press', url: '' },
    ],
  },
];

export default function Science() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-serif font-bold text-foreground">La ciencia detrás</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Todo lo que hacemos está basado en investigación publicada y revisada por pares.
          </p>
        </motion.div>

        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="p-5 rounded-2xl bg-card shadow-card border border-border/50 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-primary" />
              </div>
              <h2 className="font-serif font-bold text-foreground text-base">{s.title}</h2>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{s.content}</p>
            {s.refs.length > 0 && (
              <div className="pt-2 border-t border-border/40 space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Referencias</p>
                {s.refs.map((r, j) => (
                  <p key={j} className="text-xs text-muted-foreground leading-snug">
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-start gap-1">
                        {r.text} <ExternalLink size={10} className="mt-0.5 flex-shrink-0" />
                      </a>
                    ) : r.text}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
