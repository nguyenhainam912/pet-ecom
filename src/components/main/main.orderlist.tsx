"use client";
import { handleGetOrderById } from "@/utils/actions";
import { useSession } from "next-auth/react";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { formatPrice } from "@/utils/functionShare";
import dateFormat, { masks } from "dateformat";
import { Flex } from "antd";

const OrderList = () => {
  const [listOrder, setListOrder] =
    React.useState<IBackendRes<IModelPaginate<IOrderDB>>>();
  const { data: session } = useSession();

  const fetchData = async () => {
    const res: IBackendRes<IModelPaginate<IOrderDB>> = await handleGetOrderById(
      session?.user?._id || ""
    );
    console.log(res);
    setListOrder(res);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid>
      {listOrder &&
        listOrder.data?.result.map((order) => {
          return (
            <Box
              key={order._id}
              sx={{ backgroundColor: "#efefef61", margin: "20px 0" }}
            >
              <div style={{ padding: "10px " }}>
                Ngày đặt hàng: {dateFormat(order.createdAt, "mm/dd/yyyy")}
              </div>
              {order?.detail.map((orderDe) => {
                return (
                  <ListItem key={orderDe.productId._id}>
                    <ListItemAvatar>
                      <Image
                        alt="image"
                        src={orderDe.productId.image}
                        width={80}
                        height={80}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </ListItemAvatar>
                    <Box sx={{ marginLeft: "40px" }}>
                      <ListItemText primary={orderDe.productId.name} />
                      <ListItemText
                        primary={`${orderDe.quantity} x ${formatPrice(
                          orderDe.productId.price || 0
                        )}₫`}
                        sx={{ color: "#de8ebe" }}
                      />
                    </Box>
                  </ListItem>
                );
              })}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "20px ",
                }}
              >
                Thành tiền: {formatPrice(order.totalPrice)}₫
              </div>
            </Box>
          );
        })}
    </Grid>
  );
};

export default OrderList;
