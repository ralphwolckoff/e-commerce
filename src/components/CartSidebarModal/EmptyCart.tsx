import React from "react";
import Link from "next/link";
import {ShopIcon2 } from "../icons";

const EmptyCart = ({onClose}:{onClose: ()=>void}) => {

  return (
    <div className="text-center pt-12">
      <div className="mx-auto pb-7.5">
        <ShopIcon2 />
      </div>

      <p className="pb-6">Your cart is empty !</p>

      <Link
        onClick={() => onClose()}
        href="/products/shop"
        className="w-full lg:w-10/12 mx-auto flex justify-center font-medium text-white bg-primary py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
