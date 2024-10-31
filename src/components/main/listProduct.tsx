"use client";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MainCard from "./main.card";

interface IProps {
  data: IProduct[];
}

const ListProduct = (props: IProps) => {
  const { data } = props;
  return (
    <Grid xs={12} container gap={2}>
      {data?.map((item) => {
        return (
          <Grid xs={3.8} key={item._id}>
            <MainCard product={item}></MainCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ListProduct;
