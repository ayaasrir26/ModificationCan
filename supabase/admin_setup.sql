-- CAN 2025 Admin Setup & Scoring Engine

-- 1. Ensure Table Schema and Constraints
-- Add unique constraint to user_roles if missing
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_roles_user_id_key') THEN
        ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_key UNIQUE (user_id);
    END IF;
END $$;

-- Enable RLS on user_roles if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Delete existing policy if it exists and recreate it
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles 
    FOR SELECT USING (auth.uid() = user_id);

-- Also allow service_role to do everything
DROP POLICY IF EXISTS "Service role has full access to user_roles" ON public.user_roles;
CREATE POLICY "Service role has full access to user_roles" ON public.user_roles 
    USING (true) WITH CHECK (true);

-- Add match_key column and unique constraint to matches
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS match_key TEXT;
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'matches_match_key_key') THEN
        ALTER TABLE public.matches ADD CONSTRAINT matches_match_key_key UNIQUE (match_key);
    END IF;
END $$;

-- 2. Grant Admin Role to User
-- OPTION A: Grant by Email (Recommended)
-- CORRECT EMAIL: elfalahhassania@gmail.com
DELETE FROM public.user_roles WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'elfalahhassania@gmail.com');
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' 
FROM auth.users 
WHERE email = 'elfalahhassania@gmail.com';

-- OPTION B: Grant by User ID (Fallback)
-- If the email approach fails, you can copy your user ID from the browser console 
-- (see "Admin check result for [ID]") and paste it below:
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('YOUR_USER_ID_HERE', 'admin')
-- ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- 3. Populate Round of 16 Matches
INSERT INTO public.matches (match_key, home_team_id, away_team_id, stage, status, match_date) VALUES
('r16-0', '10900bc7-b3cf-40f3-ae5c-cc8c1956c6f1', '91c8c0b3-0d6c-4cba-b174-b7e272fb5b23', 'Round of 16', 'scheduled', '2025-01-25 17:00:00+00'), -- MLI vs TUN
('r16-1', 'f729c263-c686-4058-9388-f1f0a0a2a626', '415e8c8d-6d0a-43b2-aa79-530354c6415b', 'Round of 16', 'scheduled', '2025-01-25 20:00:00+00'), -- SEN vs SUD
('r16-2', 'fc18b57b-ecff-403a-ba4d-a7b104b213d3', '72e10d71-8354-4b65-ba78-cf305ba1d69e', 'Round of 16', 'scheduled', '2025-01-26 17:00:00+00'), -- EGY vs BEN
('r16-3', '3493e0d6-09c7-4645-87f9-7982fc32dab0', '5b93c554-e232-4c2c-93cb-2a3e68d83800', 'Round of 16', 'scheduled', '2025-01-26 20:00:00+00'), -- CIV vs BFA
('r16-4', 'e09d5fc8-1866-40a1-89bf-2dc012a6f96f', '3b54c2c0-5ce2-478b-8257-bd3a641b6499', 'Round of 16', 'scheduled', '2025-01-27 17:00:00+00'), -- ZAF vs CMR
('r16-5', '8faf16d8-7679-4fc4-93b6-b362449f1f70', '01d7a3be-fce3-45d6-bbac-56b6d53c1fd6', 'Round of 16', 'scheduled', '2025-01-27 20:00:00+00'), -- MAR vs TAN
('r16-6', 'ef38ff9d-b530-45b0-92d1-ba40881332bf', '22e1ea3b-f40f-4e75-a1ba-d62781162796', 'Round of 16', 'scheduled', '2025-01-28 17:00:00+00'), -- ALG vs COD
('r16-7', '2af1d055-aeb1-4fe6-9980-606cb00333e5', 'addef84f-5942-4ee7-8e62-9f4185806c32', 'Round of 16', 'scheduled', '2025-01-28 20:00:00+00')  -- NGA vs MOZ
ON CONFLICT (match_key) DO UPDATE SET
    home_team_id = EXCLUDED.home_team_id,
    away_team_id = EXCLUDED.away_team_id,
    stage = EXCLUDED.stage,
    match_date = EXCLUDED.match_date;

-- 4. Scoring Engine Function
DROP FUNCTION IF EXISTS public.calculate_user_points();
CREATE OR REPLACE FUNCTION public.calculate_user_points()
RETURNS void AS $$
DECLARE
    pred_record RECORD;
    match_record RECORD;
    calculated_score INTEGER;
    current_match_id TEXT;
    match_data JSONB;
BEGIN
    -- Loop through all predictions
    FOR pred_record IN SELECT * FROM public.predictions LOOP
        calculated_score := 0;
        
        -- Loop through matches in bracket_data
        -- bracket_data is a JSONB object with match_keys as keys
        FOR current_match_id, match_data IN SELECT * FROM jsonb_each(pred_record.bracket_data) LOOP
            -- Look for actual match result
            SELECT * INTO match_record FROM public.matches WHERE match_key = current_match_id AND status = 'finished';
            
            IF FOUND THEN
                -- 1. Exact score (5 points)
                IF (match_data->>'score1')::integer = match_record.home_score AND 
                   (match_data->>'score2')::integer = match_record.away_score THEN
                    calculated_score := calculated_score + 5;
                -- 2. Correct winner/draw (2 points)
                ELSIF sign((match_data->>'score1')::integer - (match_data->>'score2')::integer) = 
                      sign(match_record.home_score - match_record.away_score) THEN
                    calculated_score := calculated_score + 2;
                END IF;
            END IF;
        END LOOP;
        
        -- 3. Correct Champion (10 points)
        -- Identify the actual champion (winner of the 'final' match)
        SELECT 
            CASE 
                WHEN home_score > away_score THEN home_team_id 
                WHEN away_score > home_score THEN away_team_id 
                ELSE NULL 
            END INTO match_record.home_team_id -- Reuse variable for champion_id
        FROM public.matches 
        WHERE match_key = 'final' AND status = 'finished';
        
        IF match_record.home_team_id IS NOT NULL AND pred_record.champion_id = match_record.home_team_id THEN
            calculated_score := calculated_score + 10;
        END IF;

        -- Update prediction score
        UPDATE public.predictions SET score = calculated_score WHERE id = pred_record.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Admin Check Helper Function (Required for Frontend)
DROP FUNCTION IF EXISTS public.check_is_admin();
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS boolean AS $$
DECLARE
  current_user_id UUID;
  is_admin boolean;
BEGIN
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RETURN false;
  END IF;
  
  SELECT (role = 'admin') INTO is_admin
  FROM public.user_roles
  WHERE user_id = current_user_id;
  
  RETURN COALESCE(is_admin, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution permissions
GRANT EXECUTE ON FUNCTION public.check_is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_is_admin() TO anon;
GRANT ALL ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO anon;
GRANT ALL ON public.user_roles TO service_role;

-- 6. Verification Query (Run this separately to check results)
-- SELECT r.user_id, u.email, r.role 
-- FROM public.user_roles r 
-- JOIN auth.users u ON r.user_id = u.id;
