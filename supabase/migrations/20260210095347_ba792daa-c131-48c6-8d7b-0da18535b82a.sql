
-- Create storage bucket for cached TTS audio
INSERT INTO storage.buckets (id, name, public)
VALUES ('tts-cache', 'tts-cache', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to read cached audio
CREATE POLICY "Anyone can read cached TTS audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'tts-cache');

-- Allow authenticated users to upload cached audio
CREATE POLICY "Authenticated users can upload TTS cache"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tts-cache' AND auth.role() = 'authenticated');
