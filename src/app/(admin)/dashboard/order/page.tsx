import {
  Button,
  Form,
  Popover,
  Row,
  Space,
  Table,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";

import { WarningTwoTone } from "@ant-design/icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth.options";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const ManageOrderPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 5;
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/order`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-order"] },
    },
  });

  return (
    <div>
      {/* <OrderTable orders={res?.data?.result ?? []} meta={res?.data?.meta} /> */}
    </div>
  );
};

export default ManageOrderPage;
