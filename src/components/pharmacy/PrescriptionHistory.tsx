
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pill, FileSearch, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock prescription data
const MOCK_PRESCRIPTIONS = [
  {
    id: "1",
    patientId: "P123",
    patientName: "John Doe",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    duration: "7 days",
    prescribedBy: "Dr. Sarah Johnson",
    prescribedDate: "2025-04-28",
    status: "active",
    refills: 2
  },
  {
    id: "2",
    patientId: "P123",
    patientName: "John Doe",
    medication: "Ibuprofen",
    dosage: "200mg",
    frequency: "As needed",
    duration: "30 days",
    prescribedBy: "Dr. Sarah Johnson",
    prescribedDate: "2025-04-25",
    status: "active",
    refills: 1
  },
  {
    id: "3",
    patientId: "P456",
    patientName: "Jane Smith",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "90 days",
    prescribedBy: "Dr. Michael Chen",
    prescribedDate: "2025-04-10",
    status: "active",
    refills: 3
  },
  {
    id: "4",
    patientId: "P789",
    patientName: "Emma Wilson",
    medication: "Levothyroxine",
    dosage: "125mcg",
    frequency: "Once daily",
    duration: "30 days",
    prescribedBy: "Dr. Sarah Johnson",
    prescribedDate: "2025-04-15",
    status: "active",
    refills: 5
  },
  {
    id: "5",
    patientId: "P123",
    patientName: "John Doe",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "90 days",
    prescribedBy: "Dr. Michael Chen",
    prescribedDate: "2025-03-20",
    status: "expired",
    refills: 0
  }
];

interface PrescriptionHistoryProps {
  isDoctor: boolean;
  patientId: string | null;
}

export function PrescriptionHistory({ isDoctor, patientId }: PrescriptionHistoryProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(patientId);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  // Filter prescriptions based on search query and selected patient
  const filteredPrescriptions = MOCK_PRESCRIPTIONS.filter(prescription => {
    const matchesSearch = 
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If we're in doctor mode with a selected patient, only show that patient's prescriptions
    if (isDoctor && selectedPatientId) {
      return matchesSearch && prescription.patientId === selectedPatientId;
    }
    
    // In patient mode, just show the current user's prescriptions
    if (!isDoctor) {
      return matchesSearch && prescription.patientId === "P123"; // Mock current user ID
    }
    
    // In doctor mode with no patient selected, show all
    return matchesSearch;
  });

  const handleLookupPatient = () => {
    if (!selectedPatientId || selectedPatientId.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a valid patient ID",
        variant: "destructive",
      });
      return;
    }
    
    const hasPatient = MOCK_PRESCRIPTIONS.some(p => p.patientId === selectedPatientId);
    
    if (hasPatient) {
      toast({
        title: "Patient Found",
        description: `Showing medication history for patient ${selectedPatientId}`,
      });
    } else {
      toast({
        title: "Patient Not Found",
        description: "No prescription records found for this patient",
        variant: "destructive",
      });
    }
  };

  const handlePrescriptionClick = (prescription: any) => {
    setSelectedPrescription(prescription);
  };

  const handleRefill = (prescriptionId: string) => {
    toast({
      title: "Refill Requested",
      description: "Your refill request has been submitted successfully",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <FileSearch className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>
              {isDoctor ? "Patient Medication History" : "My Prescriptions"}
            </CardTitle>
            <CardDescription>
              {isDoctor 
                ? "View and manage your patients' medication history" 
                : "View and manage your current prescriptions"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isDoctor && (
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter Patient ID"
              value={selectedPatientId || ""}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleLookupPatient}>
              <Search className="h-4 w-4 mr-2" />
              Lookup Patient
            </Button>
          </div>
        )}
        
        <div className="mb-6">
          <Input
            placeholder="Search prescriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {filteredPrescriptions.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {isDoctor && <TableHead>Patient</TableHead>}
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Prescribed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    {isDoctor && (
                      <TableCell>
                        <div>
                          <div className="font-medium">{prescription.patientName}</div>
                          <div className="text-xs text-gray-500">ID: {prescription.patientId}</div>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="font-medium">{prescription.medication}</div>
                      <div className="text-xs text-gray-500">{prescription.frequency}</div>
                    </TableCell>
                    <TableCell>{prescription.dosage}</TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(prescription.prescribedDate).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">by {prescription.prescribedBy}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={prescription.status === "active" ? "default" : "secondary"}
                      >
                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handlePrescriptionClick(prescription)}>
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Prescription Details</DialogTitle>
                              <DialogDescription>
                                Complete information about this prescription
                              </DialogDescription>
                            </DialogHeader>
                            {selectedPrescription && (
                              <div className="space-y-4 mt-4">
                                <div className="flex items-center">
                                  <Pill className="h-4 w-4 mr-2 text-primary" />
                                  <h3 className="text-lg font-semibold">{selectedPrescription.medication}</h3>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Patient</p>
                                    <p>{selectedPrescription.patientName}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Patient ID</p>
                                    <p>{selectedPrescription.patientId}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Dosage</p>
                                    <p>{selectedPrescription.dosage}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Frequency</p>
                                    <p>{selectedPrescription.frequency}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p>{selectedPrescription.duration}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Refills Remaining</p>
                                    <p>{selectedPrescription.refills}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Prescribed By</p>
                                    <p>{selectedPrescription.prescribedBy}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Prescribed Date</p>
                                    <p>{new Date(selectedPrescription.prescribedDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                
                                {!isDoctor && selectedPrescription.status === "active" && selectedPrescription.refills > 0 && (
                                  <Button 
                                    className="w-full mt-4" 
                                    onClick={() => handleRefill(selectedPrescription.id)}
                                  >
                                    Request Refill
                                  </Button>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {!isDoctor && prescription.status === "active" && prescription.refills > 0 && (
                          <Button size="sm" onClick={() => handleRefill(prescription.id)}>
                            Refill
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 border rounded-md">
            <FileSearch className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No prescriptions found</h3>
            <p className="text-gray-500 mt-1">
              {isDoctor 
                ? "No prescription records for this patient" 
                : "You don't have any active prescriptions"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
