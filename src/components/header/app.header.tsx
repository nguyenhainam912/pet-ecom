"use client";
import {
  alpha,
  AppBar,
  Box,
  Container,
  Drawer,
  Grid,
  InputBase,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ActiveLink from "./active.link";
import MainSlider from "./main.slider";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import MainButton from "../main/main.button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MainDrawerList from "../main/main.drawerlist";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import logo from "../../../public/image/logo.webp";
import Image from "next/image";
import Link from "next/link";
import { handleGetCartAction } from "@/utils/actions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginBottom: "20px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  border: "1px solid #ccc",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  top: 0,
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      // width: '20ch',
      width: "400px",
    },
  },
}));

export default function AppHeader() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  let dataCart: any;

  const handleGetCart = async () => {
    return await handleGetCartAction();
  };

  useEffect(() => {
    dataCart = handleGetCart();
    console.log(dataCart);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        background: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #de8ebe",
      }}
    >
      <Container>
        <Grid container>
          <Grid sx={{ padding: "30px 100px 0 0" }}>
            <Link href={"/"}>
              <Image
                priority={true}
                alt="image"
                src={logo}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            </Link>
          </Grid>
          <Grid sx={{ paddingTop: "30px" }}>
            <Grid>
              <Stack
                spacing={2}
                direction="row"
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: "20px",
                  alignItems: "center",
                  cursor: "pointer",

                  "> a": {
                    color: " #555",
                    textDecoration: "unset",
                    padding: "10px",

                    "&.active": {
                      color: "#fff",
                      background: "#de8ebe",
                      borderRadius: "5px",
                    },
                  },
                }}
              >
                <ActiveLink href={"/"}>Trang Chủ</ActiveLink>
                <ActiveLink
                  href={
                    "/productCatalog/Danh%20Mục%20Cún-6719078976226a9adde6370a?category=category"
                  }
                >
                  Thú Cưng
                </ActiveLink>
                <ActiveLink href={"/detailProduct/cat"}>Detail</ActiveLink>
                <ActiveLink href={"/cart"}>Cart</ActiveLink>
                <ActiveLink href={"/pay"}>Pay</ActiveLink>
                <MainButton onClick={toggleDrawer(true)}>
                  <Box>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Grid>
                        <ShoppingCartIcon />{" "}
                      </Grid>
                      <Grid>
                        <Typography>Giỏ hàng</Typography>
                        <Box>
                          <Typography sx={{ fontSize: "12px" }}>
                            {dataCart?.data?.length()} Sản phẩm -{" "}
                            {dataCart?.data?.totalPrice} đ
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </MainButton>
                {/* <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer> */}
                <MainDrawerList
                  toggleDrawer={toggleDrawer}
                  open={open}
                ></MainDrawerList>
              </Stack>
            </Grid>
            <Grid>
              <MainSlider></MainSlider>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Search>
                <StyledInputBase
                  placeholder="Tìm kiếm....."
                  inputProps={{ "aria-label": "search" }}
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      if (e?.target?.value)
                        router.push(`/search?q=${e?.target?.value}`);
                    }
                  }}
                />
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Search>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
