"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  boxShadow: "none",
  border: "1px solid #ccc",
  borderRadius: "0px",
  width: "100%",
  fontWeight: 700,
  fontSize: "16px",
}));

const MainPay = () => {
  const [value, setValue] = React.useState("tm");
  const [helperText, setHelperText] = React.useState("");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);

    setHelperText(" ");

    if (value === "ck") {
      setHelperText("Trả tiền mặt khi giao hàng");
    } else if (value === "tm") {
      setHelperText(
        "Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi." +
          "Đơn hàng sẽ đươc giao sau khi tiền đã chuyển."
      );
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid xs={5}>
        <form>
          <Stack m={2} spacing={3}>
            <TextField
              label="Họ và Tên"
              color="secondary"
              size="small"
              focused
            />
            <TextField label="Địa chỉ" color="secondary" size="small" focused />
            <TextField label="Email" color="secondary" size="small" focused />
            <TextField
              label="Số điện thoại"
              color="secondary"
              size="small"
              focused
            />
          </Stack>
        </form>
      </Grid>

      <Grid xs={6}>
        <Box>
          <Typography sx={{ fontSize: "20px", marginBottom: "20px" }}>
            Đơn hàng của bạn{" "}
          </Typography>
        </Box>
        <Box>
          <Stack direction="row">
            <Item sx={{ borderRight: "0px" }}>Sản Phẩm </Item>
            <Item>Tạm Tính</Item>
          </Stack>
          <Stack direction="row">
            <Item sx={{ borderRight: "0px", fontWeight: 500 }}>Cún x1 </Item>
            <Item sx={{ fontWeight: 500 }}>25.000.000đ</Item>
          </Stack>
          <Stack direction="row">
            <Item sx={{ borderRight: "0px" }}>Giao hàng </Item>
            <Item>Free</Item>
          </Stack>
          <Stack direction="row">
            <Item sx={{ borderRight: "0px" }}>Tổng </Item>
            <Item>25.000.000đ</Item>
          </Stack>
        </Box>
        <Box>
          <FormControl sx={{ m: 3 }} variant="standard">
            <RadioGroup
              defaultValue="tm"
              onChange={handleRadioChange}
              value={value}
            >
              <FormControlLabel
                value="tm"
                control={<Radio />}
                label="Trả tiền mặt khi nhận hàng"
              />
              <FormControlLabel
                value="ck"
                control={<Radio />}
                label="Chuyển khoản ngân hàng."
              />
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            color="secondary"
            sx={{ padding: "10px 20px" }}
            variant="outlined"
          >
            Đặt hàng
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainPay;
