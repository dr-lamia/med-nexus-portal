
import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/components/authentication/LoginForm";

const Login = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
