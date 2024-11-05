"use client";

import { Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  count: number;
}

const MainPagination = (props: IProps) => {
  const { count } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [pageApi, setPageApi] = useState(1);

  useEffect(() => {
    if (pageApi) {
      const params = new URLSearchParams(searchParams);
      params.set("current", pageApi.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  }, [pageApi]);

  return (
    <Pagination
      count={count}
      variant="outlined"
      color="secondary"
      onChange={(e, value) => setPageApi(value)}
    />
  );
};

export default MainPagination;
