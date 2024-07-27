"use client";

import Image from "next/image";

function CartModal() {
  const cartItems = true;
  return (
    <div className="w-max absolute top-12 right-0 flex flex-col gap-6 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
      {!cartItems ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/18391175/pexels-photo-18391175/free-photo-of-young-woman-in-a-suit-standing-on-the-pavement-in-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  {/* TITTLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$49</div>
                  </div>
                  {/* DESCR */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BUTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-blue-500 cursor-pointer">Remove</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/18391175/pexels-photo-18391175/free-photo-of-young-woman-in-a-suit-standing-on-the-pavement-in-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  {/* TITTLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$49</div>
                  </div>
                  {/* DESCR */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BUTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-blue-500 cursor-pointer">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* BUTTOM */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>$49</span>
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
