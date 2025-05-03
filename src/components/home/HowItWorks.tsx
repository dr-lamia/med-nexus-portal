
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create an account",
      description: "Register as a patient or healthcare provider to access our platform's features."
    },
    {
      number: "02",
      title: "Find your doctor",
      description: "Search by specialty, location, or availability to find the right healthcare professional."
    },
    {
      number: "03",
      title: "Schedule appointment",
      description: "Book your preferred time slot online and receive instant confirmation."
    },
    {
      number: "04",
      title: "Receive care",
      description: "Visit in person or connect virtually for your consultation and follow-up care."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-med-neutral-900 mb-4">How MedNexus Works</h2>
            <p className="text-med-neutral-600 mb-8">
              Our simple four-step process makes accessing healthcare services easier than ever before.
            </p>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-medium text-med-neutral-900 mb-1">{step.title}</h3>
                    <p className="text-med-neutral-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-med-blue-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-med-neutral-900 mb-4">Why Choose MedNexus?</h3>
            
            <ul className="space-y-3">
              {[
                "Access to verified healthcare professionals",
                "Convenient online appointment booking",
                "Secure storage of medical records",
                "Easy communication with doctors",
                "Prescription management and ordering",
                "Virtual consultations from anywhere"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-med-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-med-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 border border-med-blue-200 bg-white rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-med-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">99%</span>
                </div>
                <p className="text-med-neutral-900 font-medium">Patient Satisfaction</p>
              </div>
              <p className="text-med-neutral-600 text-sm">
                Join thousands of satisfied patients managing their healthcare journey with MedNexus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
