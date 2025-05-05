
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Truck, MapPin, Phone, ExternalLink } from "lucide-react";

const MOCK_PHARMACIES = [
  {
    id: "1",
    name: "MedCare Pharmacy",
    address: "123 Main Street, Cityville",
    phone: "(555) 123-4567",
    hours: "8:00 AM - 9:00 PM",
    distance: "0.8 miles",
    hasDelivery: true
  },
  {
    id: "2",
    name: "HealthPlus Drugstore",
    address: "456 Oak Avenue, Townsburg",
    phone: "(555) 987-6543",
    hours: "24 hours",
    distance: "1.2 miles",
    hasDelivery: true
  },
  {
    id: "3",
    name: "Community Care Pharmacy",
    address: "789 Maple Boulevard, Villageton",
    phone: "(555) 456-7890",
    hours: "9:00 AM - 7:00 PM",
    distance: "1.5 miles",
    hasDelivery: false
  },
  {
    id: "4",
    name: "Wellness Rx",
    address: "321 Pine Street, Hamletville",
    phone: "(555) 234-5678",
    hours: "8:00 AM - 8:00 PM",
    distance: "2.3 miles",
    hasDelivery: true
  }
];

export function NearbyPharmacies() {
  const { toast } = useToast();
  const [zipCode, setZipCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a ZIP code",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setSearchCompleted(true);
      toast({
        title: "Pharmacies Found",
        description: `Found ${MOCK_PHARMACIES.length} pharmacies near ${zipCode}`,
      });
    }, 1500);
  };
  
  const handleContact = (pharmacy: typeof MOCK_PHARMACIES[0]) => {
    toast({
      title: "Contacting Pharmacy",
      description: `Calling ${pharmacy.name} at ${pharmacy.phone}`,
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Nearby Pharmacies</CardTitle>
            <CardDescription>Find and contact pharmacies in your area</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Enter your ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? "Searching..." : "Find Pharmacies"}
            </Button>
          </div>
        </form>
        
        {searchCompleted && (
          <div className="space-y-4">
            {MOCK_PHARMACIES.map((pharmacy) => (
              <div 
                key={pharmacy.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{pharmacy.name}</h3>
                    <div className="flex items-center mt-1 text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {pharmacy.address}
                      <span className="ml-2 text-primary font-medium">{pharmacy.distance}</span>
                    </div>
                    <div className="mt-2 flex items-center text-gray-600 text-sm">
                      <Phone className="h-4 w-4 mr-1" />
                      {pharmacy.phone}
                    </div>
                    <div className="mt-1 text-gray-600 text-sm">
                      Hours: {pharmacy.hours}
                    </div>
                    {pharmacy.hasDelivery && (
                      <div className="mt-2 flex items-center text-primary text-sm font-medium">
                        <Truck className="h-4 w-4 mr-1" />
                        Delivery available
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" onClick={() => handleContact(pharmacy)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!searchCompleted && (
          <div className="text-center py-16 border rounded-md">
            <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No pharmacies found</h3>
            <p className="text-gray-500 mt-1">
              Enter your ZIP code to find pharmacies near you
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
