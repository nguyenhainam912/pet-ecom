"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import {
  convertToSubcurrency,
  formatPrice,
  handleCaculateStripe,
  handleCaculateTotalPrice,
} from "@/utils/functionShare";
import { CircularProgress } from "@mui/material";

interface IProps {
  handleCheck: () => any;
  handleAddOrder: () => any;
}
const CheckoutPage = (props: IProps) => {
  const { handleCheck, handleAddOrder } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const amount = handleCaculateStripe();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if ((await handleCheck()) == false) return;
    setLoading(true);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    await handleAddOrder();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && (
        <div style={{ color: "#FF4545FF", padding: "10px 0 0" }}>
          {errorMessage}
        </div>
      )}

      <button
        disabled={!stripe || loading}
        style={{
          margin: "20px 0 0",
          padding: "10px 20px",
          border: "1px solid #de8ebe",
          backgroundColor: "unset",
          borderRadius: "30px",
          color: "#de8ebe",
          cursor: "pointer",
        }}
      >
        {!loading ? `Thanh toán ${formatPrice(amount)}₫` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
