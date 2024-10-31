"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/image";

const MainDrawerList = (props: any) => {
  const { toggleDrawer, open } = props;
  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiPaper-root": {
          display: "flex",
          justifyContent: "space-between",
        },
      }}
    >
      <Box
        sx={{ width: 400 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <ListItem
          key={"value"}
          secondaryAction={<DeleteOutlineIcon></DeleteOutlineIcon>}
        >
          <ListItemAvatar>
            <Image
              alt="image"
              src={
                "https://matpetfamily.com/wp-content/uploads/2024/10/image-2024-10-16T083639.534-300x300.png"
              }
              width={80}
              height={80}
              style={{
                objectFit: "contain",
              }}
            />
          </ListItemAvatar>
          <Box sx={{ marginLeft: "20px" }}>
            <ListItemText primary={`Bichon Đực Đẹp Zai `} />
            <ListItemText
              primary={`2 x 12.000.000đ`}
              sx={{ color: "#de8ebe" }}
            />
          </Box>
        </ListItem>
        <ListItem
          key={"value"}
          secondaryAction={<DeleteOutlineIcon></DeleteOutlineIcon>}
        >
          <ListItemAvatar>
            <Image
              alt="image"
              src={
                "https://matpetfamily.com/wp-content/uploads/2024/10/image-2024-10-16T083639.534-300x300.png"
              }
              width={80}
              height={80}
              style={{
                objectFit: "contain",
              }}
            />
          </ListItemAvatar>
          <Box sx={{ marginLeft: "20px" }}>
            <ListItemText primary={`Bichon Đực Đẹp Zai `} />
            <ListItemText
              primary={`2 x 12.000.000đ`}
              sx={{ color: "#de8ebe" }}
            />
          </Box>
        </ListItem>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyItems: "flex-end",
          position: "sticky",
          "& > *": {
            m: 1,
          },
          "& .MuiButtonGroup-root": {
            width: "100%",
          },
          "& .MuiButtonBase-root": {
            border: "none",
            "&:hover": {
              backgroundColor: "#de8ebe",
              border: "none",
            },
          },
        }}
      >
        <ButtonGroup orientation="vertical" aria-label="Vertical button group">
          <Button
            key="one"
            sx={{
              color: "#333",
              display: "flex",
              justifyContent: "space-between",

              "&:hover": {
                "& .MuiTypography-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <Typography>Tổng Cộng:</Typography>
            <Typography
              sx={{
                color: "#de8ebe",
              }}
            >
              50.000.000đ
            </Typography>
          </Button>
          <Button key="two" sx={{ color: "#fff", backgroundColor: "#666" }}>
            Xem giỏ hàng
          </Button>
          <Button key="three" sx={{ color: "#fff", backgroundColor: "#333" }}>
            Thanh toán
          </Button>
        </ButtonGroup>
      </Box>
    </Drawer>
  );
};

export default MainDrawerList;
