import { authOptions } from "@/app/api/auth/auth.options";
import ProductTable from "@/components/admin/product/product.table";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const ManageProductPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 5;
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-product"] },
    },
  });
  return (
    <div>
      <ProductTable products={res?.data?.result ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageProductPage;
