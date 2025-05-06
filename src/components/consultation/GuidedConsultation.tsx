
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Send, User, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Structured diagnosis questions
const diagnosticQuestions = [
  "Hello! I'm your AI health assistant. To help direct you to the right specialist, I'll ask a few questions. What's your main health concern today?",
  "How long have you been experiencing these symptoms?",
  "On a scale of 1-10, how would you rate any pain or discomfort?",
  "Have you noticed any other symptoms accompanying your main concern?",
  "Do these symptoms affect your daily activities? If so, how?",
];

// Mapping symptoms to specialties
const specialtyMapping: Record<string, { name: string, description: string, route: string }> = {
  "dental": { 
    name: "Dentistry", 
    description: "Issues related to teeth, gums, and oral health", 
    route: "/find-doctors?specialty=dentistry" 
  },
  "child": { 
    name: "Pediatrics", 
    description: "Medical care for infants, children, and adolescents", 
    route: "/find-doctors?specialty=pediatrics" 
  },
  "skin": { 
    name: "Dermatology", 
    description: "Conditions related to skin, hair, and nails", 
    route: "/find-doctors?specialty=dermatology" 
  },
  "heart": { 
    name: "Cardiology", 
    description: "Heart and blood vessel conditions", 
    route: "/find-doctors?specialty=cardiology" 
  },
  "bone": { 
    name: "Orthopedics", 
    description: "Issues related to bones, joints, ligaments, and muscles", 
    route: "/find-doctors?specialty=orthopedics" 
  },
  "eye": { 
    name: "Ophthalmology", 
    description: "Eye conditions and vision problems", 
    route: "/find-doctors?specialty=ophthalmology" 
  },
  "mental": { 
    name: "Psychiatry", 
    description: "Mental health conditions and emotional well-being", 
    route: "/find-doctors?specialty=psychiatry" 
  },
  "nerve": { 
    name: "Neurology", 
    description: "Disorders of the nervous system, including brain and spinal cord", 
    route: "/find-doctors?specialty=neurology" 
  },
};

// Embedding the API key directly in the component
const GEMINI_API_KEY = "AIzaSyCWPGCKvs7zKIzqWYnrgIJh5mmyCOG5zXQ";

export const GuidedConsultation = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: diagnosticQuestions[0]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [patientResponses, setPatientResponses] = useState<string[]>([]);
  const [diagnosisComplete, setDiagnosisComplete] = useState(false);
  const [recommendedSpecialty, setRecommendedSpecialty] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const determineSpecialty = async (responses: string[]) => {
    setIsLoading(true);
    
    try {
      const combinedResponses = responses.join(" ");
      
      // Updated API endpoint URL
      const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", {
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
                  text: `Based on the following patient responses to a medical questionnaire, determine which single medical specialty would be most appropriate for their concerns. 
                  Only respond with ONE of these exact specialty keywords: "dental", "child", "skin", "heart", "bone", "eye", "mental", "nerve".
                  DO NOT include any explanations, just the single keyword.
                  
                  Patient responses:
                  ${combinedResponses}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 20,
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        const specialtyKeyword = data.candidates[0].content.parts[0].text.trim().toLowerCase();
        
        // Find the matching specialty or default to general medicine
        if (specialtyMapping[specialtyKeyword]) {
          setRecommendedSpecialty(specialtyKeyword);
          
          const specialtyInfo = specialtyMapping[specialtyKeyword];
          const summaryMessage: Message = { 
            role: "assistant", 
            content: `Based on your symptoms, I recommend consulting with a ${specialtyInfo.name} specialist. ${specialtyInfo.description}. Would you like me to help you find a ${specialtyInfo.name} specialist?` 
          };
          
          setMessages(prev => [...prev, summaryMessage]);
        } else {
          // Default if no match found
          const defaultMessage: Message = { 
            role: "assistant", 
            content: "Based on your symptoms, I recommend scheduling an appointment with a general practitioner who can provide a comprehensive evaluation. Would you like me to help you find a doctor?" 
          };
          
          setMessages(prev => [...prev, defaultMessage]);
          setRecommendedSpecialty("general");
        }
      } else {
        throw new Error("Failed to get specialty recommendation");
      }
    } catch (error) {
      console.error("Error determining specialty:", error);
      
      // Fallback recommendation
      const fallbackMessage: Message = { 
        role: "assistant", 
        content: "I'm having trouble analyzing your symptoms. To be safe, I recommend consulting with a general practitioner who can provide a proper evaluation. Would you like me to help you find a doctor?" 
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      setRecommendedSpecialty("general");
    } finally {
      setDiagnosisComplete(true);
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Store patient response
    const updatedResponses = [...patientResponses, input];
    setPatientResponses(updatedResponses);
    
    setInput("");
    setIsLoading(true);

    // Move to next question if available
    if (currentQuestionIndex < diagnosticQuestions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      const nextQuestion = diagnosticQuestions[nextQuestionIndex];
      
      setTimeout(() => {
        const assistantMessage: Message = { role: "assistant", content: nextQuestion };
        setMessages((prev) => [...prev, assistantMessage]);
        setCurrentQuestionIndex(nextQuestionIndex);
        setIsLoading(false);
      }, 800); // Short delay to simulate thinking
    } else {
      // All questions answered, determine specialty
      await determineSpecialty(updatedResponses);
    }
  };

  const handleFindSpecialist = () => {
    if (!recommendedSpecialty) return;
    
    const specialtyInfo = specialtyMapping[recommendedSpecialty];
    if (specialtyInfo) {
      navigate(specialtyInfo.route);
    } else {
      navigate("/find-doctors");
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
        {diagnosisComplete ? (
          <Button
            onClick={handleFindSpecialist}
            className="w-full flex items-center justify-center gap-2"
          >
            Find Specialist <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <Textarea
              placeholder="Type your answer here..."
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
          </>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        This AI assistant provides preliminary guidance only and is not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
    </div>
  );
};
