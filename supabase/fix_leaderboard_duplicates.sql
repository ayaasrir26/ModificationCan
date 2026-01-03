-- 1. Supprimer les doublons dans la table 'predictions'
-- On garde uniquement la ligne avec le score le plus élevé pour chaque utilisateur
DELETE FROM public.predictions p1
WHERE id NOT IN (
    SELECT id
    FROM (
        SELECT DISTINCT ON (user_id) id
        FROM public.predictions
        ORDER BY user_id, score DESC, updated_at DESC
    ) AS subquery
);

-- 2. Ajouter une contrainte UNIQUE sur user_id 
-- Cela empêchera la création de doublons à l'avenir lors des sauvegardes
ALTER TABLE public.predictions DROP CONSTRAINT IF EXISTS predictions_user_id_key;
ALTER TABLE public.predictions ADD CONSTRAINT predictions_user_id_key UNIQUE (user_id);

-- 3. Mettre à jour la vue 'leaderboard'
-- Utilisation de INNER JOIN pour s'assurer que si un profil est supprimé, la ligne disparaît du classement
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    p.user_id,
    pr.full_name,
    pr.avatar_url,
    p.score,
    p.is_winner,
    t.name as predicted_champion,
    p.updated_at
FROM public.predictions p
INNER JOIN public.profiles pr ON p.user_id = pr.user_id
LEFT JOIN public.teams t ON p.champion_id = t.id
ORDER BY p.score DESC, p.updated_at ASC;
