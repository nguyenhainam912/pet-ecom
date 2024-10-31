import MainPay from "@/components/main/main.pay";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default async function Pay() {
  return (
    <Grid sx={{ margin: "50px 0" }}>
      <Grid>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Thanh Toán
        </Typography>
      </Grid>
      <Grid>
        <MainPay></MainPay>
      </Grid>
    </Grid>
  );
}
