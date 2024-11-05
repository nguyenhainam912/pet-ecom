"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import MainButton from "./main.button";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { doAddCartAction } from "@/redux/order/orderSlice";
import { formatPrice } from "@/utils/functionShare";

interface IProps {
  product: IProduct;
}
const MainCard = (props: IProps) => {
  const { product } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const [showButton, setShowButton] = useState(false);
  const handleShowDetail = (id: string) => {
    router.push(`/detailProduct/${id}`);
  };

  const handleAddCart = () => {
    // let data = {
    //   userId: session.user._id,
    //   detail: [{ product: product._id, quantity: 1 }],
    //   totalPrice: product.price,
    // };
    dispatch(
      doAddCartAction({ quantity: 1, detail: product, _id: product._id })
    );
  };
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <Box
          onMouseOver={() => {
            setShowButton(true);
          }}
          onMouseOut={() => {
            setShowButton(false);
          }}
        >
          <CardMedia
            component="img"
            height={250}
            image={product.image}
            alt="pet"
            onClick={() => handleShowDetail(product._id)}
            sx={{
              position: "relative",
              "&:hover": {
                opacity: 0.4,
                transform: "scale(1.1)",
              },
            }}
          />
          {showButton && (
            <Box sx={{ position: "absolute", top: "32%", left: "32%" }}>
              <MainButton onClick={handleAddCart}>
                <span style={{ textAlign: "center" }}>
                  MUA HÀNG{" "}
                  <ChevronRightOutlinedIcon
                    sx={{ margin: "-7px", padding: "0 0 0 6px" }}
                  />
                </span>
              </MainButton>
            </Box>
          )}
        </Box>
        <CardContent>
          <Typography sx={{ color: "#de8ebe" }}>ID: {product.code}</Typography>
          <span>{showButton}</span>
          <Typography
            sx={{
              color: "text.secondary",
              overflowX: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 900,
              fontSize: "20px",
              padding: "10px 0",
              "&:hover": {
                color: "#de8ebe",
              },
            }}
          >
            {product.name}
          </Typography>
          <Typography
            sx={{ color: "#de8ebe", fontSize: "20px", fontWeight: 600 }}
          >
            {formatPrice(product.price)}₫
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MainCard;
