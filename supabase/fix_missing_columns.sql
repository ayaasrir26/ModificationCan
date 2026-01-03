-- Script pour ajouter les colonnes manquantes dans la table 'teams'
-- Executez ce code dans le SQL Editor de Supabase

ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0;
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS goal_difference INTEGER DEFAULT 0;

-- Notification
COMMENT ON COLUMN public.teams.points IS 'Points gagnés par l''équipe';
COMMENT ON COLUMN public.teams.goal_difference IS 'Différence de buts';
