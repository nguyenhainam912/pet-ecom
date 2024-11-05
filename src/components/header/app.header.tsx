"use client";
import {
  alpha,
  AppBar,
  Box,
  Container,
  Drawer,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tooltip,
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
import { useSession, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { formatPrice, handleCaculateTotalPrice } from "@/utils/functionShare";
import { fetchDefaultImages } from "@/utils/api";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

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
  const { data: session } = useSession();
  const cart = useSelector((state: any) => state.order.carts);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      // anchorOrigin={{
      //     vertical: 'top',
      //     horizontal: 'right',
      // }}
      id={"primary-search-account-menu"}
      keepMounted
      // transformOrigin={{
      //     vertical: 'top',
      //     horizontal: 'right',
      // }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      sx={{
        "& .MuiMenuItem-root": {
          padding: "4px 10px",
          "> a": {
            padding: "0 10px",
          },
        },
      }}
    >
      {session?.user?.role == "ADMIN" && (
        <MenuItem>
          <DashboardOutlinedIcon></DashboardOutlinedIcon>
          <Link
            onClick={() => {
              handleMenuClose();
            }}
            href={`/dashboard`}
            style={{
              color: "unset",
              textDecoration: "unset",
            }}
          >
            Trang quản trị
          </Link>
        </MenuItem>
      )}
      <MenuItem>
        <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
        <Link
          onClick={() => {
            handleMenuClose();
          }}
          href={`/cart`}
          style={{
            color: "unset",
            textDecoration: "unset",
          }}
        >
          Xem rỏ hàng
        </Link>
      </MenuItem>
      <MenuItem>
        <FormatListBulletedOutlinedIcon></FormatListBulletedOutlinedIcon>
        <Link
          onClick={() => {
            handleMenuClose();
          }}
          href={`/order`}
          style={{
            color: "unset",
            textDecoration: "unset",
          }}
        >
          Xem đơn hàng
        </Link>
      </MenuItem>
      <Divider></Divider>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          signOut();
        }}
      >
        <LogoutOutlinedIcon></LogoutOutlinedIcon>
        <Typography sx={{ padding: "0 4px " }}>Đăng xuất</Typography>
      </MenuItem>
    </Menu>
  );

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
                <div style={{ margin: "0 120px" }}></div>
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
                            {cart?.length} Sản phẩm -{" "}
                            {formatPrice(handleCaculateTotalPrice())}₫
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </MainButton>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    gap: "20px",
                    alignItems: "center",
                    cursor: "pointer",

                    "> a": {
                      color: "#de8ebe",
                      textDecoration: "unset",
                      padding: "5px",
                    },
                  }}
                >
                  {session ? ( //fragment react
                    <>
                      <Tooltip title={session.user.email}>
                        <Image
                          onClick={handleProfileMenuOpen}
                          src={fetchDefaultImages()}
                          alt="avatar"
                          height={35}
                          width={35}
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Link href={"/auth/signin"}>Login</Link>
                    </>
                  )}
                </Box>
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
                        router.push(
                          `/productCatalog/${e?.target?.value}?name=${e?.target?.value}`
                        );
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
        {renderMenu}
      </Container>
    </AppBar>
  );
}
