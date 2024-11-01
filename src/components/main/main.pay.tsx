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
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { formatPrice, handleCaculateTotalPrice } from "@/utils/functionShare";
import { handleAddOrderAction } from "@/utils/actions";
import { useDispatch } from "react-redux";
import { doPlaceOrderAction } from "@/redux/order/orderSlice";
import { useRouter } from "next/navigation";

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
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = React.useState("TM");
  const [helperText, setHelperText] = React.useState("");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>(session?.user?.email ?? "");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorPhone, setIsErrorPhone] = useState<boolean>(false);
  const [isErrorAddress, setIsErrorAddress] = useState<boolean>(false);

  const [errorName, setErrorName] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPhone, setErrorPhone] = useState<string>("");
  const [errorAddress, setErrorAddress] = useState<string>("");

  const cart = useSelector((state: any) => state.order.carts);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const totalPrice = handleCaculateTotalPrice();

  const handleSubmit = async () => {
    setIsErrorName(false);
    setIsErrorEmail(false);
    setIsErrorPhone(false);
    setIsErrorAddress(false);

    setErrorName("");
    setErrorEmail("");
    setErrorPhone("");
    setErrorAddress("");

    if (!name) {
      setIsErrorName(true);
      setErrorName("Name is not empty.");
      return;
    }
    if (!email) {
      setIsErrorEmail(true);
      setErrorEmail("Email is not empty.");
      return;
    }

    if (!address) {
      setIsErrorAddress(true);
      setErrorAddress("Address is not empty.");
      return;
    }

    if (!phone) {
      setIsErrorPhone(true);
      setErrorPhone("Phone is not empty.");
      return;
    }

    const detail: IDetailOrder[] = cart.map((item: ICart) => {
      return { quantity: item.quantity, productId: item._id };
    });

    const data: IOrder = {
      userId: session?.user._id || "",
      address: address,
      phone: phone,
      pay: value,
      totalPrice: totalPrice,
      detail: detail,
    };

    const res = await handleAddOrderAction(data);
    if (res && res.statusCode == 201) {
      dispatch(doPlaceOrderAction(cart));
      router.push("/");
    }
  };

  useEffect(() => {
    if (value === "TM") {
      setHelperText("Trả tiền mặt khi giao hàng");
    } else if (value === "CK") {
      setHelperText(
        "Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi." +
          "Đơn hàng sẽ đươc giao sau khi tiền đã chuyển."
      );
    }
  }, [value]);

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
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={isErrorName}
              helperText={errorName}
            />
            <TextField
              label="Email"
              color="secondary"
              size="small"
              focused
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={isErrorEmail}
              helperText={errorEmail}
            />
            <TextField
              label="Địa chỉ"
              color="secondary"
              size="small"
              focused
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              error={isErrorAddress}
              helperText={errorAddress}
            />
            <TextField
              label="Số điện thoại"
              color="secondary"
              size="small"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              focused
              error={isErrorPhone}
              helperText={errorPhone}
            />
          </Stack>
        </form>
      </Grid>

      <Grid xs={7}>
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
          {cart.map((item: ICart) => {
            return (
              <Stack direction="row" key={item._id}>
                <Item sx={{ borderRight: "0px", fontWeight: 500 }}>
                  {item.detail.name} x{item.quantity}{" "}
                </Item>
                <Item sx={{ fontWeight: 500 }}>
                  {formatPrice(item.detail.price * item.quantity)}đ
                </Item>
              </Stack>
            );
          })}

          <Stack direction="row">
            <Item sx={{ borderRight: "0px" }}>Giao hàng </Item>
            <Item>Free</Item>
          </Stack>
          <Stack direction="row">
            <Item sx={{ borderRight: "0px" }}>Tổng </Item>
            <Item>{formatPrice(handleCaculateTotalPrice())}đ</Item>
          </Stack>
        </Box>
        <Box>
          <FormControl sx={{ m: 3 }} variant="standard">
            <RadioGroup
              defaultValue="TM"
              onChange={handleRadioChange}
              value={value}
            >
              <FormControlLabel
                value="TM"
                control={<Radio />}
                label="Trả tiền mặt khi nhận hàng"
              />
              <FormControlLabel
                value="CK"
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
            onClick={handleSubmit}
          >
            Đặt hàng
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainPay;
