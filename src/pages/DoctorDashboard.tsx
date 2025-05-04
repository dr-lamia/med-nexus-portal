
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, User, Calendar, FileSearch, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [patientId, setPatientId] = useState("");
  const [showPatientRecord, setShowPatientRecord] = useState(false);

  const handlePatientLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a valid patient ID",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would fetch patient data from a backend
    setShowPatientRecord(true);
    toast({
      title: "Patient found",
      description: "Medical records accessed successfully",
    });
  };

  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
              <p className="text-gray-600">Welcome, Dr. {user?.lastName}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Shield className="mr-2 h-4 w-4" />
                    Access Patient Records
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Access Patient Records</DialogTitle>
                    <DialogDescription>
                      Enter the patient's ID to access their medical records
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePatientLookup}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientId">Patient ID</Label>
                        <Input 
                          id="patientId" 
                          placeholder="Enter patient ID" 
                          value={patientId}
                          onChange={(e) => setPatientId(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Access Records</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">My Patients</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Today's Appointments
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      Next: 10:30 AM - James Wilson
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Patients
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">
                      3 new this week
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Medical Records Updated
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      This month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Referrals Sent
                    </CardTitle>
                    <FileSearch className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">
                      This month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Today's scheduled patient visits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">James Wilson</p>
                          <p className="text-sm text-muted-foreground">10:30 AM - Follow-up</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="secondary" size="sm">Start</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Emily Johnson</p>
                          <p className="text-sm text-muted-foreground">11:15 AM - New patient</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="secondary" size="sm">Start</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Robert Garcia</p>
                          <p className="text-sm text-muted-foreground">1:00 PM - Consultation</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="secondary" size="sm">Start</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Medical Information</CardTitle>
                    <CardDescription>Update your professional profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Professional Information</Label>
                        <Button variant="secondary" className="w-full">Update Specialties & Services</Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Availability Schedule</Label>
                        <Button variant="secondary" className="w-full">Manage Appointment Slots</Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Patient Portal</Label>
                        <Button variant="secondary" className="w-full">Upload Resources for Patients</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {showPatientRecord && (
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Medical Record</CardTitle>
                    <CardDescription>ID: {patientId}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Patient Information</h3>
                        <p className="text-sm">Name: John Doe</p>
                        <p className="text-sm">Age: 42</p>
                        <p className="text-sm">Gender: Male</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Recent Medical History</h3>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>Hypertension - diagnosed 2 years ago</li>
                          <li>Annual physical - April 3, 2025</li>
                          <li>Blood work - Normal ranges</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => setShowPatientRecord(false)}>
                          Close
                        </Button>
                        <Button size="sm">Full Medical Record</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle>My Patients</CardTitle>
                  <CardDescription>
                    View and manage your patient list
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Patient management coming soon</p>
                    <Button asChild>
                      <Link to="/patient-management">Go to Patient Management</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Calendar</CardTitle>
                  <CardDescription>
                    Manage your schedule and patient appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Calendar view coming soon</p>
                    <Button>Set Availability</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Profile</CardTitle>
                  <CardDescription>
                    Update your professional information visible to patients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Profile management coming soon</p>
                    <Button>Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
