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
    scriptText: 'Vamos a hacer algo muy sencillo que va a calmar todo tu sistema nervioso.\n\nInhala por la nariz... uno, dos, tres, cuatro.\n\nAhora mantén el aire dentro... uno, dos, tres, cuatro, cinco, seis, siete.\n\nY exhala muy despacio por la boca... uno, dos, tres, cuatro, cinco, seis, siete, ocho.\n\nQué bien. Otra vez.\n\nInhala... deja que entre el aire sin prisa.\n\nMantén... tu cuerpo está absorbiendo todo ese oxígeno.\n\nY exhala... largo, suave, como si soplaras una vela muy lejana.\n\nEsta exhalación tan larga activa tu sistema de calma. Cada vez que exhalas más de lo que inhalas, le estás diciendo a tu cuerpo: estás a salvo. No necesitas nada más. Solo seguir respirando así.'
  },
  {
    id: 'b3', type: 'breathing', title: 'Coherencia cardíaca 5-5',
    durationMinutes: 5, tags: ['equilibrio', 'estrés', 'diario'],
    scriptText: 'Este ejercicio es como un metrónomo para tu corazón y tu mente.\n\nInhala durante cinco segundos... uno, dos, tres, cuatro, cinco.\n\nExhala durante cinco segundos... uno, dos, tres, cuatro, cinco.\n\nSin pausa entre medias. Un ritmo continuo, como las olas del mar.\n\nInhala... siente cómo tu pecho se expande.\n\nExhala... siente cómo se vacía.\n\nEste ritmo constante sincroniza tu corazón con tu cerebro. Solo cinco minutos al día reducen el cortisol y mejoran tu capacidad de resistir impulsos.\n\nInhala... eres más fuerte de lo que el hábito te hace creer.\n\nExhala... y con cada respiración, lo demuestras.'
  },
  {
    id: 'b4', type: 'breathing', title: 'Respiración de emergencia rápida',
    durationMinutes: 2, tags: ['craving', 'emergencia', 'rápido'],
    scriptText: 'Esto es rápido y directo. Tu extintor personal.\n\nInhala profundo... uno, dos, tres.\n\nExhala el doble de largo... uno, dos, tres, cuatro, cinco, seis.\n\nOtra vez. Inhala... tres segundos.\n\nExhala... seis segundos.\n\nSigue así. No tienes que pensar en nada más.\n\nEl craving dura entre tres y cinco minutos. Tú solo necesitas respirar durante dos. Cuando termines, la urgencia habrá bajado. Ya lo estás haciendo.'
  },
  {
    id: 'b5', type: 'breathing', title: 'Respiración para después de comer',
    durationMinutes: 3, tags: ['post-comida', 'hábito', 'digestión'],
    scriptText: 'Acabas de comer, y tu cuerpo busca algo familiar. El ritual de siempre. Hoy vamos a reemplazarlo.\n\nInhala por la nariz... uno, dos, tres, cuatro.\n\nExhala por la boca... uno, dos, tres, cuatro, cinco, seis.\n\nSiente cómo tu estómago se relaja con cada respiración.\n\nInhala... llenando el abdomen.\n\nExhala... soltando la tensión.\n\nCada vez que eliges respirar en lugar de fumar después de comer, la asociación se debilita un poco más. Es así de simple. Respira, y la cadena se afloja.'
  },
  {
    id: 'b6', type: 'breathing', title: 'Respiración matutina energizante',
    durationMinutes: 3, tags: ['mañana', 'energía', 'despertar'],
    scriptText: 'Buenos días. Antes de que tu mente empiece a pedir nada, vamos a respirar.\n\nInhala profundo, expandiendo todo el pecho... y exhala con un suspiro, suelta todo el aire.\n\nOtra vez. Inhala... grande, hasta llenar los pulmones.\n\nExhala... con sonido, un suspiro bien largo.\n\nUna más. Inhala... siente cómo despiertas por dentro.\n\nExhala... y suelta lo que quede de la noche.\n\nTu primer acto del día ha sido elegir oxígeno puro. Eso dice mucho de quién eres hoy.'
  },
  {
    id: 'b7', type: 'breathing', title: 'Respiración anti-estrés laboral',
    durationMinutes: 4, tags: ['trabajo', 'estrés', 'pausa'], premium: true,
    scriptText: 'Puedes hacer esto en tu escritorio, o de pie, donde estés.\n\nInhala por la nariz... uno, dos, tres, cuatro.\n\nExhala por la boca... uno, dos, tres, cuatro, cinco, seis.\n\nDiez ciclos así. No necesitas salir a ningún sitio.\n\nInhala... esta respiración es tu pausa.\n\nExhala... más efectiva y más rápida que cualquier cigarro.\n\nInhala... tu cerebro está recibiendo más oxígeno ahora mismo.\n\nExhala... que con un cigarro. Y sin humo.\n\nSigue a tu ritmo. Diez respiraciones. Eso es todo lo que necesitas para resetear.'
  },
  {
    id: 'b8', type: 'breathing', title: 'Respiración con visualización',
    durationMinutes: 5, tags: ['visualización', 'calma', 'profunda'], premium: true,
    scriptText: 'Cierra los ojos si puedes.\n\nInhala despacio... e imagina que el aire que entra es una luz verde, limpia, que va llenando tus pulmones.\n\nExhala... e imagina que sale un humo gris, llevándose todo lo que ya no necesitas.\n\nOtra vez. Inhala... luz verde que limpia y sana.\n\nExhala... humo gris que se va para siempre.\n\nCon cada respiración, tus pulmones están un poco más limpios. Se están regenerando. Ya está ocurriendo, ahora mismo, mientras respiras así.\n\nInhala luz... exhala lo viejo. Tu cuerpo sabe cómo curarse. Solo necesita que tú le des aire limpio.'
  },
  {
    id: 'b9', type: 'breathing', title: 'Respiración para ansiedad social',
    durationMinutes: 3, tags: ['social', 'alcohol', 'fiesta'], premium: true,
    scriptText: 'Estás en un sitio donde otros fuman. Está bien. Puedes estar ahí.\n\nSi necesitas un momento, apártate un poco. Y respira.\n\nInhala... uno, dos, tres.\n\nExhala... uno, dos, tres, cuatro, cinco.\n\nTu decisión no necesita explicación. No le debes nada a nadie.\n\nInhala... puedes estar en el grupo sin fumar.\n\nExhala... la incomodidad dura unos minutos.\n\nPero el orgullo que sentirás después... eso dura todo el día.'
  },
  {
    id: 'b10', type: 'breathing', title: 'Respiración para insomnio',
    durationMinutes: 6, tags: ['noche', 'insomnio', 'sueño'], premium: true,
    scriptText: 'Estás acostado. Los ojos cerrados. No tienes que hacer nada más que respirar.\n\nInhala suavemente... uno, dos, tres, cuatro.\n\nMantén... uno, dos, tres, cuatro, cinco, seis, siete.\n\nExhala muy despacio... uno, dos, tres, cuatro, cinco, seis, siete, ocho.\n\nCada vez un poco más lento. Sin prisa. No hay ningún sitio al que ir.\n\nInhala... tu cuerpo ya no necesita nicotina para relajarse.\n\nMantén... tienes esta herramienta.\n\nExhala... y con cada exhalación te acercas un poco más al sueño.\n\nSuelta el día. Suelta el hábito. Déjate llevar.'
  },
  {
    id: 'b11', type: 'breathing', title: 'Micro-respiración 60 segundos',
    durationMinutes: 1, tags: ['rápido', 'emergencia', 'cualquier-momento'],
    scriptText: 'Un minuto. Cuatro respiraciones. Eso es todo.\n\nInhala todo lo que puedas... y exhala todo.\n\nOtra vez. Inhala al máximo... y suelta todo el aire.\n\nUna más. Inhala... profundo.\n\nExhala... largo.\n\nÚltima. Inhala... llena cada rincón.\n\nExhala... vacía todo.\n\nYa está. Un minuto. El craving no puede sobrevivir si tú sigues respirando así de consciente.'
  },
  {
    id: 'b12', type: 'breathing', title: 'Respiración de gratitud',
    durationMinutes: 4, tags: ['positivo', 'motivación', 'bienestar'], premium: true,
    scriptText: 'Inhala... y mientras entra el aire, piensa en algo bueno que te haya pasado hoy. Lo que sea.\n\nExhala... y agradece a tu cuerpo por haber resistido.\n\nInhala... y piensa en alguien que te importa.\n\nExhala... y siente que esto también lo haces por esa persona.\n\nInhala... gratitud.\n\nExhala... paz.\n\nHay algo bonito en esto: la gratitud y el craving no pueden existir en el mismo momento. Cuando agradeces, el ansia se queda sin sitio.'
  },
];

export const urgeSurfingSessions: Session[] = [
  {
    id: 'u1', type: 'urge_surfing', title: 'Urge surfing clásico',
    durationMinutes: 3, tags: ['craving', 'fundamental', 'aceptación'],
    scriptText: 'Nota el craving. Está ahí. No pasa nada.\n\nNo luches contra él. Solo obsérvalo.\n\n¿Dónde lo sientes? ¿En la garganta? ¿En el pecho? ¿En las manos? Localízalo.\n\nAhora dale una forma. Un color. Un tamaño.\n\nY observa cómo cambia... Sube poco a poco... llega al pico... se mantiene un momento... y empieza a bajar. Como una ola.\n\nTú estás en la orilla, mirando. No eres la ola. Solo la observas.\n\nEn unos noventa segundos el pico habrá pasado. Ya estás más cerca.'
  },
  {
    id: 'u2', type: 'urge_surfing', title: 'El craving como visitante',
    durationMinutes: 3, tags: ['aceptación', 'metáfora'],
    scriptText: 'Imagina que el craving es un visitante que llama a tu puerta.\n\nNo tienes que abrirle. Puedes mirarlo por la ventana.\n\nEstá ahí fuera. Llama. Espera.\n\nPero tú no abres.\n\nY al ver que no abres... se cansa. Se da la vuelta. Y se va.\n\nCada vez que no abres la puerta, la próxima vez llama con menos fuerza. Viene menos. Se cansa antes.\n\nTú decides quién entra en tu casa. Y hoy, no entra.'
  },
  {
    id: 'u3', type: 'urge_surfing', title: 'Escaneo corporal del craving',
    durationMinutes: 3, tags: ['cuerpo', 'mindfulness', 'sensaciones'],
    scriptText: 'Cierra los ojos un momento.\n\nEscanea tu cuerpo despacio, desde los pies hasta la cabeza.\n\n¿Dónde está la tensión? ¿En el pecho? ¿En las manos? ¿En la mandíbula?\n\nCuando la encuentres, lleva tu atención ahí. Y respira hacia esa zona.\n\nInhala... dirigiendo el aire hacia donde sientes la tensión.\n\nExhala... dejando que se ablande.\n\nEsa tensión no es peligrosa. Es solo tu cuerpo pidiendo algo que ya no necesita. Respira. Y suelta.'
  },
  {
    id: 'u4', type: 'urge_surfing', title: 'Cuenta atrás desde 10',
    durationMinutes: 2, tags: ['rápido', 'distracción', 'emergencia'],
    scriptText: 'Diez... respira.\n\nNueve... nota tus pies en el suelo.\n\nOcho... siente tus manos.\n\nSiete... escucha un sonido cercano.\n\nSeis... el craving está ahí, pero tú también estás.\n\nCinco... ya estás a la mitad.\n\nCuatro... está bajando.\n\nTres... casi.\n\nDos... un respiro más.\n\nUno... Lo hiciste. El pico pasó. Estás al otro lado.'
  },
  {
    id: 'u5', type: 'urge_surfing', title: 'Diálogo con el hábito',
    durationMinutes: 3, tags: ['cognitivo', 'reflexión'], premium: true,
    scriptText: 'El hábito te habla. Dice: solo uno.\n\nY tú le respondes: conozco ese truco. Uno nunca es uno.\n\nEl hábito dice: te sentirás mejor.\n\nY tú: me sentiré peor en cinco minutos, y lo sabes.\n\nEl hábito dice: esta vez es diferente.\n\nY tú: no, es exactamente igual que siempre.\n\nEl hábito no tiene argumentos nuevos. Repite lo mismo una y otra vez. Pero tú... tú sí tienes respuestas nuevas.'
  },
  {
    id: 'u6', type: 'urge_surfing', title: 'La técnica de los 5 sentidos',
    durationMinutes: 2, tags: ['grounding', 'presente', 'rápido'],
    scriptText: 'Vamos a traer tu mente al presente. Ahora mismo.\n\nNombra cinco cosas que ves a tu alrededor.\n\nCuatro cosas que puedes tocar.\n\nTres sonidos que escuchas.\n\nDos cosas que hueles.\n\nY una cosa que saboreas.\n\nAcabas de aterrizar en el aquí y ahora. El craving vive en el futuro, en el necesitaré fumar. Pero en el presente, ahora mismo, estás bien.'
  },
  {
    id: 'u7', type: 'urge_surfing', title: 'Manos ocupadas',
    durationMinutes: 2, tags: ['físico', 'sustitución', 'manos'],
    scriptText: 'Tus manos buscan algo. Echan de menos el gesto.\n\nDales algo. Coge un bolígrafo. Una moneda. Lo que tengas cerca.\n\nEstira los dedos, uno a uno. Aprieta. Suelta.\n\nToca diferentes texturas. La mesa. Tu ropa. Tu piel.\n\nTu cerebro necesita esa estimulación táctil. Solo necesita input, no humo.\n\nDos minutos de manos ocupadas... y el craving se queda sin argumentos.'
  },
  {
    id: 'u8', type: 'urge_surfing', title: 'Carta a tu yo futuro',
    durationMinutes: 3, tags: ['motivación', 'perspectiva', 'escritura'], premium: true,
    scriptText: 'Imagina que recibes una carta. Te la escribe tu yo de dentro de un año. El que ya dejó de fumar.\n\nDice algo así: Gracias. Gracias por aguantar ese craving. Sé que fue duro, pero valió la pena.\n\nRespiro mejor. Huelo mejor. Duermo mejor. Me siento libre.\n\nY todo empezó en momentos como este. Momentos en los que elegiste respirar en lugar de fumar.\n\nEse mensaje viene de tu futuro. Hazlo real.'
  },
  {
    id: 'u9', type: 'urge_surfing', title: 'El semáforo del craving',
    durationMinutes: 2, tags: ['estructura', 'pasos', 'rápido'],
    scriptText: 'Rojo. Para. No hagas nada durante diez segundos. Solo para.\n\nAmarillo. Piensa. ¿Qué ha disparado esto? ¿Realmente quieres fumar, o es un reflejo automático?\n\nVerde. Actúa. Elige tu alternativa: un vaso de agua, una respiración profunda, dar un paseo corto.\n\nEl semáforo te da algo muy valioso: tiempo. Y el tiempo... es lo que mata al craving.'
  },
  {
    id: 'u10', type: 'urge_surfing', title: 'Reencuadre del placer',
    durationMinutes: 3, tags: ['cognitivo', 'profundo', 'reencuadre'], premium: true,
    scriptText: 'Vamos a pensar en algo juntos.\n\nEl cigarro no da placer. Lo que hace es aliviar la abstinencia que él mismo ha creado.\n\nEs como quitarte un zapato que te aprieta. El alivio se siente bien... pero no es placer. Es solo volver a la normalidad.\n\nY aquí está lo bueno: cada día que no fumas, tu normalidad mejora. Tu base sube.\n\nEl placer real es respirar sin tos. Saborear la comida de verdad. Subir escaleras sin quedarte sin aire.\n\nEso sí es placer. Y ya estás en camino.'
  },
];

export const mindfulnessSessions: Session[] = [
  {
    id: 'm1', type: 'mindfulness', title: 'Mini meditación: ancla al presente',
    durationMinutes: 3, tags: ['básico', 'presente', 'calma'],
    scriptText: 'Siéntate donde estés. No tienes que cambiar nada.\n\nCierra los ojos si quieres.\n\nSiente el peso de tu cuerpo. Cómo la silla o el suelo te sostienen.\n\nAhora escucha los sonidos a tu alrededor. No los juzgues. Solo escucha.\n\nNota tu respiración. No la cambies. Solo nótala. Cómo entra, cómo sale.\n\nSi aparece un pensamiento sobre fumar, déjalo estar. Imagínalo como una nube que pasa por el cielo. No lo sigas. Solo míralo pasar.\n\nVuelve a tu respiración. Estás aquí. Estás bien. Este momento es suficiente.'
  },
  {
    id: 'm2', type: 'mindfulness', title: 'Meditación de auto-compasión',
    durationMinutes: 5, tags: ['compasión', 'recaída', 'perdón'],
    scriptText: 'Pon una mano sobre tu pecho. Suavemente. Siente tu corazón latiendo ahí debajo.\n\nAhora dite esto, con amabilidad: Dejar de fumar es difícil. Millones de personas luchan con esto. No estoy solo en esto.\n\nRepite: Me trato con la misma amabilidad con la que trataría a un buen amigo.\n\nSi has tenido un tropiezo, si has recaído... escucha esto: un tropiezo no borra el camino que ya has recorrido.\n\nSigues aquí. Sigues intentándolo. Y eso merece respeto.\n\nRespira. Y sigue adelante. Un paso más.'
  },
  {
    id: 'm3', type: 'mindfulness', title: 'Body scan para tensión',
    durationMinutes: 5, tags: ['cuerpo', 'tensión', 'relajación'],
    scriptText: 'Vamos a recorrer tu cuerpo de abajo a arriba. Despacio.\n\nEmpieza por los pies. ¿Cómo se sienten?\n\nSube a las piernas. Nota si hay tensión.\n\nEl abdomen. Quizá está apretado. Déjalo ser.\n\nEl pecho. Respira hacia él.\n\nLos hombros. Déjalos caer un poco.\n\nEl cuello. La mandíbula. ¿Estás apretando los dientes? Suelta.\n\nLa frente. Relájala.\n\n¿Dónde encontraste más tensión? Respira hacia ahí una vez más.\n\nNo tienes que arreglar nada. Solo notar. Eso ya es suficiente.'
  },
  {
    id: 'm4', type: 'mindfulness', title: 'Meditación caminando',
    durationMinutes: 5, tags: ['movimiento', 'exterior', 'alternativa'], premium: true,
    scriptText: 'Si puedes, camina despacio. Muy despacio.\n\nSiente cada paso. Talón... planta... dedos.\n\nNota el aire en tu cara. La temperatura. El movimiento de tus brazos.\n\nCuando tu mente se vaya al cigarro, simplemente vuelve a tus pies. Al siguiente paso.\n\nTalón... planta... dedos.\n\nCaminar cinco minutos reduce el craving tanto como cualquier otra técnica. Y además, te mueves. Tu cuerpo te lo agradece.\n\nUn paso. Otro paso. Eso es todo.'
  },
  {
    id: 'm5', type: 'mindfulness', title: 'Meditación de identidad',
    durationMinutes: 5, tags: ['identidad', 'cambio', 'profunda'], premium: true,
    scriptText: 'Cierra los ojos y déjame que te pregunte algo.\n\nImagina a tu yo que ya no fuma. ¿Cómo huele? ¿Cómo respira?\n\n¿Qué hace por las mañanas al despertarse?\n\n¿Cómo se siente después de comer, sin ese impulso automático?\n\nEse yo no es un extraño. Es tú. Solo que sin el hábito encima.\n\nY cada día que no fumas, te acercas un poquito más a esa versión.\n\nNo estás intentando ser alguien nuevo. Estás volviendo a ser tú. Ya estás en camino.'
  },
  {
    id: 'm6', type: 'mindfulness', title: 'Meditación: soltar el control',
    durationMinutes: 3, tags: ['aceptación', 'ACT', 'soltar'],
    scriptText: 'No tienes que controlar cada pensamiento que aparece en tu mente.\n\nEl pensamiento quiero fumar puede estar ahí. Puede existir. No pasa nada.\n\nEs como un ruido de fondo. Aparece, está un rato, y se va solo.\n\nNo tienes que apagarlo. No tienes que luchar contra él.\n\nSolo tienes que... no levantarte a comprar. Eso es todo.\n\nDejar que el pensamiento esté ahí, sin obedecerlo. Eso es libertad.'
  },
  {
    id: 'm7', type: 'mindfulness', title: 'Meditación de las manos',
    durationMinutes: 2, tags: ['rápido', 'táctil', 'presente'],
    scriptText: 'Frota tus manos una contra otra durante diez segundos. Con energía.\n\nAhora sepáralas un poco. Y siente el calor entre ellas.\n\nDespacio, acércalas. ¿Notas algo? ¿Una resistencia? ¿Un cosquilleo?\n\nEsa sensación eres tú. Presente. Vivo. Aquí.\n\nEn este instante, no necesitas nada más. Solo estar aquí, sintiendo tus manos.'
  },
  {
    id: 'm8', type: 'mindfulness', title: 'Meditación para dormir sin fumar',
    durationMinutes: 10, tags: ['noche', 'sueño', 'relajación'], premium: true,
    scriptText: 'Estás acostado. Ojos cerrados. El día ha terminado.\n\nRepasa tu día sin juzgar nada. Solo recuerda.\n\nCada momento en el que no fumaste... reconócelo. Eso ha sido una victoria.\n\nAhora suelta el día entero. Déjalo ir.\n\nCuenta de diez a uno. Y con cada número, siente cómo te hundes un poquito más en la cama.\n\nDiez... nueve... ocho... tu cuerpo pesa.\n\nSiete... seis... cinco... todo se afloja.\n\nCuatro... tres... dos... estás a salvo.\n\nUno... Mientras duermes, tu cuerpo trabaja para limpiarse. Tus pulmones se regeneran. Solo necesitas descansar y dejar que ocurra.'
  },
  {
    id: 'm9', type: 'mindfulness', title: 'Meditación de los sonidos',
    durationMinutes: 3, tags: ['atención', 'presente', 'sensorial'],
    scriptText: 'No cierres los ojos para esta.\n\nEscucha el sonido más lejano que puedas detectar. Tómate un momento.\n\nAhora uno un poco más cercano.\n\nY otro más cercano aún.\n\nY otro... hasta llegar a tu propia respiración.\n\nAcabas de entrenar tu atención. Has ido de lejos a cerca, paso a paso.\n\nUna mente que sabe dónde enfocar... no se deja arrastrar por cualquier craving que aparezca.'
  },
  {
    id: 'm10', type: 'mindfulness', title: 'Gratitud express',
    durationMinutes: 2, tags: ['positivo', 'motivación', 'rápido'],
    scriptText: 'Piensa en tres cosas buenas de hoy. No tienen que ser grandes. Un café. Una sonrisa. Cinco minutos de sol.\n\nAhora añade una más: no fumé. O resistí un craving.\n\nEso también cuenta. Eso cuenta mucho.\n\nLa gratitud no es cursi. Es un antídoto. Cuando agradeces, la frustración pierde fuerza. Y la frustración es lo que alimenta las recaídas.\n\nAsí que... gracias por estar aquí. En serio.'
  },
];

export const reprogrammingSessions: Session[] = [
  {
    id: 'r1', type: 'reprogramming', title: 'Desaprender el hábito',
    durationMinutes: 8, tags: ['fundamental', 'hábito', 'inicio'],
    scriptText: 'Cierra los ojos. Vamos a hacer un ejercicio de visualización.\n\nPiensa en tu rutina de fumar. El momento exacto. El gesto. La sensación.\n\nAhora rebobina. Vuelve al momento justo antes de encender. ¿Qué sientes ahí? ¿Qué es lo que realmente necesitas?\n\nAhora imagina que en ese momento, en lugar de fumar, haces tres respiraciones profundas. Y bebes un vaso de agua fresca.\n\nSiente cómo tu cuerpo se relaja igual. Incluso mejor.\n\nRepite esta escena mentalmente. Tres veces. Sin prisa.\n\nCada vez que la repites, la conexión automática se debilita un poco más. Estás reprogramando tu cerebro. Literalmente.\n\nNota: esto es una técnica de visualización. Úsalo como complemento si te funciona.'
  },
  {
    id: 'r2', type: 'reprogramming', title: 'Identidad: soy no fumador',
    durationMinutes: 7, tags: ['identidad', 'cambio', 'profunda'],
    scriptText: 'Relájate. Respira tres veces profundo antes de empezar.\n\nAhora repite internamente, con calma: Yo soy una persona que no fuma.\n\nNo estoy dejando de fumar. No intento no fumar. Soy una persona que no fuma.\n\nAhora visualiza un día completo como esa persona. Te despiertas sin buscar el paquete. Desayunas tranquilo. Trabajas con energía. Comes y disfrutas. Descansas de verdad. Y duermes en paz.\n\nSin cigarro. Con orgullo.\n\nEsa persona no está lejos. Esa persona eres tú. Ya existe dentro de ti.\n\nNota: técnica de visualización. Complemento, no tratamiento.'
  },
  {
    id: 'r3', type: 'reprogramming', title: 'Romper el vínculo café-cigarro',
    durationMinutes: 6, tags: ['café', 'trigger', 'específico'],
    scriptText: 'Imagina que te sirves un café. Lo hueles. Sientes ese aroma.\n\nLo llevas a los labios. Lo saboreas.\n\nY tu mano... no busca nada. No busca el cigarro.\n\n¿A qué sabe el café de verdad, sin humo? Más dulce. Más rico. Más limpio.\n\nRepite esto mentalmente: el café es placer. El cigarro era solo costumbre.\n\nCada café que tomas sin cigarro rompe un eslabón de la cadena. Hoy rompes uno más.\n\nNota: técnica de visualización y reencuadre. Úsalo como complemento.'
  },
  {
    id: 'r4', type: 'reprogramming', title: 'Calma nocturna',
    durationMinutes: 10, tags: ['noche', 'relajación', 'sueño'], premium: true,
    scriptText: 'Estás acostado. Relajado. Sin prisa.\n\nCuenta diez respiraciones lentas. Con cada exhalación, repite mentalmente: mi cuerpo se limpia.\n\nUna... mi cuerpo se limpia.\n\nDos... mi cuerpo se limpia.\n\nSiente cómo tus pulmones se expanden un poquito más que ayer.\n\nImagina cada célula reparándose mientras descansas. Tu cuerpo trabaja para ti incluso cuando duermes.\n\nMañana despertarás un poco más libre. Un poco más tú.\n\nEl sueño es tu aliado. Déjate llevar.\n\nNota: técnica de relajación y visualización. Complemento, no sustituto médico.'
  },
  {
    id: 'r5', type: 'reprogramming', title: 'Anclaje de calma: gesto + respiración',
    durationMinutes: 5, tags: ['anclaje', 'técnica', 'herramienta'], premium: true,
    scriptText: 'Vamos a crear tu ancla personal de calma.\n\nJunta el pulgar y el índice suavemente. Como un gesto pequeño, discreto.\n\nAhora inhala... uno, dos, tres, cuatro.\n\nMientras exhalas, di internamente: yo decido.\n\nOtra vez. Junta los dedos. Inhala. Exhala. Yo decido.\n\nCinco veces. Sin prisa.\n\nA partir de ahora, este gesto más esta frase son tu botón de calma. Puedes usarlo en cualquier momento. En cualquier sitio.\n\nCuanto más lo practiques, más fuerte será la asociación. Y más rápido funcionará.\n\nNota: técnica de condicionamiento. Eficacia variable. Complemento.'
  },
  {
    id: 'r6', type: 'reprogramming', title: 'Diálogo con el cerebro automático',
    durationMinutes: 7, tags: ['coach', 'diálogo', 'reflexión'], premium: true,
    scriptText: 'Tu cerebro automático te dice: fuma.\n\nPero pregúntale algo: ¿qué necesitas realmente?\n\n¿Calma? Entonces respira.\n\n¿Conexión? Llama a alguien.\n\n¿Una pausa? Sal a caminar un momento.\n\n¿Placer? Come algo que te guste de verdad.\n\nDetrás de cada craving hay una necesidad legítima. El cigarro era una respuesta rápida y perezosa a necesidades reales.\n\nPero ahora tienes respuestas mejores. Más limpias. Más tuyas.\n\nNota: ejercicio de autoconocimiento. No sustituye orientación profesional.'
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
