import {  useSelector } from "react-redux";

export const handleCaculateTotalPrice = () => {
    const cart: ICart[] = useSelector((state: any) => state.order.carts);
    let totalPrice: number = 0;

    cart.map((item) => {
    totalPrice += item.detail.price * item.quantity;
    });
    return totalPrice;
};

export const formatPrice = (price: number) => {
    const formattedNumber = price.toLocaleString('vi-VN');
    return formattedNumber
}
