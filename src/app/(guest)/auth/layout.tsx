import { Avatar, Box, Grid, Link, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import ActiveLink from "@/components/header/active.link";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(to bottom, #ff9aef, #fedac1, #d5e1cf, #b7e6d9)",
          backgroundColor: "#b7e6d9",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={4}
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Link href="/">
                <ArrowBackIcon />
              </Link>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Avatar>
                  <LockIcon />
                </Avatar>

                <Stack
                  direction="row"
                  spacing={10}
                  sx={{
                    "> a": {
                      textDecoration: "none",
                      color: "#fff",
                      border: "1px solid #fff",
                      padding: "6px 14px",
                      borderRadius: "30px",

                      "&.active": {
                        color: "#FF4FB9FF",
                        border: "1px solid #FF4FB9FF",
                      },
                    },
                  }}
                >
                  <ActiveLink href={"/auth/signin"}>Đăng nhập</ActiveLink>
                  <ActiveLink href={"/auth/register"}>Đăng ký</ActiveLink>
                </Stack>
              </Box>
              {children}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
