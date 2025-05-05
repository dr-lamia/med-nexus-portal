
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/authentication/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorRegistration from "./pages/DoctorRegistration";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import FindDoctors from "./pages/FindDoctors";
import PatientManagement from "./pages/PatientManagement";
import Services from "./pages/Services";
import Pharmacy from "./pages/Pharmacy";
import MedicalRecords from "./pages/MedicalRecords";
import OnlineConsultation from "./pages/OnlineConsultation";
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointment";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Dashboard redirect component to handle user type-based redirection
const DashboardRedirect = () => {
  const { userType } = useAuth();
  
  if (userType === "doctor") {
    return <Navigate to="/doctor-dashboard" replace />;
  }
  
  return <Navigate to="/patient-dashboard" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctor-registration" element={<DoctorRegistration />} />
            <Route path="/about" element={<About />} />
            
            {/* User type specific routes */}
            <Route path="/patient-dashboard" element={
              <ProtectedRoute allowedUserTypes={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/doctor-dashboard" element={
              <ProtectedRoute allowedUserTypes={["doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            
            {/* Redirect to appropriate dashboard based on user type */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/find-doctors" element={
              <ProtectedRoute>
                <FindDoctors />
              </ProtectedRoute>
            } />
            <Route path="/patient-management" element={
              <ProtectedRoute allowedUserTypes={["doctor"]}>
                <PatientManagement />
              </ProtectedRoute>
            } />
            <Route path="/services" element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            } />
            <Route path="/pharmacy" element={
              <ProtectedRoute>
                <Pharmacy />
              </ProtectedRoute>
            } />
            <Route path="/medical-records" element={
              <ProtectedRoute>
                <MedicalRecords />
              </ProtectedRoute>
            } />
            <Route path="/online-consultation" element={
              <ProtectedRoute>
                <OnlineConsultation />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/book-appointment/:id" element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
