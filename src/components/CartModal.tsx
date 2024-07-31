"use client";

import Image from "next/image";
import { useCartStore } from "../../hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "../../hooks/useWixClient";

function CartModal() {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  // Calculate the subtotal manually
  const subtotal = cart.lineItems?.reduce((total, item) => {
    return total + (Number(item.price?.amount) || 0) * (item.quantity || 1);
  }, 0);

  return (
    <div className="w-max absolute top-12 right-0 flex flex-col gap-6 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
      {isLoading ? (
        "Loading..."
      ) : !cart.lineItems ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-1">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-gray-400 text-xs">
                            {item.quantity} x
                          </div>
                        )}
                        {item.price?.amount}
                        {cart.currency}
                      </div>
                    </div>
                    {/* DESCRIPTION */}
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>
                {subtotal}
                {cart.currency}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <div className="flex items-center justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartModal;
