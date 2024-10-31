"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import { usePathname } from "next/navigation";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

const MainBreadCrumbs = () => {
  // const pathName = usePathname();
  // const [list, setList] = React.useState<string[]>([]);

  // let a = pathName.split("/");
  // console.log(a);
  // const handleChangeLink = (pathName: string) => {
  //   console.log(pathName);
  //   switch (pathName) {
  //     case "/":
  //       setList(["Trang Chủ"]);
  //       console.log(list);
  //       break;
  //     case "/productCatalog":
  //       // code block
  //       break;
  //     default:
  //     // code block
  //   }
  // };

  // React.useEffect(() => {
  //   handleChangeLink(pathName);
  // }, []);

  return (
    <div
      role="presentation"
      onClick={handleClick}
      style={{ marginTop: "40px" }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          backgroundColor: "#ededed",
          borderRadius: "10px",
          padding: "10px 20px",
        }}
      >
        {/* {a.map((item, index) => {
          return (
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              key={index}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {item}
            </Link>
          );
        })} */}

        {/* <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Chó Akita
        </Typography> */}
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang Chủ
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default MainBreadCrumbs;
