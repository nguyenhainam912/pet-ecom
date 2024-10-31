import MainBreadCrumbs from "@/components/main/main.breadcrumbs";
import MainListProduct from "@/components/main/main.listproduct";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/auth.options";
import { sendRequest } from "@/utils/api";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IModelPaginate<IProduct>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product`,
    method: "GET",
    queryParams: { pageSize: 4, tag: "NEW" },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-product"] },
    },
  });

  const res1 = await sendRequest<IBackendRes<IModelPaginate<IProduct>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product`,
    method: "GET",
    queryParams: { pageSize: 4, tag: "OUTSTANDING" },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-product"] },
    },
  });

  const newProductlists = res?.data?.result ?? [];
  const outstandingProductlists = res1?.data?.result ?? [];

  return (
    <Grid sx={{ margin: "50px 0" }}>
      <MainListProduct
        newProductlists={newProductlists}
        outstandingProductlists={outstandingProductlists}
      ></MainListProduct>
    </Grid>
  );
}
