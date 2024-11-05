"use client";
import { Box, Button, Input, Slider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import React from "react";
import MainButton from "./main.button";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { doAddCartAction } from "@/redux/order/orderSlice";
import { useDispatch } from "react-redux";
import { formatPrice } from "@/utils/functionShare";

interface IProps {
  data: IProduct;
}

const MainDetailProduct = (props: IProps) => {
  const { data } = props;
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > data.quantity) {
      setValue(data.quantity);
    }
  };

  const handleAddCart = () => {
    // let data = {
    //   userId: session.user._id,
    //   detail: [{ product: product._id, quantity: 1 }],
    //   totalPrice: product.price,
    // };
    dispatch(doAddCartAction({ quantity: value, detail: data, _id: data._id }));
  };

  return (
    <Grid xs={12} container gap={4}>
      <Grid xs={5}>
        <Image
          alt=""
          width={360}
          height={500}
          src={data.image}
          priority={true}
        />
      </Grid>
      <Grid xs={6}>
        <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
          {data.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            color: "#de8ebe",
            fontWeight: "500",
            margin: "20px 0 10px",
          }}
        >
          {formatPrice(data.price)}₫
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#77a464",
            fontWeight: "200",
          }}
        >
          Cho phép đặt hàng trước
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", marginTop: "10px" }}
        >
          <Grid>
            <Typography>Số lượng: </Typography>
          </Grid>
          <Grid xs>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              marks
              max={data.quantity}
              min={0}
              sx={{ color: "#de8ebe" }}
            />
          </Grid>
          <Grid>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 10,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
              sx={{ textDecoration: "none" }}
            />
          </Grid>
          <Grid sx={{ cursor: "pointer" }}>
            <MainButton onClick={handleAddCart}>
              <span style={{ textAlign: "center" }}>
                MUA HÀNG{" "}
                <ChevronRightOutlinedIcon
                  sx={{ margin: "-7px", padding: "0 0 0 6px" }}
                />
              </span>
            </MainButton>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              startIcon={<FavoriteBorderOutlinedIcon />}
              sx={{
                color: "#de8ebe",
                margin: "20px 0",
                border: "1px solid #de8ebe",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#de8ebe",
                  border: "1px solid #fff",
                },
              }}
            >
              Add to Wishlist
            </Button>
          </Grid>
        </Grid>

        <Grid
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>Mã đơn hàng: </Typography>
          <Button
            variant="outlined"
            sx={{
              height: "22px",
              color: "#de8ebe",
              margin: "0 10px",
              border: "1px solid #de8ebe",
              cursor: "unset",
              "&:hover": {
                color: "#de8ebe",
                backgroundColor: "#fff",
                border: "1px solid #de8ebe",
              },
            }}
          >
            {data.code}
          </Button>
        </Grid>

        <Grid
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>Tình trạng: </Typography>
          <Button
            variant="outlined"
            sx={{
              height: "22px",
              color: "#de8ebe",
              margin: "0 10px",
              border: "1px solid #de8ebe",
              cursor: "unset",
              "&:hover": {
                color: "#de8ebe",
                backgroundColor: "#fff",
                border: "1px solid #de8ebe",
              },
            }}
          >
            Cho phép đặt hàng trước
          </Button>
        </Grid>

        <Grid
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>Danh mục: </Typography>
          <Button
            variant="outlined"
            sx={{
              height: "22px",
              color: "#de8ebe",
              margin: "0 10px",
              border: "1px solid #de8ebe",
              cursor: "unset",
              "&:hover": {
                color: "#de8ebe",
                backgroundColor: "#fff",
                border: "1px solid #de8ebe",
              },
            }}
          >
            {data.categoryId.title}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainDetailProduct;
