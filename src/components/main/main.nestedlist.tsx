"use client";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";

import NestedListItem from "@/components/main/main.nestedlistitem";
import { sendRequest } from "@/utils/api";
import { handleGetCatalog } from "@/utils/actions";

const NestedList = () => {
  const [catalog, setCatalog] = React.useState<IBackendRes<any>>();

  const fetchData = async () => {
    const res: IBackendRes<any> = await handleGetCatalog();
    setCatalog(res);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <>
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ fontSize: "16px", fontWeight: "600" }}
          >
            Danh Mục Sản Phẩm
          </ListSubheader>
          <Divider></Divider>
        </>
      }
    >
      {catalog?.data?.map((item: any) => {
        return (
          <NestedListItem data={item} key={item.categoryId}></NestedListItem>
        );
      })}
    </List>
  );
};

export default NestedList;
