import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voiceName = "es-ES-Neural2-A", ssmlGender = "FEMALE" } = await req.json();
    const API_KEY = Deno.env.get("GOOGLE_CLOUD_TTS_API_KEY");

    if (!API_KEY) {
      throw new Error("GOOGLE_CLOUD_TTS_API_KEY is not configured");
    }

    if (!text || text.length === 0) {
      throw new Error("Text is required");
    }

    const languageCode = voiceName.substring(0, 5); // e.g. "es-ES"

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode,
            name: voiceName,
            ssmlGender,
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 0.85,
            pitch: -1.0,
            effectsProfileId: ["headphone-class-device"],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google TTS API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Google TTS API error: ${response.status}` }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const audioContent = data.audioContent;

    const binaryString = atob(audioContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new Response(bytes.buffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (e) {
    console.error("TTS error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
