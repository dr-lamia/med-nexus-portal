
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-med-blue-500 to-med-blue-700 text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48cGF0aCBkPSJNIDIwIC0yMCBMIC0yMCAyMCBNIDAgLTIwIEwgLTIwIDAgTSAyMCAwIEwgMCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Your Health, Our Priority</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connect with trusted healthcare professionals and manage your medical journey with ease through our comprehensive healthcare platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/find-doctors">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-medium">
                Find a Doctor
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-medium">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
