
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Send, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GeminiConsultation } from "@/components/consultation/GeminiConsultation";

const OnlineConsultation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ai-consultation");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Online Consultations</h1>
        
        <Tabs defaultValue="ai-consultation" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-consultation">AI Health Assistant</TabsTrigger>
            <TabsTrigger value="doctor-consultation">Doctor Consultation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-consultation" className="mt-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>AI Health Assistant</CardTitle>
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
                <CardTitle>Doctor Consultation</CardTitle>
                <CardDescription>
                  Schedule a video or chat consultation with a real doctor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-6">
                    Direct doctor consultations are coming soon. For now, please use our AI Health Assistant for immediate medical information or visit the Find Doctors page to contact a healthcare provider.
                  </p>
                  <Button className="mr-4">Find Doctors</Button>
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
