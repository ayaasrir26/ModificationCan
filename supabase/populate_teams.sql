-- Populate Teams Table for CAN 2025 based on actual standings
-- This ensures the 'teams' table has data with points and GD

INSERT INTO public.teams (name, code, group_name, flag_url, points, goal_difference) VALUES
-- Group A
('Morocco', 'MAR', 'A', 'https://flagcdn.com/w80/ma.png', 4, 2),
('Mali', 'MLI', 'A', 'https://flagcdn.com/w80/ml.png', 2, 0),
('Zambia', 'ZAM', 'A', 'https://flagcdn.com/w80/zm.png', 2, 0),
('Comoros', 'COM', 'A', 'https://flagcdn.com/w80/km.png', 1, -2),

-- Group B
('Egypt', 'EGY', 'B', 'https://flagcdn.com/w80/eg.png', 6, 2),
('South Africa', 'ZAF', 'B', 'https://flagcdn.com/w80/za.png', 3, 0),
('Angola', 'ANG', 'B', 'https://flagcdn.com/w80/ao.png', 1, -1),
('Zimbabwe', 'ZIM', 'B', 'https://flagcdn.com/w80/zw.png', 1, -1),

-- Group C
('Nigeria', 'NGA', 'C', 'https://flagcdn.com/w80/ng.png', 6, 2),
('Tunisia', 'TUN', 'C', 'https://flagcdn.com/w80/tn.png', 3, 1),
('Tanzania', 'TAN', 'C', 'https://flagcdn.com/w80/tz.png', 1, -1),
('Uganda', 'UGA', 'C', 'https://flagcdn.com/w80/ug.png', 1, -2),

-- Group D
('Senegal', 'SEN', 'D', 'https://flagcdn.com/w80/sn.png', 4, 3),
('DR Congo', 'COD', 'D', 'https://flagcdn.com/w80/cd.png', 4, 1),
('Benin', 'BEN', 'D', 'https://flagcdn.com/w80/bj.png', 3, 0),
('Botswana', 'BOT', 'D', 'https://flagcdn.com/w80/bw.png', 0, -4),

-- Group E
('Algeria', 'ALG', 'E', 'https://flagcdn.com/w80/dz.png', 6, 4),
('Burkina Faso', 'BFA', 'E', 'https://flagcdn.com/w80/bf.png', 3, 0),
('Sudan', 'SUD', 'E', 'https://flagcdn.com/w80/sd.png', 3, -2),
('Equatorial Guinea', 'EQG', 'E', 'https://flagcdn.com/w80/gq.png', 0, -2),

-- Group F
('Ivory Coast', 'CIV', 'F', 'https://flagcdn.com/w80/ci.png', 4, 1),
('Cameroon', 'CMR', 'F', 'https://flagcdn.com/w80/cm.png', 4, 1),
('Mozambique', 'MOZ', 'F', 'https://flagcdn.com/w80/mz.png', 3, 0),
('Gabon', 'GAB', 'F', 'https://flagcdn.com/w80/ga.png', 0, -2)

ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    flag_url = EXCLUDED.flag_url,
    group_name = EXCLUDED.group_name,
    points = EXCLUDED.points,
    goal_difference = EXCLUDED.goal_difference;
