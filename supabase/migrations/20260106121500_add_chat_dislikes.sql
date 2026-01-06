-- Add chat_dislikes table to track per-user dislikes and triggers to keep counts in sync

CREATE TABLE IF NOT EXISTS public.chat_dislikes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.chat_posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    user_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_post_user_dislike UNIQUE (post_id, user_id)
);

-- Policies
ALTER TABLE public.chat_dislikes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view chat dislikes" ON public.chat_dislikes;
CREATE POLICY "Anyone can view chat dislikes" ON public.chat_dislikes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create dislikes" ON public.chat_dislikes;
CREATE POLICY "Authenticated users can create dislikes" ON public.chat_dislikes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

DROP POLICY IF EXISTS "Owners can delete their dislikes" ON public.chat_dislikes;
CREATE POLICY "Owners can delete their dislikes" ON public.chat_dislikes FOR DELETE USING (user_id = auth.uid());

-- Triggers to keep chat_posts.dislikes in sync

CREATE OR REPLACE FUNCTION public.chat_dislikes_increment() RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.chat_posts SET dislikes = COALESCE(dislikes, 0) + 1, updated_at = now() WHERE id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_chat_dislikes_increment ON public.chat_dislikes;
CREATE TRIGGER trg_chat_dislikes_increment AFTER INSERT ON public.chat_dislikes
FOR EACH ROW EXECUTE FUNCTION public.chat_dislikes_increment();

CREATE OR REPLACE FUNCTION public.chat_dislikes_decrement() RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.chat_posts SET dislikes = GREATEST(COALESCE(dislikes, 0) - 1, 0), updated_at = now() WHERE id = OLD.post_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_chat_dislikes_decrement ON public.chat_dislikes;
CREATE TRIGGER trg_chat_dislikes_decrement AFTER DELETE ON public.chat_dislikes
FOR EACH ROW EXECUTE FUNCTION public.chat_dislikes_decrement();