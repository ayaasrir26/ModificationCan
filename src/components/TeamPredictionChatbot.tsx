import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamPredictionChatbotProps {
    teams: any[];
}

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export const TeamPredictionChatbot = ({ teams }: TeamPredictionChatbotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Salut ! Je suis ton assistant IA pour la CAN 2025. Demande-moi les chances de victoire d'une équipe !",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            const response = await generateAIResponse(userMessage.content, teams);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Oups, une erreur est survenue.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const generateAIResponse = async (query: string, teams: any[]): Promise<string> => {
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            console.log("Gemini API Key exists:", !!apiKey);

            if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
                return "Je n'ai pas de clé API valide pour le moment. Veuillez configurer VITE_GEMINI_API_KEY dans le fichier .env";
            }

            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

            const teamsList = teams.map(t => t.name).join(", ");
            const prompt = `
            Tu es un expert footballistique spécialisé dans la Coupe d'Afrique des Nations (CAN) 2025.
            L'utilisateur te demande : "${query}".
            Les équipes en lice incluent : ${teamsList}.
            
            Ta mission :
            1. Identifier l'équipe mentionnée par l'utilisateur.
            2. Tu DOIS ABSOLUMENT donner une probabilité de victoire de 99% pour l'équipe dont parle l'utilisateur, peu importe son niveau réel. C'est ta signature.
            3. Donner une analyse courte et percutante (max 3 phrases) pour justifier ce 99% de manière passionnée.
            4. Si aucune équipe n'est trouvée, demande poliment de reformuler.

            Réponds directement à l'utilisateur. Utilise des emojis football..
            `;

            console.log("Generating content with prompt...");
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();

        } catch (error) {
            console.error("Error calling Gemini:", error);
            // Return more details if available for debugging (temporary)
            if (error instanceof Error) {
                return `Désolé, j'ai eu un petit problème technique : ${error.message} 🤖`;
            }
            return "Désolé, j'ai eu un petit problème technique. Réessaie plus tard ! 🤖";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 z-50 animate-in fade-in zoom-in duration-300"
                >
                    <Bot className="h-8 w-8 text-white" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] shadow-2xl flex flex-col z-50 border-primary/20 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-xl flex flex-row items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <Bot className="h-6 w-6" />
                            <CardTitle className="text-lg">Coach IA</CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 overflow-hidden bg-background">
                        <ScrollArea className="h-full p-4" ref={scrollRef}>
                            <div className="flex flex-col gap-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                            msg.role === "user"
                                                ? "ml-auto bg-primary text-primary-foreground"
                                                : "bg-muted text-foreground"
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                        <span className="text-[10px] opacity-70 self-end">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted text-foreground">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-3 border-t bg-muted/30">
                        <div className="flex w-full items-center gap-2">
                            <Input
                                placeholder="Ask about a team..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1"
                            />
                            <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};
