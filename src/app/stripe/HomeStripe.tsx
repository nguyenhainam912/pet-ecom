"use client";

import {
  convertToSubcurrency,
  handleCaculateStripe,
  handleCaculateTotalPrice,
} from "@/utils/functionShare";
import CheckoutPage from "./CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface Iprops {
  handleCheck: () => any;
  handleAddOrder: () => any;
}

const HomeStripe = (props: Iprops) => {
  const { handleCheck, handleAddOrder } = props;
  return (
    <main>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: handleCaculateStripe(),
          currency: "vnd",
        }}
      >
        <CheckoutPage
          handleCheck={handleCheck}
          handleAddOrder={handleAddOrder}
        />
      </Elements>
    </main>
  );
};

export default HomeStripe;
