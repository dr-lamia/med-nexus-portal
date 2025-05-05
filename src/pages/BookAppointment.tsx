
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { Clock } from "lucide-react";

// Mock doctor data for demonstration
const mockDoctors = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Cardiology",
    imageUrl: "https://randomuser.me/api/portraits/women/76.jpg",
    availableTimes: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
  },
  {
    id: "2",
    name: "Michael Chen",
    specialty: "Family Medicine",
    imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
    availableTimes: ["09:30 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"],
  },
  {
    id: "3",
    name: "Emily Taylor",
    specialty: "Neurology",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    availableTimes: ["08:00 AM", "11:30 AM", "01:30 PM", "03:30 PM", "04:30 PM"],
  },
];

const BookAppointment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  // Find the doctor based on id from the mock data
  const doctor = mockDoctors.find(doc => doc.id === id);

  if (!doctor) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Not Found</CardTitle>
              <CardDescription>
                We couldn't find the doctor you're looking for.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/find-doctors")}>
                Return to Find Doctors
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to a database via an API
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with Dr. ${doctor.name} is scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
    });
    
    // Navigate to appointments page after booking
    setTimeout(() => {
      navigate("/appointments");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <img 
                    src={doctor.imageUrl} 
                    alt={`Dr. ${doctor.name}`} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Dr. {doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Appointment</CardTitle>
                <CardDescription>
                  Select your preferred date and time for the appointment with Dr. {doctor.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="date">Select Date</Label>
                      <div className="mt-2 border rounded-md p-3">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => 
                            date < new Date() || 
                            date.getDay() === 0 || // Sunday
                            date.getDay() === 6    // Saturday
                          }
                          className="mx-auto pointer-events-auto"
                        />
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <div>
                        <Label htmlFor="time">Select Time</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {doctor.availableTimes.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              className="flex items-center justify-center"
                              onClick={() => setSelectedTime(time)}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Textarea
                        id="reason"
                        placeholder="Briefly describe your symptoms or reason for consultation"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="Your phone number"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Confirm Appointment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookAppointment;
