import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    MessageSquare, Send, Heart, ThumbsDown, Trash2,
    Edit2, ImageIcon, Users, Calendar, Sparkles,
    Share2, Plus, ArrowRight, TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

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
    const [isFormOpen, setIsFormOpen] = useState(false);

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
            setIsFormOpen(false);
            toast.success(editingId ? "Post edited successfully!" : "Post published successfully!");
        },
        onError: (err: any) => {
            console.error("Share error:", err);
            toast.error("Error: " + (err.message || "Make sure you have run the SQL script."));
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("chat_posts").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
            toast.success("Post deleted");
        },
        onError: (err: any) => toast.error("Error: " + err.message),
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
        onError: (err: any) => toast.error("Error: " + err.message),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image too large (max 2MB)");
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
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] selection:bg-royal-emerald selection:text-white">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-24 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Professional Header Section */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                                <MessageSquare className="w-8 h-8 text-royal-emerald" />
                                Forum Communautaire
                            </h1>
                            <p className="text-slate-500 font-medium mt-1">
                                Analyses techniques et discussions autour de la CAN 2025
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-600">
                                <Users className="w-4 h-4" />
                                1,240 En ligne
                            </div>
                            <Button
  onClick={() => setIsFormOpen(!isFormOpen)}
  className={`h-11 px-6 rounded-lg font-bold transition-all
    ${isFormOpen
      ? 'bg-red-500 text-white hover:bg-red-600 shadow-md'
      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg ring-2 ring-emerald-400'
    }`}
>
  {isFormOpen ? 'Annuler' : (
    <>
      <Plus className="w-4 h-4 mr-2" />
      Nouveau Sujet
    </>
  )}
</Button>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Feed Column */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Professional Post Creation */}
                            {isFormOpen && (
                                <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white animate-in slide-in-from-top-2 duration-300">
                                    <CardContent className="p-6">
                                        <form
                                            onSubmit={(e) => { e.preventDefault(); shareMutation.mutate(); }}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-10 w-10 border border-slate-100 shrink-0">
                                                    <AvatarFallback className="bg-slate-100 text-slate-600 font-bold uppercase">{activeUserName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-3">
                                                    <Input
                                                        placeholder="Topic title..."
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        className="h-11 border-slate-200 focus:border-royal-emerald focus:ring-1 focus:ring-royal-emerald rounded-lg font-bold text-slate-900"
                                                    />
                                                    <Textarea
                                                        placeholder="Develop your argument..."
                                                        value={content}
                                                        onChange={(e) => setContent(e.target.value)}
                                                        className="min-h-[120px] border-slate-200 focus:border-royal-emerald focus:ring-1 focus:ring-royal-emerald rounded-lg font-medium text-slate-600 resize-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                        id="post-image-upload"
                                                    />
                                                    <label
                                                        htmlFor="post-image-upload"
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer transition-all font-bold text-xs"
                                                    >
                                                        <ImageIcon className="w-4 h-4" />
                                                        Media
                                                    </label>
                                                </div>

                                               <Button
  disabled={shareMutation.isPending || !title.trim() || !content.trim()}
  className="h-11 px-8 bg-blue-600 text-white hover:bg-blue-700 
             rounded-lg font-extrabold shadow-lg 
             disabled:bg-slate-300 disabled:text-slate-500
             transition-all"
>
  {shareMutation.isPending
    ? "Publishing..."
    : (editingId ? "Save Changes" : "Publish Topic")}
</Button>
 
                                            </div>

                                            {image && (
                                                <div className="relative mt-2 rounded-lg overflow-hidden border border-slate-100 group">
                                                    <img src={image} alt="Preview" className="w-full h-32 object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setImage(null)}
                                                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Posts Lists */}
                            <div className="space-y-4">
                                {isLoading ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-40 bg-white border border-slate-200 rounded-xl animate-pulse" />
                                        ))}
                                    </div>
                                ) : posts?.length === 0 ? (
                                    <div className="text-center py-20 bg-white border border-slate-200 rounded-xl">
                                        <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-slate-800">No active topics</h3>
                                        <p className="text-slate-500 text-sm mt-1">Be the first to start the discussion.</p>
                                    </div>
                                ) : (
                                    posts?.map((post) => (
                                        <Card
                                            key={post.id}
                                            className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white hover:border-royal-emerald/30 transition-all duration-300"
                                        >
                                            <div className="p-5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-9 w-9 border border-slate-100 shrink-0">
                                                            <AvatarFallback className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                                                                {post.user_name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-900 text-sm">{post.user_name}</span>
                                                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                                                                    <Calendar className="w-3 h-3" />
                                                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: enUS })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {(user?.id === post.user_id || !post.user_id) && (
                                                        <div className="flex gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleEdit(post)}
                                                                className="h-8 w-8 rounded-md hover:bg-slate-100 text-slate-400"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => deleteMutation.mutate(post.id)}
                                                                className="h-8 w-8 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-slate-600 font-medium text-sm leading-relaxed line-clamp-3 mb-4">
                                                            {post.content}
                                                        </p>
                                                    </div>
                                                    {post.image_url && (
                                                        <div className="w-full md:w-32 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-100">
                                                            <img
                                                                src={post.image_url}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                                                    <button
                                                        onClick={() => likeMutation.mutate({ id: post.id, type: 'likes' })}
                                                        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${post.likes > 0 ? 'text-royal-emerald bg-royal-emerald/10 rounded-md px-2 py-1' : 'text-slate-400 hover:text-royal-emerald hover:bg-slate-50 rounded-md px-2 py-1'}`}
                                                    >
                                                        <Heart className={`w-4 h-4 ${post.likes > 0 ? 'fill-current' : ''}`} />
                                                        {post.likes}
                                                    </button>
                                                    <button
                                                        onClick={() => likeMutation.mutate({ id: post.id, type: 'dislikes' })}
                                                        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-royal-emerald hover:bg-slate-50 rounded-md px-2 py-1 transition-colors"
                                                    >
                                                        <ThumbsDown className="w-4 h-4" />
                                                        {post.dislikes}
                                                    </button>
                                                   
                                                </div>
                                            </div>

                                            {/* Minimalist Comments */}
                                            {post.chat_comments?.length > 0 && (
                                                <div className="bg-slate-50 p-4 border-t border-slate-100 space-y-3">
                                                    {post.chat_comments.slice(0, 2).map((comment) => (
                                                        <div key={comment.id} className="flex gap-3">
                                                            <Avatar className="h-6 w-6 shrink-0 border border-slate-200">
                                                                <AvatarFallback className="text-[8px] font-bold">{comment.user_name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1 bg-white p-2 rounded-lg border border-slate-200 text-xs shadow-sm">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="font-bold text-slate-900">{comment.user_name}</span>
                                                                    <span className="text-[9px] text-slate-400">
                                                                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: enUS })}
                                                                    </span>
                                                                </div>
                                                                <p className="text-slate-600 font-medium">{comment.content}</p>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div className="relative bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                                                        <Input
                                                            placeholder="Add a reply..."
                                                            className="h-9 border-0 focus-visible:ring-0 text-xs font-medium pl-3 pr-10"
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
                                                        <button
                                                            className="absolute right-0 top-0 h-full px-3 text-royal-emerald hover:bg-royal-emerald/10 transition-colors rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-royal-emerald"
                                                            onClick={(e) => {
                                                                const input = (e.currentTarget.previousSibling as HTMLInputElement);
                                                                if (input.value.trim()) {
                                                                    commentMutation.mutate({ postId: post.id, text: input.value });
                                                                    input.value = '';
                                                                }
                                                            }}
                                                        >
                                                            <Send className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Professional Status */}
                            <Card className="border border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
                                <div className="bg-slate-900 p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border-2 border-slate-800">
                                            <AvatarFallback className="bg-royal-emerald text-white font-bold">{activeUserName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-bold text-white">{activeUserName}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Connected</p>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-slate-500 font-bold uppercase tracking-tighter">My Posts</span>
                                        <span className="font-bold text-slate-900">{posts?.filter(p => p.user_id === user?.id).length || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-slate-500 font-bold uppercase tracking-tighter">Score Impact</span>
                                        <span className="font-bold text-royal-emerald">
                                            {(posts?.filter(p => p.user_id === user?.id).reduce((acc, p) => acc + (p.likes || 0), 0) || 0) * 10} pts
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Topics/Trends */}
                            <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6">
                                <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
                                    <TrendingUp className="w-4 h-4 text-royal-emerald" />
                                    Hot Topics
                                </h3>
                                <div className="space-y-5">
                                    {[
                                        { tag: '#CAN2025', count: '1.2k posts' },
                                        { tag: '#MarocQualif', count: '850 posts' },
                                        { tag: '#LionsIndomptables', count: '640 posts' },
                                        { tag: '#TactiqueCAN', count: '420 posts' }
                                    ].map((item, i) => (
                                        <div key={i} className="group cursor-pointer">
                                            <p className="font-bold text-sm text-slate-900 group-hover:text-royal-emerald transition-colors">{item.tag}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{item.count}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full mt-6 border-slate-200 text-slate-600 font-bold text-xs h-10 rounded-lg">
                                    Browse all
                                </Button>
                            </Card>

                            {/* Guidelines */}
                            <div className="p-5 rounded-xl bg-slate-900/5 border border-slate-200">
                                <h4 className="font-bold text-slate-900 text-xs uppercase mb-2 tracking-widest">Code of conduct</h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                    Stay factual in your analysis. Passionate debates are encouraged as long as they remain sportsmanlike.
                                </p>
                            </div> 
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chat;