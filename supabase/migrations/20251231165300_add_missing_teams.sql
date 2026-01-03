-- SQL to insert missing teams for bracket
-- Run this in Supabase SQL Editor or via migration

-- Temporarily allow inserts (for development only)
DROP POLICY IF EXISTS "Temp allow inserts" ON public.teams;
CREATE POLICY "Temp allow inserts" ON public.teams
  FOR INSERT TO anon WITH CHECK (true);

-- Insert missing teams
INSERT INTO public.teams (name, code, flag_url, group_name) VALUES
('South Africa', 'ZAF', 'https://flagcdn.com/w80/za.png', 'B'),
('Cameroon', 'CAM', 'https://flagcdn.com/w80/cm.png', 'D'),
('Ghana', 'GHA', 'https://flagcdn.com/w80/gh.png', 'C'),
('Guinea', 'GNE', 'https://flagcdn.com/w80/gn.png', 'D')
ON CONFLICT (code) DO NOTHING;

-- Remove temporary policy
DROP POLICY IF EXISTS "Temp allow inserts" ON public.teams;
