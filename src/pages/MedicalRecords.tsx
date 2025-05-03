
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Upload, 
  FileText, 
  Image, 
  FileCheck
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number(),
});

const questionnairSchema = z.object({
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalHistory: z.string().optional(),
  familyHistory: z.string().optional(),
  smoking: z.enum(["yes", "no", "former"]),
  alcohol: z.enum(["none", "occasional", "moderate", "heavy"]),
  exerciseFrequency: z.enum(["none", "occasional", "regular", "daily"]),
  dietaryRestrictions: z.string().optional(),
  consentToShare: z.boolean().default(false),
});

const MedicalRecords = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof questionnairSchema>>({
    resolver: zodResolver(questionnairSchema),
    defaultValues: {
      allergies: "",
      medications: "",
      medicalHistory: "",
      familyHistory: "",
      smoking: "no",
      alcohol: "none",
      exerciseFrequency: "none",
      dietaryRestrictions: "",
      consentToShare: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      // Show preview if it's an image
      if (newFiles[0].type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(newFiles[0]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (index === 0) {
      setImagePreview(null);
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully.`,
      });
      setFiles([]);
      setImagePreview(null);
    }, 2000);
  };

  const onSubmitQuestionnaire = (data: z.infer<typeof questionnairSchema>) => {
    toast({
      title: "Questionnaire submitted",
      description: "Your medical information has been saved.",
    });
    console.log(data);
  };

  const fileTypeIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="h-5 w-5" />;
    if (type.startsWith("application/pdf")) return <FileText className="h-5 w-5" />;
    return <FileCheck className="h-5 w-5" />;
  };

  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Medical Records</h1>
          
          <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload Records</TabsTrigger>
              <TabsTrigger value="questionnaire">Health Questionnaire</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Medical Records</CardTitle>
                  <CardDescription>
                    Upload electronic health records, X-rays, or other medical documents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-4">
                        Drag and drop your files here, or click to browse
                      </p>
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Button variant="outline" className="relative">
                          <span>Select Files</span>
                          <Input
                            id="file-upload"
                            type="file"
                            multiple
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                          />
                        </Button>
                      </Label>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: PDF, JPG, PNG, DICOM
                      </p>
                    </div>
                    
                    {imagePreview && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative cursor-pointer rounded-md overflow-hidden border border-gray-200">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-48 object-cover" 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <p className="text-white text-sm font-medium">Click to view</p>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Image Preview</DialogTitle>
                          </DialogHeader>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full object-contain max-h-[calc(100vh-200px)]" 
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {files.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-3">Selected Files ({files.length})</h3>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                              <div className="flex items-center">
                                {fileTypeIcon(file.type)}
                                <span className="ml-2 text-sm">{file.name}</span>
                                <span className="ml-2 text-xs text-gray-500">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemoveFile(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={files.length === 0 || uploading}
                    onClick={handleUpload}
                  >
                    {uploading ? "Uploading..." : "Upload Files"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="questionnaire">
              <Card>
                <CardHeader>
                  <CardTitle>Health Questionnaire</CardTitle>
                  <CardDescription>
                    Please provide your medical information to help us better understand your health status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitQuestionnaire)} className="space-y-6">
                      <Collapsible className="w-full space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Medical History</h3>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="space-y-4">
                          <FormField
                            control={form.control}
                            name="allergies"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Allergies</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="List any allergies you have"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Include food, medication, and environmental allergies
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="medications"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Medications</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="List medications you are currently taking"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="medicalHistory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Previous Medical Conditions</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe any previous or ongoing medical conditions"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="familyHistory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Family Medical History</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="List any relevant family medical history"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CollapsibleContent>
                      </Collapsible>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Lifestyle</h3>
                        
                        <FormField
                          control={form.control}
                          name="smoking"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Smoking Status</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="smoking-yes" />
                                    <Label htmlFor="smoking-yes">Yes</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="smoking-no" />
                                    <Label htmlFor="smoking-no">No</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="former" id="smoking-former" />
                                    <Label htmlFor="smoking-former">Former smoker</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="alcohol"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alcohol Consumption</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" id="alcohol-none" />
                                    <Label htmlFor="alcohol-none">None</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="occasional" id="alcohol-occasional" />
                                    <Label htmlFor="alcohol-occasional">Occasional</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="moderate" id="alcohol-moderate" />
                                    <Label htmlFor="alcohol-moderate">Moderate</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="heavy" id="alcohol-heavy" />
                                    <Label htmlFor="alcohol-heavy">Heavy</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="exerciseFrequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Exercise Frequency</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" id="exercise-none" />
                                    <Label htmlFor="exercise-none">None</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="occasional" id="exercise-occasional" />
                                    <Label htmlFor="exercise-occasional">Occasional</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="regular" id="exercise-regular" />
                                    <Label htmlFor="exercise-regular">Regular (3-4 times/week)</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="daily" id="exercise-daily" />
                                    <Label htmlFor="exercise-daily">Daily</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="dietaryRestrictions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dietary Restrictions</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="List any dietary restrictions or preferences"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="consentToShare"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Consent to Share Information
                              </FormLabel>
                              <FormDescription>
                                I consent to share my medical information with healthcare providers involved in my care.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Submit Questionnaire
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MedicalRecords;
