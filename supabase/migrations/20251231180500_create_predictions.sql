-- Create predictions table
CREATE TABLE IF NOT EXISTS public.predictions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    bracket_data JSONB NOT NULL,
    champion_id UUID REFERENCES public.teams(id),
    score INTEGER DEFAULT 0,
    is_winner BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own predictions" 
    ON public.predictions FOR SELECT 
    USING (auth.uid() = user_id OR (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin');

CREATE POLICY "Users can insert their own predictions" 
    ON public.predictions FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own predictions" 
    ON public.predictions FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create a view for leaderboard
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    p.user_id,
    pr.full_name,
    pr.avatar_url,
    p.score,
    p.is_winner,
    t.name as predicted_champion
FROM public.predictions p
JOIN public.profiles pr ON p.user_id = pr.id
LEFT JOIN public.teams t ON p.champion_id = t.id
ORDER BY p.score DESC, p.created_at ASC;
