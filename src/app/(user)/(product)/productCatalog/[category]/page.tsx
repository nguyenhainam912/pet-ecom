import ListProduct from "@/components/main/listProduct";
import MainPagination from "@/components/main/main.pagination";
import MainSelect from "@/components/main/main.select";
import { sendRequest } from "@/utils/api";
import { Divider } from "@mui/material";

export default async function Category(props: any) {
  const { params, searchParams } = props;

  const temp = params?.category?.split("-") ?? [];
  const id = temp[temp.length - 1];
  const filter: any = searchParams?.category;
  let title: string = "";
  let res: any = [];

  if (filter == "category") {
    res = await sendRequest<IBackendRes<IProduct>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product`,
      method: "GET",
      queryParams: {
        categoryId: id,
        populate: "categoryId",
      },
      nextOption: {
        // cache: "no-store"
        next: { tags: ["product-by-category"] },
      },
    });
    title = res?.data?.result[0]?.categoryId?.title;
  } else if (filter == "subCategory") {
    res = await sendRequest<IBackendRes<IProduct>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product`,
      method: "GET",
      queryParams: {
        subCategoryId: id,
        populate: "subCategoryId",
      },
      nextOption: {
        // cache: "no-store"
        next: { tags: ["product-by-category"] },
      },
    });
    title = res?.data?.result[0]?.subCategoryId?.title;
  }

  return (
    <div style={{ width: "100%" }}>
      <h1>{title}</h1>
      <MainSelect></MainSelect>
      <ListProduct data={res?.data?.result}></ListProduct>
      <Divider sx={{ margin: "30px 0 " }}></Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MainPagination></MainPagination>
      </div>
    </div>
  );
}
