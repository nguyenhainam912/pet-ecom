"use client";

import { formatPrice } from "@/utils/functionShare";
import {
  Box,
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import MainRowCart from "./main.rowcart";
import { useRouter } from "next/navigation";

const MainTableCart = () => {
  const router = useRouter();
  const cart: ICart[] = useSelector((state: any) => state.order.carts);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell align="center">Ảnh</TableCell>
              <TableCell align="right">Sản Phẩm</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Tạm tính</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row, index) => (
              <MainRowCart
                detailCart={row}
                index={index}
                key={index}
              ></MainRowCart>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
      >
        <Button
          color="secondary"
          sx={{ padding: "10px 20px" }}
          variant="outlined"
          onClick={() => router.push("/pay")}
        >
          Tiến hành thanh toán
        </Button>
      </Box>
    </>
  );
};

export default MainTableCart;
