import { LoginForm } from "./LoginForm";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome To RuangTumbuh"
      description="Before start, Fill in your details to login to Dashboard RuangTumbuh."
      linkText="Don't have an account yet?"
      linkActionText="Sign Up"
      linkTo="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
