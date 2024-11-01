"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MainCard from "./main.card";
import MainButton from "./main.button";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  color: "#de8ebe",
  fontSize: "30px",
  fontWeight: "bold",
  margin: theme.spacing(2),
}));

interface IProps {
  newProductlists: IProduct[];
  outstandingProductlists: IProduct[];
}

const MainListProduct = (props: IProps) => {
  const { newProductlists, outstandingProductlists } = props;
  const router = useRouter();

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Div>Sản phầm mới</Div>
        </Grid>
        <Grid xs={12} container gap={6}>
          {newProductlists?.map((item) => {
            return (
              <Grid xs={3} key={item._id}>
                <MainCard product={item}></MainCard>
              </Grid>
            );
          })}
        </Grid>

        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            "> a": {
              cursor: "pointer",
            },
          }}
        >
          <MainButton
            onClick={() =>
              router.push(
                "/productCatalog/Danh%20Mục%20Cún-6719078976226a9adde6370a?category=category"
              )
            }
          >
            <span
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              Xem Thêm
              <ChevronRightOutlinedIcon
                sx={{ margin: "-7px", padding: "0 0 0 6px" }}
              />
            </span>
          </MainButton>
        </Grid>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Div>Sản phầm nổi bật</Div>
        </Grid>
        <Grid xs={12} container gap={6}>
          {outstandingProductlists?.map((item) => {
            return (
              <Grid xs={3} key={item._id}>
                <MainCard product={item}></MainCard>
              </Grid>
            );
          })}
        </Grid>

        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <MainButton>
            <span
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              Xem Thêm
              <ChevronRightOutlinedIcon
                sx={{ margin: "-7px", padding: "0 0 0 6px" }}
              />
            </span>
          </MainButton>
        </Grid>
      </Grid>
    </>
  );
};

export default MainListProduct;
