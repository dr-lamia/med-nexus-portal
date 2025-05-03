
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-16 bg-med-blue-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join MedNexus today and experience a new approach to healthcare management. Connect with specialists, manage appointments, and access your medical records all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-medium">
                Create Free Account
              </Button>
            </Link>
            <Link to="/find-doctors">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-medium">
                Find a Doctor
              </Button>
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-80">
            No credit card required. Start managing your healthcare journey today.
          </p>
        </div>
      </div>
    </section>
  );
}
