import {  useSelector } from "react-redux";

export const handleCaculateTotalPrice = () => {
    const cart: ICart[] = useSelector((state: any) => state.order.carts);
    let totalPrice: number = 0;

    cart.map((item) => {
    totalPrice += item.detail.price * item.quantity;
    });
    return totalPrice;
};

export const handleCaculateStripe = () => {
    const cart: ICart[] = useSelector((state: any) => state.order.carts);
    let totalPrice: number = 0;

    cart.map((item) => {
    totalPrice += item.detail.price * item.quantity;
    });

    if (totalPrice == 0) totalPrice= 1000
    return totalPrice;
};

export const formatPrice = (price: number) => {
    const formattedNumber = price.toLocaleString('vi-VN');
    return formattedNumber
}

export  const convertToSubcurrency = (amount: number, factor = 1000) => {
    return Math.round(amount / factor);
}
  