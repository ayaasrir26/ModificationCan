-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables for the persistent Chat feature
CREATE TABLE IF NOT EXISTS public.chat_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    user_name TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.chat_posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    content TEXT NOT NULL,
    user_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_comments ENABLE ROW LEVEL SECURITY;

-- Unified Policies for Public Access (Read/Insert)
DROP POLICY IF EXISTS "Anyone can view chat posts" ON public.chat_posts;
CREATE POLICY "Anyone can view chat posts" ON public.chat_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create chat posts" ON public.chat_posts;
CREATE POLICY "Anyone can create chat posts" ON public.chat_posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update chat posts" ON public.chat_posts;
CREATE POLICY "Anyone can update chat posts" ON public.chat_posts FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can delete chat posts" ON public.chat_posts;
CREATE POLICY "Anyone can delete chat posts" ON public.chat_posts FOR DELETE USING (true);

DROP POLICY IF EXISTS "Anyone can view chat comments" ON public.chat_comments;
CREATE POLICY "Anyone can view chat comments" ON public.chat_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create chat comments" ON public.chat_comments;
CREATE POLICY "Anyone can create chat comments" ON public.chat_comments FOR INSERT WITH CHECK (true);
