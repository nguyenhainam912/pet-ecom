import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import MainBreadCrumbs from "@/components/main/main.breadcrumbs";
import { Container } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <AppHeader />
      <MainBreadCrumbs></MainBreadCrumbs>
      {children}
      <div style={{ marginBottom: "100px" }}></div>
      <AppFooter />
    </Container>
  );
}
