import MainDetailProduct from "@/components/main/main.detailproduct";
import { sendRequest } from "@/utils/api";

export default async function DetailProduct(props: any) {
  const { params } = props;

  const res = await sendRequest<IBackendRes<IProduct>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product/byId`,
    method: "GET",
    queryParams: { id: params.slug },
    nextOption: {
      next: { tags: ["list-product"] },
    },
  });

  let data: IProduct = res.data as IProduct;

  return <MainDetailProduct data={data}></MainDetailProduct>;
}
