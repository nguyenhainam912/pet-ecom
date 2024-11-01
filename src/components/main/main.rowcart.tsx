"use client";

import { doUpdateCartAction } from "@/redux/order/orderSlice";
import { formatPrice } from "@/utils/functionShare";
import { Input, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  detailCart: ICart;
  index: number;
}

const MainRowCart = (props: IProps) => {
  const { detailCart, index } = props;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(detailCart.quantity);
  const [totalPrice, setTotalPrice] = React.useState(
    detailCart.detail.price * detailCart.quantity
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("nput", event.target.value);
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > detailCart.detail.quantity) {
      setValue(detailCart.detail.quantity);
    }
  };

  useEffect(() => {
    console.log(value);
    dispatch(
      doUpdateCartAction({
        quantity: value,
        detail: detailCart,
        _id: detailCart._id,
      })
    );
    console.log(detailCart);
    setTotalPrice(value * detailCart.detail.price);
  }, [value]);
  return (
    <TableRow key={detailCart._id}>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="center">
        <Image src={detailCart.detail.image} alt="" width={50} height={50} />
      </TableCell>
      <TableCell align="right">{detailCart.detail.name}</TableCell>
      <TableCell align="right">
        <Typography sx={{ color: "#de8ebe", fontSize: "18px" }}>
          {formatPrice(detailCart.detail.price)}đ
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Input
          value={value}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 1,
            max: detailCart.detail.quantity,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          sx={{ textDecoration: "none" }}
        />
      </TableCell>
      <TableCell align="right">{formatPrice(totalPrice)}đ</TableCell>
    </TableRow>
  );
};

export default MainRowCart;
