
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export function DoctorSpecialties() {
  const specialties = [
    { name: "Cardiology", icon: "❤️", count: 142 },
    { name: "Dermatology", icon: "🧬", count: 89 },
    { name: "Neurology", icon: "🧠", count: 76 },
    { name: "Orthopedics", icon: "🦴", count: 103 },
    { name: "Pediatrics", icon: "👶", count: 155 },
    { name: "Ophthalmology", icon: "👁️", count: 67 },
    { name: "Psychiatry", icon: "🧠", count: 94 },
    { name: "Dentistry", icon: "🦷", count: 127 },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-med-neutral-900 mb-4">Find Specialists by Category</h2>
          <p className="text-med-neutral-600 max-w-2xl mx-auto">
            Browse our extensive network of qualified healthcare professionals across various specialties
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {specialties.map((specialty, index) => (
            <Link 
              key={index} 
              to={`/find-doctors?specialty=${specialty.name.toLowerCase()}`}
              className="block group"
            >
              <Card className="border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{specialty.icon}</div>
                  <h3 className="font-medium text-med-neutral-800 group-hover:text-primary transition-colors">
                    {specialty.name}
                  </h3>
                  <p className="text-sm text-med-neutral-500 mt-1">{specialty.count} doctors</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/find-doctors" 
            className="text-primary hover:text-primary-600 font-medium"
          >
            View all specialties →
          </Link>
        </div>
      </div>
    </section>
  );
}
