
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, User, Calendar, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Patient Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName} {user?.lastName}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500 mb-1">Patient ID: <span className="font-mono font-medium">{user?.id}</span></p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Appointments
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">
                      Next: May 8, 2025 at 10:00 AM
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Medical Records
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      Last updated: April 30, 2025
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Prescriptions
                    </CardTitle>
                    <FileSearch className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">
                      2 active prescriptions
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      My Doctors
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">
                      Primary care & specialist
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Medical Records</CardTitle>
                    <CardDescription>Your latest health information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Blood Test Results</p>
                          <p className="text-sm text-muted-foreground">April 28, 2025</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/medical-records">View</Link>
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Annual Physical</p>
                          <p className="text-sm text-muted-foreground">March 15, 2025</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/medical-records">View</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="link" className="p-0" asChild>
                        <Link to="/medical-records">View all medical records</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled visits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Dr. Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">May 8, 2025 at 10:00 AM</p>
                          <p className="text-sm">Cardiology</p>
                        </div>
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Dr. Michael Chen</p>
                          <p className="text-sm text-muted-foreground">May 15, 2025 at 2:30 PM</p>
                          <p className="text-sm">Family Medicine</p>
                        </div>
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="secondary" className="w-full" asChild>
                        <Link to="/find-doctors">Schedule New Appointment</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Your Appointments</CardTitle>
                  <CardDescription>
                    Manage your scheduled appointments with healthcare providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Appointments section coming soon</p>
                    <Button asChild>
                      <Link to="/find-doctors">Find a Doctor</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>
                    Access and manage your health information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">View your medical records or upload new ones</p>
                    <Button asChild>
                      <Link to="/medical-records">Go to Medical Records</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctors">
              <Card>
                <CardHeader>
                  <CardTitle>Find Doctors</CardTitle>
                  <CardDescription>
                    Search for healthcare providers by specialty, location, or availability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Find the right doctor for your needs</p>
                    <Button asChild>
                      <Link to="/find-doctors">Search Doctors</Link>
                    </Button>
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

export default PatientDashboard;
