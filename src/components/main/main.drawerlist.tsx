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
import { useSelector, useDispatch } from "react-redux";
import { doDeleteCartItemAction } from "@/redux/order/orderSlice";
import { formatPrice, handleCaculateTotalPrice } from "@/utils/functionShare";
import { useRouter } from "next/navigation";

const MainDrawerList = (props: any) => {
  const { toggleDrawer, open } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const cart: ICart[] = useSelector((state: any) => state.order.carts);

  const handleDeteleItem = (id: any) => {
    dispatch(doDeleteCartItemAction({ id: id }));
  };

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
      <Box sx={{ width: 400 }} role="presentation">
        {cart.map((item) => {
          return (
            <ListItem
              key={item._id}
              secondaryAction={
                <Button
                  onClick={() => handleDeteleItem(item._id)}
                  sx={{ color: "#de8ebe" }}
                >
                  <DeleteOutlineIcon></DeleteOutlineIcon>
                </Button>
              }
            >
              <ListItemAvatar>
                <Image
                  alt="image"
                  src={item.detail.image}
                  width={80}
                  height={80}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </ListItemAvatar>
              <Box sx={{ marginLeft: "20px" }}>
                <ListItemText primary={item.detail.name} />
                <ListItemText
                  primary={`${item.quantity} x ${formatPrice(
                    item.detail.price
                  )}₫`}
                  sx={{ color: "#de8ebe" }}
                />
              </Box>
            </ListItem>
          );
        })}
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
              {formatPrice(handleCaculateTotalPrice())}₫
            </Typography>
          </Button>
          <Button
            key="two"
            sx={{ color: "#fff", backgroundColor: "#666" }}
            onClick={() => {
              toggleDrawer(false);
              router.push("/cart");
            }}
          >
            Xem giỏ hàng
          </Button>
          <Button
            key="three"
            sx={{ color: "#fff", backgroundColor: "#333" }}
            onClick={() => {
              toggleDrawer(false);
              router.push("/pay");
            }}
          >
            Thanh toán
          </Button>
        </ButtonGroup>
      </Box>
    </Drawer>
  );
};

export default MainDrawerList;
