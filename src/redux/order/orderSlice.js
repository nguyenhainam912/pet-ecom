import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  carts: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doAddCartAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;

      let isExistIndex = carts.findIndex((c) => c._id === item._id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity =
          carts[isExistIndex].quantity + item.quantity;
        if (+carts[isExistIndex].quantity > +item.detail.quantity) {
          carts[isExistIndex].quantity = item.quantity;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          detail: item.detail,
        });
      }
      message.success("Add cart success");
      state.carts = carts;
    },
    doUpdateCartAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;

      console.log(carts, item)

      let isExistIndex = carts.findIndex((c) => c._id === item._id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity = item.quantity;
        if (+carts[isExistIndex].quantity > +item.detail.quantity) {
          carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          detail: item.detail,
        });
      }
      state.carts = carts;
    },
    doDeleteCartItemAction: (state, action) => {
      state.carts = state.carts.filter((c) => c._id !== action.payload.id);
    },
    doPlaceOrderAction: (state, action) => {
      state.carts = [];
      message.success("Đặt hàng thành công");
    },
  },
});

export const {
  doAddCartAction,
  doUpdateCartAction,
  doDeleteCartItemAction,
  doPlaceOrderAction,
} = orderSlice.actions;

export default orderSlice.reducer;
