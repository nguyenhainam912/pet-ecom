import OrderList from "@/components/main/main.orderlist";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default async function Order() {
  return (
    <Grid sx={{ margin: "50px 0" }}>
      <Grid>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Đơn hàng đã đặt
        </Typography>
      </Grid>
      <Grid>
        <OrderList></OrderList>
      </Grid>
    </Grid>
  );
}
