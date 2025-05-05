
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Video, 
  FileText, 
  ClipboardList, 
  FlaskConical, 
  User, 
  Activity 
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
}

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Online Consultations",
      description: "Connect with healthcare professionals from the comfort of your home through secure video calls.",
      icon: <Video className="h-6 w-6 text-primary" />,
      path: "/online-consultation"
    },
    {
      title: "Medical Records",
      description: "Access and manage your complete medical history in one secure location.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      path: "/medical-records"
    },
    {
      title: "Prescription Management",
      description: "Get digital prescriptions and order refills without visiting the clinic.",
      icon: <ClipboardList className="h-6 w-6 text-primary" />,
      path: "/pharmacy"
    },
    {
      title: "Lab Results",
      description: "Receive and review your test results online with explanations from your doctor.",
      icon: <FlaskConical className="h-6 w-6 text-primary" />,
      path: "/medical-records"
    },
    {
      title: "Specialist Referrals",
      description: "Quick and easy referrals to specialists when you need advanced care.",
      icon: <User className="h-6 w-6 text-primary" />,
      path: "/find-doctors"
    },
    {
      title: "Health Monitoring",
      description: "Track your health metrics and share them directly with your healthcare provider.",
      icon: <Activity className="h-6 w-6 text-primary" />,
      path: "/patient-dashboard"
    }
  ];

  const handleCardClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const ServiceCard = ({ title, description, icon, path }: ServiceCardProps) => {
    return (
      <Card 
        className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleCardClick(path)}
      >
        <CardContent className="p-6">
          <div className="mb-4 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-12">Our Services</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title} 
                description={service.description}
                icon={service.icon}
                path={service.path}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
