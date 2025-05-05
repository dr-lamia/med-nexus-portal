
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Pill, Truck, Bell, Headphones } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { PrescriptionForm } from "@/components/pharmacy/PrescriptionForm";
import { PrescriptionHistory } from "@/components/pharmacy/PrescriptionHistory";
import { NearbyPharmacies } from "@/components/pharmacy/NearbyPharmacies";
import { useToast } from "@/hooks/use-toast";

const Pharmacy = () => {
  const { userType } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("services");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "Tab changed",
      description: `You are now viewing the ${value} tab`,
    });
  };

  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Online Pharmacy</h1>
          
          <Tabs defaultValue="services" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex md:grid-cols-none mb-8">
              <TabsTrigger value="services">Services</TabsTrigger>
              {userType === "doctor" ? (
                <TabsTrigger value="prescribe">Add Prescription</TabsTrigger>
              ) : (
                <TabsTrigger value="history">My Prescriptions</TabsTrigger>
              )}
              <TabsTrigger value="nearby">Nearby Pharmacies</TabsTrigger>
              {userType === "doctor" && (
                <TabsTrigger value="patient-history">Patient Medications</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="services">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Pill className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold ml-4">Online Medication Services</h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Our online pharmacy provides convenient access to prescription medications and over-the-counter products.
                  Simply upload your prescription, and our licensed pharmacists will prepare your order for pickup or delivery.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Pill className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold text-lg">Prescription Refills</h3>
                    </div>
                    <p className="text-gray-600">Easily request medication refills and manage your prescriptions online.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Truck className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold text-lg">Medication Delivery</h3>
                    </div>
                    <p className="text-gray-600">Get your medications delivered directly to your doorstep within 24-48 hours.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Bell className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold text-lg">Medication Reminders</h3>
                    </div>
                    <p className="text-gray-600">Set up notifications to help you remember to take your medications on time.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Headphones className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold text-lg">Expert Pharmacist Advice</h3>
                    </div>
                    <p className="text-gray-600">Consult with our experienced pharmacists about your medications and health concerns.</p>
                  </div>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How do I order prescription medications?</h3>
                    <p className="text-gray-600">Upload your prescription through our secure portal, and our pharmacist will process your order. You'll receive a notification when it's ready for pickup or delivery.</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How long does delivery take?</h3>
                    <p className="text-gray-600">Most medications are delivered within 24-48 hours, depending on your location and medication availability.</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Are there any delivery fees?</h3>
                    <p className="text-gray-600">Delivery is free for orders over $25. For smaller orders, a $5 delivery fee applies.</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Can I transfer my existing prescriptions?</h3>
                    <p className="text-gray-600">Yes, you can easily transfer your prescriptions from another pharmacy. Just provide us with your current pharmacy information, and we'll handle the rest.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {userType === "doctor" && (
              <TabsContent value="prescribe">
                <PrescriptionForm />
              </TabsContent>
            )}
            
            <TabsContent value="history">
              <PrescriptionHistory isDoctor={false} patientId={null} />
            </TabsContent>
            
            <TabsContent value="nearby">
              <NearbyPharmacies />
            </TabsContent>
            
            {userType === "doctor" && (
              <TabsContent value="patient-history">
                <PrescriptionHistory isDoctor={true} patientId={null} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Pharmacy;
