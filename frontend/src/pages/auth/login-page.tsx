import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <AuthCard
      title="Login"
      redirectLink="/auth/signup"
      redirectText="Don't have an accont? Login"
    >
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
