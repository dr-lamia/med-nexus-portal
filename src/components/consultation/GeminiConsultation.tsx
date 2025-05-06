
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Send, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Embedding the API key directly in the component
const GEMINI_API_KEY = "AIzaSyCWPGCKvs7zKIzqWYnrgIJh5mmyCOG5zXQ";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const GeminiConsultation = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI health assistant. I can provide general medical information, but remember I'm not a replacement for professional medical advice. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a helpful medical assistant who provides general health information. You always make it clear you're an AI and not a doctor and encourage users to seek professional medical advice for specific health concerns. 
                  
                  Respond to this message from a patient: ${input}`
                }
              ]
            }
          ],
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        const assistantResponse = data.candidates[0].content.parts[0].text;
        const assistantMessage: Message = { role: "assistant", content: assistantResponse };
        setMessages((prev) => [...prev, assistantMessage]);
      } else if (data.promptFeedback?.blockReason) {
        // Handle blocked content
        toast({
          title: "Response Blocked",
          description: "The AI couldn't respond due to safety concerns with your query",
          variant: "destructive",
        });
        const assistantMessage: Message = { 
          role: "assistant", 
          content: "I'm unable to provide information on this topic. Please try asking something else or consult with a healthcare provider." 
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again later.",
        variant: "destructive",
      });
      
      const errorMessage: Message = { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error processing your request. Please try again later." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4 bg-accent/10 rounded-md mb-4 overflow-y-auto" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {message.role === "user" ? "You" : "AI Assistant"}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span className="font-semibold">AI Assistant</span>
                </div>
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Textarea
          placeholder="Type your health question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1"
          rows={3}
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading || input.trim() === ""}
          className="self-end"
        >
          {isLoading ? "Sending..." : <Send className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
    </div>
  );
};
