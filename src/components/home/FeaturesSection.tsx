
import { 
  Video, 
  FileText, 
  ClipboardList, 
  FlaskConical, 
  User, 
  Activity 
} from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  const CardContent = () => (
    <>
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-med-neutral-900 mb-2">{title}</h3>
      <p className="text-med-neutral-600">{description}</p>
    </>
  );

  if (link) {
    return (
      <Link to={link} className="block bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent />
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "Online Consultations",
      description: "Connect with healthcare professionals from the comfort of your home through secure video calls.",
      link: "/online-consultation"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Medical Records",
      description: "Access and share your medical records securely. Upload test results and track your health journey.",
      link: "/medical-records"
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Prescription Management",
      description: "Get digital prescriptions and order refills without visiting the clinic.",
      link: "/pharmacy"
    },
    {
      icon: <FlaskConical className="h-6 w-6" />,
      title: "Lab Results",
      description: "Receive and review your test results online with explanations from your doctor.",
      link: "/medical-records"
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "Specialist Referrals",
      description: "Quick and easy referrals to specialists when you need advanced care.",
      link: "/find-doctors"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Health Monitoring",
      description: "Track your health metrics and share them directly with your healthcare provider.",
      link: "/patient-dashboard"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-med-neutral-900 mb-4">Comprehensive Healthcare Solutions</h2>
          <p className="text-med-neutral-600 max-w-2xl mx-auto">
            Our platform provides everything you need to manage your healthcare journey in one place, making it easier than ever to stay healthy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
