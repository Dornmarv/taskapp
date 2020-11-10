import React from "react";
import { Link } from "react-router-dom";
import Alert from "../layout/Alert";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HbXY0In97M0GymUamkBnKCyOWVuT7ylEmsbLEXm4yEgVUor6mqP0mHvj5deW5kxbFqafowxPB9PtLYW1BN1xN1h00dcB0Koz8"
);

const Order = () => {
  const onCheckout = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    const response = await fetch("/create-checkout-session", {
      method: "POST"
    });
    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log(result.error.message);
    }
  };
  return (
    <section className="section section-auth">
      <div className="container">
        <div className="row mini">
          <div className="col m3"></div>
          <div className="col s12 m6">
            <Link to="/">
              <h4 style={{ textAlign: "center", color: "#162337" }}>
                Task App
              </h4>
            </Link>
          </div>
          <div className="col m3"></div>
        </div>

        <div className="row">
          <div className="col m3"></div>
          <div className="col s12 m6" style={{ textAlign: "center" }}>
            <h5
              className="title"
              style={{
                color: "#162337",
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              Pay
            </h5>
          </div>
          <div className="col m3"></div>
        </div>

        <div className="row main">
          <div className="col m3"></div>
          <div className="col s12 m6" style={{ textAlign: "center" }}>
            <div className="card">
              <div className="card-content">
                <p className="text" style={{ color: "#07365F" }}>
                  Lord of the Flies $20.00
                </p>
                <br />
                <div className="row">
                  <button
                    className="btn checkout-button"
                    style={{ backgroundColor: "#eb9011" }}
                    onClick={onCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col m3"></div>
        </div>
      </div>
    </section>
  );
};

export default Order;
