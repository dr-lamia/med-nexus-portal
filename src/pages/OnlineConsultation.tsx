
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Bot, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GeminiConsultation } from "@/components/consultation/GeminiConsultation";
import { Link } from "react-router-dom";

const OnlineConsultation = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("ai-consultation");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Online Consultations</h1>
        
        <Tabs defaultValue="ai-consultation" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-consultation" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>AI Health Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="doctor-consultation" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Doctor Consultation</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-consultation" className="mt-6">
            <Card className="border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Health Assistant (Powered by Google Gemini)
                </CardTitle>
                <CardDescription>
                  Get quick medical advice using our AI-powered health assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GeminiConsultation />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="doctor-consultation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Doctor Consultation
                </CardTitle>
                <CardDescription>
                  Schedule a video or chat consultation with a real doctor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-6">
                    Direct doctor consultations are coming soon. For now, please use our AI Health Assistant for immediate medical information or visit the Find Doctors page to contact a healthcare provider.
                  </p>
                  <Button className="mr-4" asChild>
                    <Link to="/find-doctors">Find Doctors</Link>
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("ai-consultation")}>
                    Use AI Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OnlineConsultation;
