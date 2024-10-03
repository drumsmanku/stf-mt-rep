import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import ProBadge from "./ProBadge.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function BuyPro() {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyPro = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        "https://striform-backend-1.onrender.com/api/payments/create-checkout-session",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center">
          Buy{" "}
          <img src="/striform-logo.png" alt="striform" className="h-6 mx-2" />
          <span className="font-extrabold text-3xl italic">striform</span>{" "}
          <ProBadge text="PRO" cls="ml-2 text-sm" />
        </h1>
        <p className="text-gray-600 mt-2">Enjoy the following benefits...</p>
      </div>

      <ul className="space-y-2 text-sm text-gray-700 mb-6">
        <li>✓ Remove Powered By striform branding</li>
        <li>✓ Add your own brand logo</li>
        <li>✓ Fully customize "Thank you" pages</li>
        <li>✓ Remove 10MB file upload limit</li>
        <li>✓ Configure email for notification of submissions</li>
        <li>✓ View & download partial submissions</li>
        <li>✓ Add your own domain for form pages</li>
        <li>✓ Integrate with 6000+ apps with Zapier or Make</li>
        <li>✓ Send submission refill links to your users</li>
        <li>✓ Collect payments using Stripe</li>
        <li>✓ Invite & collaborate with team members (coming soon)</li>
      </ul>

      <button
        onClick={handleBuyPro}
        disabled={isLoading}
        className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition mb-4 text-sm"
      >
        {isLoading ? 'Processing...' : 'Buy PRO for $24/month →'}
      </button>

      <p className="text-center text-xs text-gray-600 mb-2">
        🎉 Get 2 months FREE by paying{" "}
        <a href="#" className="text-blue-600 hover:underline">
          $240 for a year
        </a>
      </p>

      <p className="text-center text-xs">
        100% money-back guarantee in first 7 days
      </p>
    </div>
  );
}

export default BuyPro;
