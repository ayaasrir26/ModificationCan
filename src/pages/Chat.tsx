import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Send, Heart, ThumbsDown, Trash2, Edit2, User, Image as ImageIcon, Users, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Comment {
    id: string;
    content: string;
    user_name: string;
    user_id: string | null;
    created_at: string;
}

interface Post {
    id: string;
    title: string;
    content: string;
    image_url?: string;
    user_name: string;
    user_id: string | null;
    likes: number;
    dislikes: number;
    created_at: string;
    chat_comments: Comment[];
}

const Chat = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [localUserName, setLocalUserName] = useState("");
    const [profile, setProfile] = useState<any>(null);

    // Fetch user profile if logged in
    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const { data } = await supabase
                    .from("profiles")
                    .select("full_name")
                    .eq("user_id", user.id)
                    .single();
                if (data) setProfile(data);
            };
            fetchProfile();
        }
    }, [user]);

    // Initialize or get fake name from localStorage if not logged in
    useEffect(() => {
        let storedName = localStorage.getItem("chat_user_name");
        if (!storedName) {
            storedName = "Fan de Foot " + Math.floor(Math.random() * 1000);
            localStorage.setItem("chat_user_name", storedName);
        }
        setLocalUserName(storedName);
    }, []);

    const activeUserName = user ? (profile?.full_name || user.email?.split('@')[0] || "Anonyme") : localUserName;

    // Fetch posts
    const { data: posts, isLoading } = useQuery({
        queryKey: ["chat_posts"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("chat_posts")
                .select("*, chat_comments(*)")
                .order("created_at", { ascending: false });

            if (error) throw error;

            return (data || []).map((post: any) => ({
                ...post,
                chat_comments: (post.chat_comments || []).sort((a: any, b: any) =>
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                )
            })) as Post[];
        },
    });

    // Mutations
    const shareMutation = useMutation({
        mutationFn: async () => {
            if (editingId) {
                const { error } = await supabase
                    .from("chat_posts")
                    .update({ title, content, image_url: image, updated_at: new Date().toISOString() })
                    .eq("id", editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("chat_posts")
                    .insert({
                        title,
                        content,
                        image_url: image,
                        user_name: activeUserName,
                        user_id: user?.id || null
                    });
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
            setTitle("");
            setContent("");
            setImage(null);
            setEditingId(null);
            toast.success(editingId ? "Post modifié !" : "Post partagé !");
        },
        onError: (err: any) => {
            console.error("Share error:", err);
            toast.error("Erreur lors du partage : " + (err.message || "Assurez-vous d'avoir exécuté le script SQL dans Supabase."));
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("chat_posts").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
            toast.success("Post supprimé");
        },
        onError: (err: any) => toast.error("Erreur de suppression: " + err.message),
    });

    const likeMutation = useMutation({
        mutationFn: async ({ id, type }: { id: string, type: 'likes' | 'dislikes' }) => {
            const post = posts?.find(p => p.id === id);
            if (!post) return;
            const { error } = await supabase
                .from("chat_posts")
                .update({ [type]: (post as any)[type] + 1 })
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat_posts"] }),
    });

    const commentMutation = useMutation({
        mutationFn: async ({ postId, text }: { postId: string, text: string }) => {
            const { error } = await supabase
                .from("chat_comments")
                .insert({
                    post_id: postId,
                    content: text,
                    user_name: activeUserName,
                    user_id: user?.id || null
                });
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat_posts"] }),
        onError: (err: any) => toast.error("Erreur de commentaire: " + err.message),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image trop grande (max 2MB)");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (post: Post) => {
        setEditingId(post.id);
        setTitle(post.title);
        setContent(post.content);
        setImage(post.image_url || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-16">
                <div className="max-w-2xl mx-auto">
                    {/* Header Info */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-royal-emerald mb-3 tracking-tight">Espace Communautaire</h1>
                        <p className="text-gray-500 font-medium">Analyse et discussions CAN 2025</p>
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-royal-emerald/5 rounded-full border border-royal-emerald/10">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-bold text-royal-emerald">En ligne : {activeUserName}</span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="mb-16">
                        <Card className="border-2 border-gray-100 shadow-xl shadow-royal-emerald/5 rounded-[32px] overflow-hidden bg-white relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-emerald via-saffron to-star-red" />
                            <CardContent className="pt-8 p-8">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); shareMutation.mutate(); }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-royal-emerald flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" /> Titre
                                        </label>
                                        <Input
                                            placeholder="Ex: Analyse Match d'ouverture..."
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="h-14 border-gray-200 focus:border-royal-emerald focus:ring-4 focus:ring-royal-emerald/5 rounded-2xl font-bold text-lg transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-royal-emerald flex items-center gap-2">
                                            <Edit2 className="w-4 h-4" /> Message
                                        </label>
                                        <Textarea
                                            placeholder="Partagez vos impressions..."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="min-h-[150px] border-gray-200 focus:border-royal-emerald focus:ring-4 focus:ring-royal-emerald/5 rounded-2xl font-medium text-base leading-relaxed transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-royal-emerald flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4" /> Image (Optionnel)
                                        </label>
                                        <div className="relative group">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-2xl hover:border-royal-emerald hover:bg-royal-emerald/5 cursor-pointer transition-all group-hover:scale-[0.99]"
                                            >
                                                <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-royal-emerald transition-colors" />
                                                <span className="text-xs font-bold text-gray-400 group-hover:text-royal-emerald mt-2">Ajouter une image</span>
                                            </label>
                                        </div>
                                        {image && (
                                            <div className="relative mt-4 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                                                <img src={image} alt="Preview" className="w-full h-56 object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setImage(null)}
                                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 shadow-xl transition-all font-bold"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        {editingId && (
                                            <Button
                                                variant="outline"
                                                onClick={() => { setEditingId(null); setTitle(""); setContent(""); setImage(null); }}
                                                className="flex-1 h-14 rounded-2xl border-2 font-black uppercase tracking-wider text-gray-500 hover:bg-gray-50 transition-all"
                                                type="button"
                                            >
                                                Annuler
                                            </Button>
                                        )}
                                        <Button
                                            disabled={shareMutation.isPending || !title.trim() || !content.trim()}
                                            className="flex-1 h-14 btn-royal rounded-2xl shadow-xl shadow-royal-emerald/20 transition-all active:scale-[0.98] font-black uppercase tracking-wider text-base"
                                        >
                                            <Send className={`w-5 h-5 mr-3 ${shareMutation.isPending ? 'animate-bounce' : ''}`} />
                                            {editingId ? "Mettre à jour" : "Publier"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Feed Section */}
                    <div className="space-y-10">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                            <h2 className="text-3xl font-black text-royal-emerald flex items-center gap-4">
                                <Users className="w-8 h-8 text-saffron" />
                                Fil d'actualité
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-black text-gray-400 tracking-widest uppercase">Live</span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="space-y-8">
                                {[1, 2].map(i => (
                                    <div key={i} className="h-64 bg-gray-50 rounded-[40px] animate-pulse" />
                                ))}
                            </div>
                        ) : posts?.length === 0 ? (
                            <div className="text-center py-32 bg-gray-50/50 rounded-[48px] border-2 border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <MessageSquare className="w-10 h-10 text-gray-200" />
                                </div>
                                <p className="text-gray-500 font-black text-xl mb-2">Pas encore de messages</p>
                                <p className="text-gray-400 font-medium">Commencez la conversation !</p>
                            </div>
                        ) : (
                            posts?.map((post) => (
                                <Card key={post.id} className="group border-0 shadow-2xl shadow-gray-200/40 rounded-[40px] overflow-hidden bg-white hover:shadow-royal-emerald/10 transition-all duration-700">
                                    <CardHeader className="flex flex-row items-center gap-5 p-8 pb-4">
                                        <div className="relative">
                                            <Avatar className="h-14 w-14 border-4 border-gray-50 shadow-inner">
                                                <AvatarFallback className="bg-gradient-to-br from-royal-emerald to-leaf-green text-white font-black text-2xl uppercase">
                                                    {post.user_name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-royal-emerald text-lg tracking-tight">{post.user_name}</span>
                                                {post.user_id && <span className="text-[10px] bg-royal-emerald/10 text-royal-emerald px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Membre</span>}
                                            </div>
                                            <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: fr })}
                                            </span>
                                        </div>
                                        {(user?.id === post.user_id || !post.user_id) && (
                                            <div className="ml-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    onClick={() => handleEdit(post)}
                                                    className="h-10 w-10 rounded-2xl bg-gray-50 hover:bg-royal-emerald hover:text-white transition-all shadow-sm"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    onClick={() => deleteMutation.mutate(post.id)}
                                                    className="h-10 w-10 rounded-2xl bg-gray-50 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </CardHeader>
                                    <CardContent className="p-8 pt-4">
                                        <h3 className="text-2xl font-black text-royal-emerald mb-4 leading-tight tracking-tight selection:bg-saffron selection:text-white">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed font-medium text-lg mb-8 whitespace-pre-wrap">
                                            {post.content}
                                        </p>

                                        {post.image_url && (
                                            <div className="rounded-[32px] overflow-hidden border-8 border-gray-50 shadow-inner mb-8 bg-gray-50">
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="w-full h-auto max-h-[600px] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                                />
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 py-6 border-y border-gray-50 mb-8">
                                            <Button
                                                variant="ghost"
                                                onClick={() => likeMutation.mutate({ id: post.id, type: 'likes' })}
                                                className="h-12 px-6 rounded-2xl flex items-center gap-3 hover:bg-royal-emerald/10 hover:text-royal-emerald group/like transition-all active:scale-90 bg-gray-50/50"
                                            >
                                                <Heart className={`w-5 h-5 transition-all ${post.likes > 0 ? 'fill-red-500 text-red-500' : 'group-hover/like:scale-125'}`} />
                                                <span className="font-black tabular-nums text-lg">{post.likes}</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => likeMutation.mutate({ id: post.id, type: 'dislikes' })}
                                                className="h-12 px-6 rounded-2xl flex items-center gap-3 hover:bg-red-50 hover:text-red-500 group/dislike transition-all active:scale-90 bg-gray-50/50"
                                            >
                                                <ThumbsDown className="w-5 h-5 group-hover/dislike:scale-125" />
                                                <span className="font-black tabular-nums text-lg">{post.dislikes}</span>
                                            </Button>
                                        </div>

                                        {/* Comments Section */}
                                        <div className="space-y-6">
                                            <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-3 px-2">
                                                <MessageSquare className="w-4 h-4" />
                                                {post.chat_comments?.length || 0} Commentaires
                                            </h4>

                                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                                {post.chat_comments?.map((comment) => (
                                                    <div key={comment.id} className="flex gap-4 group/comment animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                        <Avatar className="h-10 w-10 shrink-0 border-2 border-white shadow-md">
                                                            <AvatarFallback className="text-xs bg-gray-100 text-royal-emerald font-black">
                                                                {comment.user_name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 bg-gray-50/50 hover:bg-gray-50 rounded-[24px] p-5 transition-all border border-transparent hover:border-gray-100">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-xs font-black text-royal-emerald uppercase tracking-widest">{comment.user_name}</span>
                                                                <span className="text-[10px] font-bold text-gray-400">
                                                                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: fr })}
                                                                </span>
                                                            </div>
                                                            <p className="text-base text-gray-600 font-medium leading-relaxed">{comment.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="relative mt-8 group/input">
                                                <Input
                                                    placeholder="Votre commentaire..."
                                                    className="h-14 pl-6 pr-16 rounded-[24px] border-2 border-gray-100 focus:border-royal-emerald focus:ring-4 focus:ring-royal-emerald/5 transition-all font-bold bg-white"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            const val = (e.target as HTMLInputElement).value;
                                                            if (val.trim()) {
                                                                commentMutation.mutate({ postId: post.id, text: val });
                                                                (e.target as HTMLInputElement).value = '';
                                                            }
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    size="icon"
                                                    disabled={commentMutation.isPending}
                                                    className="absolute right-3 top-3 h-8 w-8 rounded-xl bg-royal-emerald shadow-lg shadow-royal-emerald/20 hover:scale-110 active:scale-95 transition-all text-white"
                                                    onClick={(e) => {
                                                        const input = (e.currentTarget.previousSibling as HTMLInputElement);
                                                        if (input.value.trim()) {
                                                            commentMutation.mutate({ postId: post.id, text: input.value });
                                                            input.value = '';
                                                        }
                                                    }}
                                                >
                                                    <Send className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chat;
