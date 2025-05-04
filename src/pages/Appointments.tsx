
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

// Mock appointment data for demonstration
const mockAppointments = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "May 8, 2025",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    specialty: "Family Medicine",
    date: "May 15, 2025",
    time: "2:30 PM",
    status: "Confirmed",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Taylor",
    specialty: "Neurology",
    date: "May 22, 2025",
    time: "11:15 AM",
    status: "Pending",
  },
];

const Appointments = () => {
  const { user, userType } = useAuth();
  const [appointments] = useState(mockAppointments);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <Button asChild>
            <Link to="/find-doctors">Schedule New Appointment</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              {userType === "patient" 
                ? "View and manage your scheduled appointments with healthcare providers" 
                : "View and manage your scheduled appointments with patients"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <Table>
                <TableCaption>A list of your upcoming appointments.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.doctorName}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "Confirmed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          {appointment.status === "Confirmed" ? "Reschedule" : "Confirm"}
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You don't have any upcoming appointments</p>
                <Button asChild>
                  <Link to="/find-doctors">Find a Doctor</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Appointments;
