import NestedList from "@/components/main/main.nestedlist";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
      <Grid xs={3}>
        <NestedList></NestedList>
      </Grid>
      <Grid xs={9} container>
        {children}
      </Grid>
    </Grid>
  );
}
