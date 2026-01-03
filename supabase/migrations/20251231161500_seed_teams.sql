-- Seed teams data for CAN 2025
-- Insert all 24 qualified teams organized into 6 groups

INSERT INTO public.teams (name, code, flag_url, group_name) VALUES
-- Group A
('Morocco', 'MAR', 'https://flagcdn.com/w80/ma.png', 'A'),
('Zambia', 'ZAM', 'https://flagcdn.com/w80/zm.png', 'A'),
('Tanzania', 'TAN', 'https://flagcdn.com/w80/tz.png', 'A'),
('DR Congo', 'COD', 'https://flagcdn.com/w80/cd.png', 'A'),

-- Group B
('Egypt', 'EGY', 'https://flagcdn.com/w80/eg.png', 'B'),
('South Africa', 'ZAF', 'https://flagcdn.com/w80/za.png', 'B'),
('Zimbabwe', 'ZIM', 'https://flagcdn.com/w80/zw.png', 'B'),
('Angola', 'ANG', 'https://flagcdn.com/w80/ao.png', 'B'),

-- Group C
('Nigeria', 'NGA', 'https://flagcdn.com/w80/ng.png', 'C'),
('Tunisia', 'TUN', 'https://flagcdn.com/w80/tn.png', 'C'),
('Uganda', 'UGA', 'https://flagcdn.com/w80/ug.png', 'C'),
('Comoros', 'COM', 'https://flagcdn.com/w80/km.png', 'C'),

-- Group D
('Senegal', 'SEN', 'https://flagcdn.com/w80/sn.png', 'D'),
('Cameroon', 'CAM', 'https://flagcdn.com/w80/cm.png', 'D'),
('Guinea', 'GNE', 'https://flagcdn.com/w80/gn.png', 'D'),
('Malawi', 'MAW', 'https://flagcdn.com/w80/mw.png', 'D'),

-- Group E
('Algeria', 'ALG', 'https://flagcdn.com/w80/dz.png', 'E'),
('Burkina Faso', 'BFA', 'https://flagcdn.com/w80/bf.png', 'E'),
('Equatorial Guinea', 'EQG', 'https://flagcdn.com/w80/gq.png', 'E'),
('Sudan', 'SUD', 'https://flagcdn.com/w80/sd.png', 'E'),

-- Group F
('Ivory Coast', 'CIV', 'https://flagcdn.com/w80/ci.png', 'F'),
('Gabon', 'GAB', 'https://flagcdn.com/w80/ga.png', 'F'),
('Mali', 'MLI', 'https://flagcdn.com/w80/ml.png', 'F'),
('Mozambique', 'MOZ', 'https://flagcdn.com/w80/mz.png', 'F');
