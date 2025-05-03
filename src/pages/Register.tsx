
import { Layout } from "@/components/layout/Layout";
import { RegisterForm } from "@/components/authentication/RegisterForm";

const Register = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
