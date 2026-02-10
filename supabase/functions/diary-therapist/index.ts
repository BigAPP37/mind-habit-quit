import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data, error: authError } = await supabaseClient.auth.getClaims(token);
    if (authError || !data?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const journalEntry = typeof body.journalEntry === "string" ? body.journalEntry.trim() : "";
    const context = body.context && typeof body.context === "object" ? body.context : null;

    if (!journalEntry || journalEntry.length < 10) {
      return new Response(JSON.stringify({ error: "El texto debe tener al menos 10 caracteres." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (journalEntry.length > 2000) {
      return new Response(JSON.stringify({ error: "El texto no puede superar los 2000 caracteres." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Sanitize context values
    const safeContext = context ? {
      daysSinceQuit: typeof context.daysSinceQuit === "number" ? Math.max(0, Math.floor(context.daysSinceQuit)) : null,
      cravingAvg: typeof context.cravingAvg === "number" ? Math.min(10, Math.max(0, context.cravingAvg)) : null,
      mood: typeof context.mood === "number" ? Math.min(10, Math.max(0, context.mood)) : null,
      stress: typeof context.stress === "number" ? Math.min(10, Math.max(0, context.stress)) : null,
    } : null;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Eres un terapeuta cognitivo-conductual especializado en adicciones al tabaco. Tu rol es analizar lo que el usuario escribe en su diario y ofrecer:

1. VALIDACIÓN EMOCIONAL: Reconoce lo que siente sin juzgar.
2. REENCUADRE COGNITIVO: Si detectas distorsiones cognitivas (pensamiento todo-o-nada, catastrofización, etc.), ofrece una perspectiva alternativa con gentileza.
3. ESTRATEGIA PRÁCTICA: Sugiere una técnica concreta basada en evidencia (respiración 4-7-8, técnica de las 5 D: Delay, Distract, Drink water, Deep breathe, Discuss).
4. REFUERZO POSITIVO: Destaca cualquier progreso o fortaleza que detectes.

Reglas:
- Responde SIEMPRE en español.
- Sé cálido, empático y breve (máximo 150 palabras).
- NO diagnostiques. NO recetes medicación.
- Si detectas señales de crisis emocional grave, sugiere contactar al Teléfono de la Esperanza (717 003 717) o servicios profesionales.
- Usa lenguaje sencillo, sin tecnicismos excesivos.
- Basa tus respuestas en TCC (Terapia Cognitivo-Conductual) y Entrevista Motivacional.

Contexto del usuario:
${safeContext ? `- Día sin fumar: ${safeContext.daysSinceQuit ?? 'desconocido'}
- Ansia promedio hoy: ${safeContext.cravingAvg ?? 'no registrado'}/10
- Estado de ánimo: ${safeContext.mood ?? 'no registrado'}/10
- Estrés: ${safeContext.stress ?? 'no registrado'}/10` : 'Sin contexto adicional disponible.'}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: journalEntry },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes, intenta en un momento." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos agotados." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("diary-therapist error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
