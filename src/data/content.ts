// All content data for Rewire Smoke

export interface Session {
  id: string;
  type: 'breathing' | 'mindfulness' | 'reprogramming' | 'urge_surfing';
  title: string;
  durationMinutes: number;
  scriptText: string;
  tags: string[];
  premium?: boolean;
}

export interface IfThenRule {
  id: string;
  ifTrigger: string;
  thenAction: string;
}

export interface DailyMessage {
  id: number;
  text: string;
}

export const breathingSessions: Session[] = [
  {
    id: 'b1', type: 'breathing', title: 'Respiración de caja 4-4-4-4',
    durationMinutes: 4, tags: ['calma', 'craving', 'ansiedad'],
    scriptText: 'Ponte cómodo, cierra los ojos si quieres, y vamos a respirar juntos.\n\nInhala despacio por la nariz... uno, dos, tres, cuatro.\n\nAhora mantén el aire... uno, dos, tres, cuatro.\n\nExhala suavemente por la boca... uno, dos, tres, cuatro.\n\nY quédate vacío un momento... uno, dos, tres, cuatro.\n\nMuy bien. Vamos otra vez.\n\nInhala... deja que el aire llene tu pecho poco a poco.\n\nMantén... sin forzar, solo sostén.\n\nExhala... suelta todo lo que no necesitas.\n\nY vacío... disfruta ese silencio interior.\n\nCada vez que respiras así, la tensión se va disolviendo. Si notas un craving, no luches contra él. Es como una ola: sube, se mantiene un momento, y después baja sola. Tú solo tienes que seguir respirando, y dejarla pasar.'
  },
  {
    id: 'b2', type: 'breathing', title: 'Respiración 4-7-8 para calma profunda',
    durationMinutes: 5, tags: ['noche', 'ansiedad', 'calma'],
    scriptText: 'Inhala por la nariz contando 4... Mantén el aire contando 7... Exhala lentamente por la boca contando 8... Esta técnica activa tu sistema parasimpático. Cada exhalación larga le dice a tu cuerpo: estás a salvo. No necesitas el cigarro para calmarte.'
  },
  {
    id: 'b3', type: 'breathing', title: 'Coherencia cardíaca 5-5',
    durationMinutes: 5, tags: ['equilibrio', 'estrés', 'diario'],
    scriptText: 'Inhala 5 segundos... Exhala 5 segundos... Sin pausa. Un ritmo constante que sincroniza corazón y cerebro. 5 minutos al día reducen cortisol y mejoran tu capacidad de resistir impulsos. Eres más fuerte de lo que el hábito te hace creer.'
  },
  {
    id: 'b4', type: 'breathing', title: 'Respiración de emergencia rápida',
    durationMinutes: 2, tags: ['craving', 'emergencia', 'rápido'],
    scriptText: 'Inhala profundo 3 segundos... Exhala el doble, 6 segundos... Repite 8 veces. Esto es tu extintor. El craving dura 3-5 minutos. Tú puedes respirar 2 minutos. Cuando termines, la urgencia habrá bajado.'
  },
  {
    id: 'b5', type: 'breathing', title: 'Respiración para después de comer',
    durationMinutes: 3, tags: ['post-comida', 'hábito', 'digestión'],
    scriptText: 'Después de comer, el cuerpo busca el ritual del cigarro. Hoy lo reemplazas: inhala 4... exhala 6... Siente cómo tu estómago se relaja. La asociación comida-cigarro se debilita cada vez que eliges respirar en su lugar.'
  },
  {
    id: 'b6', type: 'breathing', title: 'Respiración matutina energizante',
    durationMinutes: 3, tags: ['mañana', 'energía', 'despertar'],
    scriptText: 'Al despertar, antes de pensar en fumar: 3 respiraciones profundas con los ojos cerrados. Inhala expandiendo el pecho... Exhala con un suspiro audible... Tu primer acto del día es elegir oxígeno puro. Eso define quién eres hoy.'
  },
  {
    id: 'b7', type: 'breathing', title: 'Respiración anti-estrés laboral',
    durationMinutes: 4, tags: ['trabajo', 'estrés', 'pausa'], premium: true,
    scriptText: 'En tu escritorio o de pie. Inhala 4... Exhala 6... 10 ciclos. No necesitas salir a fumar para hacer una pausa. Esta respiración ES tu pausa. Más efectiva, más rápida, sin humo. Tu cerebro recibe más oxígeno que con cualquier cigarro.'
  },
  {
    id: 'b8', type: 'breathing', title: 'Respiración con visualización',
    durationMinutes: 5, tags: ['visualización', 'calma', 'profunda'], premium: true,
    scriptText: 'Cierra los ojos. Inhala e imagina aire limpio llenando tus pulmones como luz verde... Exhala e imagina humo gris saliendo... Cada respiración limpia un poco más. Tus pulmones se regeneran. Ya está ocurriendo.'
  },
  {
    id: 'b9', type: 'breathing', title: 'Respiración para ansiedad social',
    durationMinutes: 3, tags: ['social', 'alcohol', 'fiesta'], premium: true,
    scriptText: 'En situaciones sociales donde otros fuman: retírate un momento. Inhala 3... Exhala 5... Tu decisión no necesita explicación. Puedes estar en el grupo sin fumar. La incomodidad dura minutos, el orgullo dura todo el día.'
  },
  {
    id: 'b10', type: 'breathing', title: 'Respiración para insomnio',
    durationMinutes: 6, tags: ['noche', 'insomnio', 'sueño'], premium: true,
    scriptText: 'Acostado, ojos cerrados. Inhala 4... Mantén 7... Exhala 8... Progresivamente más lento. Tu cuerpo ya no necesita nicotina para relajarse. Tienes esta herramienta. Cada exhalación te acerca al sueño. Suelta el día. Suelta el hábito.'
  },
  {
    id: 'b11', type: 'breathing', title: 'Micro-respiración 60 segundos',
    durationMinutes: 1, tags: ['rápido', 'emergencia', 'cualquier-momento'],
    scriptText: '4 respiraciones profundas en 60 segundos. Inhala máximo... Exhala todo... El craving no puede sobrevivir si tú sigues respirando conscientemente. Un minuto. Eso es todo lo que necesitas.'
  },
  {
    id: 'b12', type: 'breathing', title: 'Respiración de gratitud',
    durationMinutes: 4, tags: ['positivo', 'motivación', 'bienestar'], premium: true,
    scriptText: 'Inhala y piensa en algo bueno de hoy... Exhala y agradece a tu cuerpo por resistir... Inhala y piensa en alguien que te importa... Exhala y siente que lo haces también por ellos. La gratitud y el craving no pueden coexistir en el mismo momento.'
  },
];

export const urgeSurfingSessions: Session[] = [
  {
    id: 'u1', type: 'urge_surfing', title: 'Urge surfing clásico',
    durationMinutes: 3, tags: ['craving', 'fundamental', 'aceptación'],
    scriptText: 'Nota el craving. No luches. Observa: ¿dónde lo sientes? ¿Garganta, pecho, manos? Dale una forma, un color. Ahora observa cómo cambia... sube... llega al pico... y empieza a bajar. Como una ola. Tú estás en la orilla, mirando. No eres la ola. En 90 segundos el pico habrá pasado.'
  },
  {
    id: 'u2', type: 'urge_surfing', title: 'El craving como visitante',
    durationMinutes: 3, tags: ['aceptación', 'metáfora'],
    scriptText: 'Imagina que el craving es un visitante que llama a tu puerta. No tienes que abrirle. Puedes observarlo por la ventana. Viene, espera, y al ver que no abres... se va. Cada vez que no abres, viene menos. Tú decides quién entra en tu casa.'
  },
  {
    id: 'u3', type: 'urge_surfing', title: 'Escaneo corporal del craving',
    durationMinutes: 3, tags: ['cuerpo', 'mindfulness', 'sensaciones'],
    scriptText: 'Cierra los ojos. Escanea tu cuerpo de pies a cabeza. ¿Dónde está la tensión? ¿En el pecho? ¿En las manos? Lleva tu atención ahí. Respira hacia esa zona. La tensión no es peligrosa. Es solo tu cuerpo pidiendo algo que ya no necesita. Respira. Suelta.'
  },
  {
    id: 'u4', type: 'urge_surfing', title: 'Cuenta atrás desde 10',
    durationMinutes: 2, tags: ['rápido', 'distracción', 'emergencia'],
    scriptText: '10... respira. 9... nota tus pies en el suelo. 8... siente tus manos. 7... escucha un sonido cercano. 6... el craving está ahí, pero tú también. 5... ya estás a la mitad. 4... está bajando. 3... casi. 2... un respiro más. 1... Lo hiciste. El pico pasó.'
  },
  {
    id: 'u5', type: 'urge_surfing', title: 'Diálogo con el hábito',
    durationMinutes: 3, tags: ['cognitivo', 'reflexión'], premium: true,
    scriptText: 'El hábito dice: "Solo uno". Tú respondes: "Conozco ese truco. Uno nunca es uno." El hábito dice: "Te sentirás mejor." Tú: "Me sentiré peor en 5 minutos y lo sabes." El hábito no tiene argumentos nuevos. Tú sí tienes respuestas nuevas.'
  },
  {
    id: 'u6', type: 'urge_surfing', title: 'La técnica de los 5 sentidos',
    durationMinutes: 2, tags: ['grounding', 'presente', 'rápido'],
    scriptText: 'Ahora mismo, nombra: 5 cosas que ves. 4 que puedes tocar. 3 que oyes. 2 que hueles. 1 que saboreas. Acabas de traer tu mente al presente. El craving vive en el futuro ("necesitaré fumar"). En el presente, estás bien.'
  },
  {
    id: 'u7', type: 'urge_surfing', title: 'Manos ocupadas',
    durationMinutes: 2, tags: ['físico', 'sustitución', 'manos'],
    scriptText: 'Tus manos buscan el cigarro. Dales algo: aprieta un bolígrafo, juega con una moneda, estira los dedos uno a uno. Toca texturas diferentes. Tu cerebro necesita input táctil. Dáselo sin humo. 2 minutos de manos ocupadas = craving superado.'
  },
  {
    id: 'u8', type: 'urge_surfing', title: 'Carta a tu yo futuro',
    durationMinutes: 3, tags: ['motivación', 'perspectiva', 'escritura'], premium: true,
    scriptText: 'Imagina que te escribes desde dentro de 1 año. ¿Qué te dice ese yo que dejó de fumar? "Gracias por aguantar ese craving. Valió la pena. Respiro mejor, huelo mejor, duermo mejor." Ese mensaje viene del futuro. Hazlo real.'
  },
  {
    id: 'u9', type: 'urge_surfing', title: 'El semáforo del craving',
    durationMinutes: 2, tags: ['estructura', 'pasos', 'rápido'],
    scriptText: 'ROJO: Para. No hagas nada durante 10 segundos. AMARILLO: Piensa. ¿Qué disparó esto? ¿Realmente quieres fumar o es automático? VERDE: Actúa. Elige tu alternativa: agua, respiración, caminar. El semáforo te da tiempo. El tiempo mata al craving.'
  },
  {
    id: 'u10', type: 'urge_surfing', title: 'Reencuadre del placer',
    durationMinutes: 3, tags: ['cognitivo', 'profundo', 'reencuadre'], premium: true,
    scriptText: 'El cigarro no da placer. Alivia la abstinencia que él mismo creó. Es como quitarte un zapato apretado: el alivio no es placer, es volver a la normalidad. Cada día sin fumar, tu normalidad mejora. El placer real es respirar sin tos, saborear la comida, subir escaleras sin jadear.'
  },
];

export const mindfulnessSessions: Session[] = [
  {
    id: 'm1', type: 'mindfulness', title: 'Mini meditación: ancla al presente',
    durationMinutes: 3, tags: ['básico', 'presente', 'calma'],
    scriptText: 'Siéntate. Cierra los ojos. Siente el peso de tu cuerpo. Escucha los sonidos a tu alrededor sin juzgarlos. Nota tu respiración natural, sin cambiarla. Si aparece un pensamiento sobre fumar, obsérvalo como una nube que pasa. No lo sigas. Vuelve a tu respiración. Estás aquí. Estás bien.'
  },
  {
    id: 'm2', type: 'mindfulness', title: 'Meditación de auto-compasión',
    durationMinutes: 5, tags: ['compasión', 'recaída', 'perdón'],
    scriptText: 'Pon una mano en tu pecho. Siente tu corazón. Dite: "Dejar de fumar es difícil. Millones de personas luchan con esto. No estoy solo." Repite: "Me trato con la misma amabilidad que trataría a un amigo." Si has recaído: "Un tropiezo no borra el camino. Sigo adelante."'
  },
  {
    id: 'm3', type: 'mindfulness', title: 'Body scan para tensión',
    durationMinutes: 5, tags: ['cuerpo', 'tensión', 'relajación'],
    scriptText: 'Desde los pies hasta la cabeza, nota cada zona. Pies... piernas... abdomen... pecho... hombros... cuello... mandíbula... frente. ¿Dónde hay tensión? Respira hacia ahí. No tienes que arreglar nada. Solo notar. La consciencia corporal reduce la reactividad al craving un 40%.'
  },
  {
    id: 'm4', type: 'mindfulness', title: 'Meditación caminando',
    durationMinutes: 5, tags: ['movimiento', 'exterior', 'alternativa'], premium: true,
    scriptText: 'Camina despacio. Siente cada paso: talón, planta, dedos. Nota el aire en tu cara. El movimiento de tus brazos. Cuando la mente se vaya al cigarro, vuelve a tus pies. Caminar 5 minutos reduce el craving tanto como cualquier técnica. Y además, te mueves.'
  },
  {
    id: 'm5', type: 'mindfulness', title: 'Meditación de identidad',
    durationMinutes: 5, tags: ['identidad', 'cambio', 'profunda'], premium: true,
    scriptText: 'Imagina a tu yo no fumador. ¿Cómo huele? ¿Cómo respira? ¿Qué hace por las mañanas? ¿Cómo se siente después de comer? Ese yo no es un extraño. Es tú, sin el hábito. Cada día que no fumas, te acercas más a esa versión. Ya estás en camino.'
  },
  {
    id: 'm6', type: 'mindfulness', title: 'Meditación: soltar el control',
    durationMinutes: 3, tags: ['aceptación', 'ACT', 'soltar'],
    scriptText: 'No tienes que controlar cada pensamiento. El pensamiento "quiero fumar" puede estar ahí sin que actúes. Es como un ruido de fondo. Aparece, está, se va. No tienes que apagarlo. Solo tienes que no levantarte a comprar. Eso es todo.'
  },
  {
    id: 'm7', type: 'mindfulness', title: 'Meditación de las manos',
    durationMinutes: 2, tags: ['rápido', 'táctil', 'presente'],
    scriptText: 'Frota tus manos 10 segundos. Sepáralas. Siente el calor entre ellas. Lentamente, acércalas. ¿Notas una resistencia, un cosquilleo? Esa sensación eres tú, presente, vivo, sin necesitar nada más en este instante.'
  },
  {
    id: 'm8', type: 'mindfulness', title: 'Meditación para dormir sin fumar',
    durationMinutes: 10, tags: ['noche', 'sueño', 'relajación'], premium: true,
    scriptText: 'Acostado. Ojos cerrados. Repasa tu día sin juzgar. Cada momento que no fumaste, reconócelo. Ahora suelta el día entero. Cuenta de 10 a 1, y con cada número siente cómo te hundes un poco más en la cama. Tu cuerpo se regenera mientras duermes. Tus pulmones trabajan para limpiarse. Déjalos.'
  },
  {
    id: 'm9', type: 'mindfulness', title: 'Meditación de los sonidos',
    durationMinutes: 3, tags: ['atención', 'presente', 'sensorial'],
    scriptText: 'Sin cerrar los ojos. Escucha el sonido más lejano que puedas detectar. Ahora uno más cercano. Y otro más cercano. Hasta tu propia respiración. Acabas de entrenar tu atención. Una mente que sabe dónde enfocar no se deja arrastrar por cualquier craving.'
  },
  {
    id: 'm10', type: 'mindfulness', title: 'Gratitud express',
    durationMinutes: 2, tags: ['positivo', 'motivación', 'rápido'],
    scriptText: 'Piensa en 3 cosas buenas de hoy. No tienen que ser grandes: un café, una sonrisa, 5 minutos de sol. Ahora añade una: "No fumé" o "Resistí un craving." Eso también cuenta. La gratitud no es cursi. Es un antídoto contra la frustración que alimenta la recaída.'
  },
];

export const reprogrammingSessions: Session[] = [
  {
    id: 'r1', type: 'reprogramming', title: 'Desaprender el hábito',
    durationMinutes: 8, tags: ['fundamental', 'hábito', 'inicio'],
    scriptText: 'Cierra los ojos. Visualiza tu rutina de fumar: el momento, el gesto, la sensación. Ahora rebobina. Vuelve al momento ANTES de encender. ¿Qué sientes? ¿Qué necesitas realmente? Ahora imagina que en ese momento, en vez de fumar, haces 3 respiraciones profundas y bebes un vaso de agua. Siente cómo tu cuerpo se relaja igual. Mejor, incluso. Repite esta escena 3 veces. Cada repetición mental debilita la conexión automática. Eres tú reprogramando tu cerebro.\n\n⚠️ Nota: Esto es una técnica de enfoque y visualización. La evidencia sobre autosugestión varía según la persona. Úsalo si te funciona como complemento.'
  },
  {
    id: 'r2', type: 'reprogramming', title: 'Identidad: soy no fumador',
    durationMinutes: 7, tags: ['identidad', 'cambio', 'profunda'],
    scriptText: 'Relájate. Respira 3 veces profundo. Ahora repite internamente: "Yo soy una persona que no fuma." No "estoy dejando de fumar." No "intento no fumar." Soy una persona que no fuma. Visualiza un día completo como esa persona: te despiertas, desayunas, trabajas, comes, descansas, duermes. Sin cigarro. Con energía. Con orgullo. Esa persona eres tú. Ya existe dentro de ti.\n\n⚠️ Técnica de visualización. Complemento, no tratamiento.'
  },
  {
    id: 'r3', type: 'reprogramming', title: 'Romper el vínculo café-cigarro',
    durationMinutes: 6, tags: ['café', 'trigger', 'específico'],
    scriptText: 'Imagina que te sirves un café. Lo hueles. Lo saboreas. Y la mano NO busca el cigarro. Saborea el café por sí solo. ¿A qué sabe de verdad, sin humo? Más dulce, más rico, más limpio. Repite: "El café es placer. El cigarro era costumbre." Cada café sin cigarro rompe un eslabón de la cadena. Hoy rompes uno más.\n\n⚠️ Técnica de visualización y reencuadre. Úsalo como complemento.'
  },
  {
    id: 'r4', type: 'reprogramming', title: 'Calma nocturna',
    durationMinutes: 10, tags: ['noche', 'relajación', 'sueño'], premium: true,
    scriptText: 'Acostado. Relajado. Cuenta 10 respiraciones lentas. Con cada exhalación, repite mentalmente: "Mi cuerpo se limpia." Siente cómo tus pulmones se expanden más que ayer. Imagina cada célula reparándose mientras duermes. Mañana despertarás un poco más libre. Un poco más tú. El sueño es tu aliado. Tu cuerpo trabaja para ti incluso cuando descansas.\n\n⚠️ Técnica de relajación y visualización. Complemento, no sustituto médico.'
  },
  {
    id: 'r5', type: 'reprogramming', title: 'Anclaje de calma: gesto + respiración',
    durationMinutes: 5, tags: ['anclaje', 'técnica', 'herramienta'], premium: true,
    scriptText: 'Vamos a crear tu ancla personal. Junta pulgar e índice suavemente. Inhala 4 segundos. Mientras exhalas, repite: "Yo decido." Practica 5 veces. Junta-inhala-exhala-"Yo decido." A partir de ahora, este gesto + frase es tu botón de calma. Úsalo en cualquier momento de craving. Cuanto más practiques, más fuerte será la asociación.\n\n⚠️ Técnica de condicionamiento. Eficacia variable. Complemento.'
  },
  {
    id: 'r6', type: 'reprogramming', title: 'Diálogo con el cerebro automático',
    durationMinutes: 7, tags: ['coach', 'diálogo', 'reflexión'], premium: true,
    scriptText: 'Tu cerebro automático dice: "Fuma." Pregúntale: ¿Qué necesitas realmente? ¿Calma? Respira. ¿Conexión? Llama a alguien. ¿Pausa? Sal a caminar. ¿Placer? Come algo rico. Detrás del craving siempre hay una necesidad legítima. El cigarro era una respuesta perezosa a necesidades reales. Ahora tienes respuestas mejores.\n\n⚠️ Ejercicio de autoconocimiento. No sustituye orientación profesional.'
  },
];

export const autosuggestionPhrases = [
  "Respiro y el ansia baja.",
  "Yo decido, no el hábito.",
  "Mi cuerpo se limpia con cada hora sin fumar.",
  "Soy más fuerte que un craving de 3 minutos.",
  "El cigarro no me da nada que yo no pueda darme solo.",
  "Cada día sin fumar es un regalo a mi futuro.",
  "Merezco respirar limpio.",
  "El craving pasa. Mi decisión permanece.",
  "No necesito fumar para estar bien. Ya estoy bien.",
  "Elijo salud. Elijo libertad. Elijo yo.",
];

export const defaultIfThenRules: IfThenRule[] = [
  { id: 'it1', ifTrigger: 'Me apetece fumar al café', thenAction: '8 respiraciones + beber agua + chicle' },
  { id: 'it2', ifTrigger: 'Estrés en el trabajo', thenAction: 'Respiración de caja 2 min + caminar al baño' },
  { id: 'it3', ifTrigger: 'Después de comer', thenAction: 'Lavarse los dientes + 3 respiraciones profundas' },
  { id: 'it4', ifTrigger: 'Veo a alguien fumando', thenAction: 'Mirar hacia otro lado + frase ancla "Yo decido"' },
  { id: 'it5', ifTrigger: 'Aburrimiento', thenAction: 'Mini meditación 2 min + beber agua fría' },
  { id: 'it6', ifTrigger: 'Alcohol / fiesta', thenAction: 'Tener chicle siempre + respiración anti-social + irme 5 min' },
  { id: 'it7', ifTrigger: 'Conducir', thenAction: 'Música motivadora + agua + pastilla de menta' },
  { id: 'it8', ifTrigger: 'Al despertar', thenAction: 'Ducha inmediata + 3 respiraciones + desayunar primero' },
  { id: 'it9', ifTrigger: 'Discusión / enfado', thenAction: 'Contar hasta 10 + respiración 4-7-8 + escribir lo que siento' },
  { id: 'it10', ifTrigger: 'Antes de dormir', thenAction: 'Infusión + sesión de calma nocturna + leer 10 min' },
  { id: 'it11', ifTrigger: 'Pausa en el trabajo', thenAction: 'Caminar 3 min + agua + fruta' },
  { id: 'it12', ifTrigger: 'Hablar por teléfono', thenAction: 'Jugar con un bolígrafo + andar por casa' },
  { id: 'it13', ifTrigger: 'Esperar (cola, transporte)', thenAction: 'Podcast o música + respiración sutil' },
  { id: 'it14', ifTrigger: 'Terminar una tarea', thenAction: 'Estirarse + agua + mini meditación de gratitud' },
  { id: 'it15', ifTrigger: 'Craving intenso inesperado', thenAction: 'Urge surfing + llamar a alguien + salir de la habitación' },
];

export const alternativeResponses = [
  { trigger: 'Estrés', alternatives: ['Respiración de caja', 'Caminar 5 min', 'Apretar pelota anti-estrés', 'Escribir 3 líneas sobre lo que sientes'] },
  { trigger: 'Aburrimiento', alternatives: ['Puzzle en el móvil', 'Llamar a alguien', 'Ordenar un cajón', 'Leer un artículo corto'] },
  { trigger: 'Café', alternatives: ['Cambiar a té verde', 'Añadir canela al café', 'Chicle de menta', 'Lavarse los dientes después'] },
  { trigger: 'Alcohol', alternatives: ['Beber agua entre copas', 'Masticar palito de regaliz', 'Salir de la zona fumadores', 'Irse antes'] },
  { trigger: 'Después de comer', alternatives: ['Lavarse los dientes', 'Manzana', 'Caminar 3 min', 'Infusión de menta'] },
  { trigger: 'Conducir', alternatives: ['Radio/podcast', 'Agua fría', 'Caramelo sin azúcar', 'Cantar'] },
  { trigger: 'Despertar', alternatives: ['Ducha primero', 'Desayuno antes', 'Estiramiento', 'Respiración matutina'] },
  { trigger: 'Social', alternatives: ['Manos ocupadas (vaso, móvil)', 'Estar con no fumadores', 'Chicle', 'Excusa: "Lo dejé, gracias"'] },
  { trigger: 'Ansiedad', alternatives: ['4-7-8 respiración', 'Hablar con alguien', 'Escribir', 'Mini meditación'] },
  { trigger: 'Soledad', alternatives: ['Llamar a alguien', 'Pasear', 'Podcast', 'Sesión de autosugestión'] },
  { trigger: 'Celebración', alternatives: ['Brindis sin cigarro', 'Postre especial', 'Comprarte algo', 'Compartir logro'] },
  { trigger: 'Rutina', alternatives: ['Cambiar el orden de tu rutina', 'Nuevo camino al trabajo', 'Café en sitio diferente', 'Redecorar tu espacio'] },
  { trigger: 'Ira', alternatives: ['Contar hasta 20', 'Apretar hielo', 'Gritar en una almohada', 'Ejercicio intenso 2 min'] },
  { trigger: 'Tristeza', alternatives: ['Hablar con alguien', 'Música que te guste', 'Ducharte', 'Escribir lo que sientes'] },
  { trigger: 'Cansancio', alternatives: ['Siesta 15 min', 'Agua fría en la cara', 'Estiramiento', 'Snack saludable'] },
  { trigger: 'Ver tabaco', alternatives: ['Apartar la vista', 'Frase ancla', 'Salir del lugar', 'Recordar por qué lo dejas'] },
  { trigger: 'Pausa laboral', alternatives: ['Café sin cigarro', 'Caminar', 'Hablar con compañero', 'Fruta'] },
  { trigger: 'Espera', alternatives: ['Juego en móvil', 'Leer', 'Escuchar música', 'Respiración sutil'] },
  { trigger: 'Sexo', alternatives: ['Agua', 'Ducha juntos', 'Conversación', 'Fruta'] },
  { trigger: 'Estudiar', alternatives: ['Pomodoro sin cigarro', 'Té', 'Chicle', 'Estiramiento cada 25 min'] },
];

export const dailyMessages: DailyMessage[] = [
  { id: 1, text: "Hoy el ansia será un pico, no una orden. Tú decides si subes o lo dejas pasar." },
  { id: 2, text: "Cada hora sin fumar, tu cuerpo está sanando. No lo ves, pero está pasando ahora mismo." },
  { id: 3, text: "No necesitas ser perfecto. Solo necesitas no fumar hoy. Mañana es otro día." },
  { id: 4, text: "El craving medio dura 3-5 minutos. Tú has aguantado cosas mucho peores." },
  { id: 5, text: "Recuerda: no estás 'dejando' nada valioso. Estás ganando todo." },
  { id: 6, text: "Tu cerebro te dice que necesitas nicotina. Tu cerebro miente. En 72h dejará de insistir tanto." },
  { id: 7, text: "Si hoy es difícil, es porque tu cerebro se está recableando. Eso es progreso, no sufrimiento." },
  { id: 8, text: "Cada cigarro que NO fumas es una victoria. Celebra las pequeñas." },
  { id: 9, text: "¿Sabías que tu sentido del olfato mejora en 48h? Pronto olerás cosas que ni recordabas." },
  { id: 10, text: "No tienes que dejar de fumar para siempre. Solo tienes que no fumar ahora." },
  { id: 11, text: "El 95% de los ex fumadores dicen que lo mejor fue dejar de pensar en cigarros. Llegará." },
  { id: 12, text: "Si alguien te ofrece uno, di: 'No fumo.' Presente. Identidad. No 'estoy dejando.'" },
  { id: 13, text: "Los cravings vienen en oleadas. Cada ola que superas hace la siguiente más pequeña." },
  { id: 14, text: "Hoy tu circulación sanguínea está mejor que ayer. Tu cuerpo ya te lo agradece." },
  { id: 15, text: "No necesitas motivación todos los días. Solo necesitas disciplina algunos días." },
  { id: 16, text: "Si recaíste ayer: no has vuelto a cero. Has aprendido algo. ¿Qué fue?" },
  { id: 17, text: "Piensa en el dinero que llevas ahorrado. ¿Qué te regalarás cuando llegues al mes?" },
  { id: 18, text: "Tu capacidad pulmonar ya está mejorando. Sube unas escaleras y compruébalo." },
  { id: 19, text: "Dejar de fumar es como aprender a nadar: incómodo al principio, natural después." },
  { id: 20, text: "No te compares con otros. Tu proceso es tuyo. Cualquier avance cuenta." },
  { id: 21, text: "¿Momento difícil? Llama a alguien. No tiene que ser sobre fumar. Solo conecta." },
  { id: 22, text: "En 1 año tu riesgo cardíaco se habrá reducido a la mitad. Ya estás en camino." },
  { id: 23, text: "El aburrimiento no se cura con nicotina. Busca algo que te interese de verdad." },
  { id: 24, text: "Tus dientes y encías ya están mejorando. Tu sonrisa lo reflejará pronto." },
  { id: 25, text: "Hoy practica el 'no hacer nada' durante 2 minutos. Sin móvil, sin cigarro. Solo tú." },
  { id: 26, text: "¿Sabías que el ejercicio reduce los cravings? Incluso 5 minutos caminando ayudan." },
  { id: 27, text: "Tu piel se está recuperando. Más oxígeno = menos arrugas. Vanidad útil." },
  { id: 28, text: "Si alguien te dice 'solo uno no pasa nada': esa persona no entiende adicción. Tú sí." },
  { id: 29, text: "Estás haciendo algo que la mayoría de fumadores nunca intenta siquiera. Respeto." },
  { id: 30, text: "Mañana te despertarás orgulloso de hoy. Eso vale más que cualquier cigarro." },
];

export const allSessions: Session[] = [
  ...breathingSessions,
  ...urgeSurfingSessions,
  ...mindfulnessSessions,
  ...reprogrammingSessions,
];

// Pricing per pack
export const CIGARETTE_PACK_PRICE = 5.50; // euros
export const CIGARETTES_PER_PACK = 20;

export const triggerOptions = [
  'Café', 'Estrés', 'Después de comer', 'Alcohol', 'Conducir',
  'Despertar', 'Aburrimiento', 'Social', 'Trabajo', 'Ansiedad',
  'Antes de dormir', 'Hablar por teléfono',
];

export const reasonOptions = [
  'Salud', 'Familia', 'Dinero', 'Energía', 'Deporte',
  'Aspecto', 'Olor', 'Libertad', 'Ejemplo para hijos', 'Autoestima',
];

export const emotionOptions = [
  'Estrés', 'Aburrimiento', 'Ansiedad', 'Social', 'Tristeza',
  'Ira', 'Cansancio', 'Celebración', 'Soledad',
];
