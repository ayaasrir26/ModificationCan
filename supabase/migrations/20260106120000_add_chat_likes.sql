-- Add chat_likes table to track per-user likes and triggers to keep counts in sync

CREATE TABLE IF NOT EXISTS public.chat_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.chat_posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    user_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_post_user UNIQUE (post_id, user_id)
);

-- Policies
ALTER TABLE public.chat_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view chat likes" ON public.chat_likes;
CREATE POLICY "Anyone can view chat likes" ON public.chat_likes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create likes" ON public.chat_likes;
CREATE POLICY "Authenticated users can create likes" ON public.chat_likes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

DROP POLICY IF EXISTS "Owners can delete their likes" ON public.chat_likes;
CREATE POLICY "Owners can delete their likes" ON public.chat_likes FOR DELETE USING (user_id = auth.uid());

-- Triggers to keep chat_posts.likes in sync

CREATE OR REPLACE FUNCTION public.chat_likes_increment() RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.chat_posts SET likes = COALESCE(likes, 0) + 1, updated_at = now() WHERE id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_chat_likes_increment ON public.chat_likes;
CREATE TRIGGER trg_chat_likes_increment AFTER INSERT ON public.chat_likes
FOR EACH ROW EXECUTE FUNCTION public.chat_likes_increment();

CREATE OR REPLACE FUNCTION public.chat_likes_decrement() RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.chat_posts SET likes = GREATEST(COALESCE(likes, 0) - 1, 0), updated_at = now() WHERE id = OLD.post_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_chat_likes_decrement ON public.chat_likes;
CREATE TRIGGER trg_chat_likes_decrement AFTER DELETE ON public.chat_likes
FOR EACH ROW EXECUTE FUNCTION public.chat_likes_decrement();
