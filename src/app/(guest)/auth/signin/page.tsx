import { authOptions } from "@/app/api/auth/auth.options";
import AuthSignIn from "@/components/auth/auth.signin";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    // redirect to homepage
    redirect("/");
  }
  return <AuthSignIn />;
};

export default SignInPage;
