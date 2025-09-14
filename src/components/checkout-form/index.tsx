"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import Image from "next/image";
import config from "@/config";
import { useForm } from "react-hook-form";
import axios from "axios";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";

type CheckoutFormInputs = {
  customerName: string;
  customerPhone: string;
  receiverName: string;
  receiverPhone: string;
  shippingAddress: string;
  note?: string;
  paymentMethod: string;
  coupon?: string;
};

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cart: cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deliveryArea, setDeliveryArea] = useState<string>("outside");
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInputs>();

  const onSubmit = async (data: CheckoutFormInputs) => {
    // Delivery charge based on area
    let shippingAmount = 0;
    if (deliveryArea === "inside") shippingAmount = 60;
    if (deliveryArea === "Subcity") shippingAmount = 100;
    if (deliveryArea === "outside") shippingAmount = 150;

    const orderData = {
      products: cartItems.map((item) => ({
        product: item.productId,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingInfo: {
        name: data.receiverName,
        address: data.shippingAddress,
        mobile: data.receiverPhone,
      },
      customerInfo: {
        name: data.customerName,
        address: data.shippingAddress,
        mobile: data.customerPhone,
      },
      totalAmount: subTotal + shippingAmount,
      shippingAmount,
      paymentMethod: data.paymentMethod,
      note: data.note,
      coupon: data.coupon || null,
    };
    setIsLoading(true);
    try {
      const order = await axios.post(
        `${config.API_URL}/api/v1/orders`,
        orderData
      );
      if (order.data?.success) {
        setIsLoading(false);
        dispatch(clearCart());
        localStorage.setItem("lastOrder", JSON.stringify(order.data.order));
        router.push(`/order-success`);
      }
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-4 md:p-6">
          <h1 className="text-2xl font-semibold mb-6 border-b pb-3">
            Checkout
          </h1>

          {/* Customer Info */}
          <h2 className="text-lg font-medium mb-4">Customer Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                {...register("customerName", { required: "Name is required" })}
                type="text"
                placeholder="Customer Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-blue-500"
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerName.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("customerPhone", {
                  required: "Phone number is required",
                })}
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-blue-500"
              />
              {errors.customerPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerPhone.message}
                </p>
              )}
            </div>
          </div>

          {/* Shipping Info */}
          <h2 className="text-lg font-medium mb-4">
            Shipping Info and Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                {...register("receiverName", { required: "Name is required" })}
                type="text"
                placeholder="Receiver Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-blue-500"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverName.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("receiverPhone", {
                  required: "Phone number is required",
                })}
                type="text"
                placeholder="Receiver Phone Number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-blue-500"
              />
              {errors.receiverPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverPhone.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <textarea
                {...register("shippingAddress", {
                  required: "Shipping address is required",
                })}
                placeholder="Shipping Address"
                className="w-full border rounded-lg px-4  py-2 focus:outline-blue-500"
                rows={3}
              />
              {errors.shippingAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shippingAddress.message}
                </p>
              )}
            </div>
          </div>

          {/* Delivery Area */}
          <div className="mb-4">
            <p className="mb-2 font-medium">Select Delivery Area *</p>
            <div className="flex flex-wrap gap-3">
              {["inside", "Subcity", "outside"].map((area) => (
                <span
                  key={area}
                  onClick={() => setDeliveryArea(area)}
                  className={`px-4 py-2 text-md rounded-full border cursor-pointer transition font-medium ${
                    deliveryArea === area
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {area === "inside"
                    ? "Inside City"
                    : area === "Subcity"
                    ? "Subcity"
                    : "Outside City"}
                </span>
              ))}
            </div>
          </div>

          {/* Order Note */}
          <textarea
            {...register("note")}
            placeholder="Additional Information"
            className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-blue-500"
            rows={3}
          />

          {/* Payment Method */}
          <h2 className="text-lg font-medium mb-4">Payment Method</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              {...register("paymentMethod", {
                required: "Payment method is required",
              })}
              type="radio"
              value="COD"
              defaultChecked
              className="w-4 h-4"
            />
            <span className="font-medium">Cash On Delivery</span>
          </label>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white shadow-md rounded-2xl p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Order Overview
          </h2>

          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center gap-4 mb-6">
              <Image
                src={`${config.API_URL}/images/products/${item.image}`}
                alt="product"
                className="w-20 h-24 object-cover rounded-lg"
                width={80}
                height={96}
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-sm font-semibold">
                  Tk. {item.price} X {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Sub-Total</span>
              <span>{subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryArea === "inside"
                  ? 60
                  : deliveryArea === "Subcity"
                  ? 100
                  : 150}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                ) +
                  (deliveryArea === "inside"
                    ? 60
                    : deliveryArea === "Subcity"
                    ? 100
                    : 150)}
              </span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input
              {...register("coupon")}
              type="text"
              placeholder="Coupon Code"
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              type="button"
              className="font-medium bg-black text-white px-4 rounded-lg hover:bg-gray-900"
            >
              Apply
            </button>
          </div>

          {/* Place Order */}
          <button
            disabled={isLoading}
            type="submit"
            className="mt-6 w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
