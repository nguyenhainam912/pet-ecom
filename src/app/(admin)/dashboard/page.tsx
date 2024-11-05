import { authOptions } from "@/app/api/auth/auth.options";
import AdminCard from "@/components/admin/admin.card";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    // redirect to homepage
    redirect("/");
  }

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/dashboard`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tags: ["dashboard"] },
    },
  });

  return (
    <div>
      <AdminCard data={res?.data} />
    </div>
  );
};

export default DashboardPage;
