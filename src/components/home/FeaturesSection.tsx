
import { Bell, Calendar, Search, Upload, MessageCircle, Pill } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-med-neutral-900 mb-2">{title}</h3>
      <p className="text-med-neutral-600">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Find Specialists",
      description: "Search for doctors by specialty, location, and availability to find the perfect match for your needs."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Easy Scheduling",
      description: "Book appointments online and receive confirmations instantly. Manage your medical calendar effortlessly."
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Digital Records",
      description: "Access and share your medical records securely. Upload test results and track your health journey."
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Connect with Doctors",
      description: "Chat with healthcare providers, get quick advice, and attend virtual consultations from anywhere."
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Reminders",
      description: "Never miss an appointment with timely notifications and medication reminders tailored to your schedule."
    },
    {
      icon: <Pill className="h-6 w-6" />,
      title: "Online Pharmacy",
      description: "Order prescribed medications online and have them delivered directly to your doorstep."
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
