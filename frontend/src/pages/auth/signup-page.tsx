import AuthCard from "@/components/auth/auth-card";
import SignUpForm from "@/components/auth/signup-form";

const SignUpPage = () => {
  return (
    <AuthCard
      title="Create account"
      description="Create an account to begin tracking products"
      redirectLink="/auth/login"
      redirectText="Already have an accont? Login"
    >
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUpPage;
