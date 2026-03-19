import { RegisterForm } from "./RegisterForm";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account!"
      description="Fill in the credentials to create a new RuangTumbuh account!"
      linkText="Already have an account?"
      linkActionText="Sign In"
      linkTo="/login"
      reverse={true} // Posisi dibalik (Form kiri, Gambar kanan)
    >
      <RegisterForm />
    </AuthLayout>
  );
}
