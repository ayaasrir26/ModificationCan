
-- 1. Create PREDICTIONS Table
CREATE TABLE IF NOT EXISTS public.predictions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    bracket_data JSONB NOT NULL,
    champion_id UUID REFERENCES public.teams(id),
    score INTEGER DEFAULT 0,
    is_winner BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Security for Predictions
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies for Predictions (Drop first to allow re-run)
-- View own predictions
DROP POLICY IF EXISTS "Users can view their own predictions" ON public.predictions;
CREATE POLICY "Users can view their own predictions" 
    ON public.predictions FOR SELECT 
    USING (auth.uid() = user_id OR (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin');

-- Insert own predictions
DROP POLICY IF EXISTS "Users can insert their own predictions" ON public.predictions;
CREATE POLICY "Users can insert their own predictions" 
    ON public.predictions FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Update own predictions
DROP POLICY IF EXISTS "Users can update their own predictions" ON public.predictions;
CREATE POLICY "Users can update their own predictions" 
    ON public.predictions FOR UPDATE 
    USING (auth.uid() = user_id);

-- 4. Create LEADERBOARD View
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    p.user_id,
    pr.full_name,
    pr.avatar_url,
    p.score,
    p.is_winner,
    t.name as predicted_champion
FROM public.predictions p
JOIN public.profiles pr ON p.user_id = pr.user_id
LEFT JOIN public.teams t ON p.champion_id = t.id
ORDER BY p.score DESC, p.created_at ASC;
