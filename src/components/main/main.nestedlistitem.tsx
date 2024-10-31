"use client";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";

interface IProps {
  data: any;
}

const NestedListItem = (props: IProps) => {
  const { data } = props;
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLink = (id: string, title: string, category: string) => {
    router.push(`/productCatalog/${title.trim()}-${id}?category=${category}`);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} key={data.categoryId}>
        <ListItemText
          primary={data?.title}
          onClick={(e) => handleLink(data.categoryId, data?.title, "category")}
          key={data.categoryId}
        />
        <ListItemText
          primary={`(${data?.count})`}
          sx={{
            color: "#de8ebe",
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        key={data?.categoryId + 1}
      >
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "self-start",
            }}
          >
            {data.subCategory.map((item: any) => {
              return (
                <ListItemButton
                  key={item?.subCategoryId}
                  sx={{
                    pl: 4,
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    onClick={(e) =>
                      handleLink(item.subCategoryId, item.title, "subCategory")
                    }
                    key={item.subCategoryId}
                  />
                  <ListItemText
                    primary={`(${item?.count})`}
                    sx={{
                      color: "#de8ebe",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default NestedListItem;
