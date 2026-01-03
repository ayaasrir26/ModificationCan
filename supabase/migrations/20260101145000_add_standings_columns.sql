-- Migration: Add standings columns to teams table
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0;
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS goal_difference INTEGER DEFAULT 0;
