
import { Layout } from "@/components/layout/Layout";

const PatientManagement = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Patient Management</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-center text-gray-600">
              Patient management features are coming soon. This section will allow doctors to manage their patients' 
              information, medical records, and treatment plans.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientManagement;
