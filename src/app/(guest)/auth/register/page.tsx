import { authOptions } from "@/app/api/auth/auth.options";
import AuthRegister from "@/components/auth/auth.register";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    // redirect to homepage
    redirect("/");
  }
  return <AuthRegister />;
};

export default RegisterPage;
