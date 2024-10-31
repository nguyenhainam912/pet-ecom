import MainTableCart from "@/components/main/main.tablecart";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default async function Cart() {
  return (
    <Grid sx={{ margin: "50px 0" }}>
      <Grid>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Giỏ Hàng
        </Typography>
      </Grid>
      <Grid>
        <MainTableCart></MainTableCart>
      </Grid>
    </Grid>
  );
}
