"use client";

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

function createData(
  image: string,
  name: string,
  price: string,
  quantity: number,
  total: string
) {
  return { image, name, price, quantity, total };
}

const rows = [
  createData(
    "https://matpetfamily.com/wp-content/uploads/2024/10/image-2024-10-16T083639.534-300x300.png",
    "Cun",
    "12.000.000",
    2,
    "12.000.000"
  ),
  createData(
    "https://matpetfamily.com/wp-content/uploads/2024/10/image-2024-10-16T083639.534-300x300.png",
    "Cun",
    "12.000.000",
    2,
    "12.000.000"
  ),
];
const MainTableCart = () => {
  const [value, setValue] = React.useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10) {
      setValue(10);
    }
  };
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
            {rows.map((row, index) => (
              <TableRow key={row.name + index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="center">
                  <Image src={row.image} alt="" width={50} height={50} />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                  <Typography sx={{ color: "#de8ebe", fontSize: "18px" }}>
                    {row.price}đ
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Input
                    key={index}
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
                </TableCell>
                <TableCell align="right">{row.total}đ</TableCell>
              </TableRow>
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
        >
          Tiến hành thanh toán
        </Button>
      </Box>
    </>
  );
};

export default MainTableCart;
