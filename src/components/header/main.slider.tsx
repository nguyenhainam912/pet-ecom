import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import thumb1 from "../../../public/image/thumb1.png";
import thumb2 from "../../../public/image/thumb2.png";
import thumb3 from "../../../public/image/thumb3.png";
import thumb4 from "../../../public/image/thumb4.png";

import { useHasMounted } from "@/utils/customHook";

const MainSlider = () => {
  const hasMounted = useHasMounted();
  const dataImage = [thumb1, thumb2, thumb3, thumb4];

  const NextArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: "2%",
          top: "42%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
          backgroundColor: "#de8ebe",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#de8ebe",
          },
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "42%",
          left: "2%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
          backgroundColor: "#de8ebe",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#de8ebe",
          },
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!hasMounted) return <></>; //fragment
  //box === div
  return (
    <Box
      sx={{
        margin: "20px 0px",
        width: "800px",
      }}
    >
      <Slider {...settings}>
        {dataImage.map((image, index) => {
          return (
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
              key={index}
            >
              <Image
                priority={true}
                alt="image"
                src={image}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "contain",
                }}
              />
            </div>
          );
        })}
      </Slider>
    </Box>
  );
};

export default MainSlider;
