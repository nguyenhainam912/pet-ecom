import ListProduct from "@/components/main/listProduct";
import MainPagination from "@/components/main/main.pagination";
import MainSelect from "@/components/main/main.select";
import { sendRequest } from "@/utils/api";
import { Divider } from "@mui/material";

export default async function Category(props: any) {
  const { params, searchParams } = props;
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 6;
  const sort = props?.searchParams?.sort;
  const name = props?.searchParams?.name;

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
        current,
        pageSize,
        sort,
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
        current,
        pageSize,
        sort,
      },
      nextOption: {
        // cache: "no-store"
        next: { tags: ["product-by-category"] },
      },
    });

    title = res?.data?.result[0]?.subCategoryId?.title;
  } else {
    res = await sendRequest<IBackendRes<IProduct>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product/search`,
      method: "GET",
      queryParams: {
        name: name,
        current,
        pageSize,
        sort,
      },
      nextOption: {
        // cache: "no-store"
        next: { tags: ["product-by-category"] },
      },
    });
    title = "SEARCH";
  }

  return (
    <div style={{ width: "100%" }}>
      <h1>{title}</h1>
      <MainSelect></MainSelect>
      <ListProduct data={res?.data?.result}></ListProduct>
      <Divider sx={{ margin: "30px 0 " }}></Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MainPagination count={res?.data?.meta?.pages}></MainPagination>
      </div>
    </div>
  );
}
