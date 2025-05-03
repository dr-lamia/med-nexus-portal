
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DoctorSearchForm } from "@/components/doctors/DoctorSearchForm";
import { DoctorCard } from "@/components/doctors/DoctorCard";

// Mock data for demonstration
const mockDoctors = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Cardiology",
    location: "New York, NY",
    rating: 4.9,
    reviewCount: 127,
    availability: "Available today",
    imageUrl: undefined,
    verified: true,
  },
  {
    id: "2",
    name: "David Chen",
    specialty: "Dermatology",
    location: "San Francisco, CA",
    rating: 4.7,
    reviewCount: 94,
    availability: "Next available: Tomorrow",
    imageUrl: undefined,
    verified: true,
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    specialty: "Pediatrics",
    location: "Chicago, IL",
    rating: 4.8,
    reviewCount: 113,
    availability: "Available today",
    imageUrl: undefined,
    verified: true,
  },
  {
    id: "4",
    name: "James Wilson",
    specialty: "Orthopedics",
    location: "Boston, MA",
    rating: 4.6,
    reviewCount: 87,
    availability: "Next available: Thu, May 6",
    imageUrl: undefined,
    verified: false,
  },
  {
    id: "5",
    name: "Emily Taylor",
    specialty: "Neurology",
    location: "Seattle, WA",
    rating: 4.9,
    reviewCount: 142,
    availability: "Next available: Wed, May 5",
    imageUrl: undefined,
    verified: true,
  },
  {
    id: "6",
    name: "Michael Brown",
    specialty: "Psychiatry",
    location: "Austin, TX",
    rating: 4.7,
    reviewCount: 78,
    availability: "Available today",
    imageUrl: undefined,
    verified: true,
  },
];

const FindDoctors = () => {
  const [searchResults, setSearchResults] = useState(mockDoctors);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: any) => {
    setIsSearching(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Filter mock data based on search query
      const filteredResults = mockDoctors.filter(doctor => {
        const matchesSpecialty = !query.specialty || doctor.specialty.toLowerCase().includes(query.specialty.toLowerCase());
        const matchesLocation = !query.location || doctor.location.toLowerCase().includes(query.location.toLowerCase());
        const matchesName = !query.name || doctor.name.toLowerCase().includes(query.name.toLowerCase());
        
        return matchesSpecialty && matchesLocation && matchesName;
      });
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <Layout>
      <div className="py-10 bg-med-blue-500 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Find the Right Doctor</h1>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <DoctorSearchForm onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {isSearching 
                ? "Searching..." 
                : `${searchResults.length} doctors found`}
            </h2>
          </div>
          
          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-100 h-72 rounded-lg animate-pulse-soft"></div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-med-neutral-900 mb-2">No doctors found</h3>
              <p className="text-med-neutral-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FindDoctors;
