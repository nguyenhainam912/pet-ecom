import { authOptions } from "@/app/api/auth/auth.options";
import AdminCard from "@/components/admin/admin.card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    // redirect to homepage
    redirect("/");
  }
  return (
    <div>
      <AdminCard />
    </div>
  );
};

export default DashboardPage;
