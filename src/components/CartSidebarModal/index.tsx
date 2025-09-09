"use client";
import React from "react";
import SingleItem from "./SingleItem";
import EmptyCart from "./EmptyCart";
import { useCartStore } from "@/store/cartStore";
import Modal from "../../common/Modal";
import { Button } from "@/ui/design/button/button";

interface CartSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebarModal = ({ isOpen, onClose }: CartSidebarModalProps) => {
  const cartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cart View"
      size="sm"
      className="top-20 right-0"
    >
      <div className="flex items-center justify-end ">
        <div className="w-full max-w-[500px] shadow-1 bg-white px-4 sm:px-7.5 lg:px-11  relative modal-content">
          <div className="h-[66vh] ">
            <div className="flex flex-col items-center  gap-6 ">
              {/* <!-- cart item --> */}
              {cartItems.length > 0 ? (
                cartItems.map((item, key) => (
                  <SingleItem key={key} item={item} />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          <div className="border-t border-gray-3 bg-white pt-5 pb-4 sm:pb-7.5 lg:pb-11 mt-7.5 sticky bottom-0">
            <div className="flex items-center justify-between gap-5 mb-6">
              <p className="font-medium text-xl text-dark">Subtotal:</p>

              <p className="font-medium text-xl text-dark">${totalPrice}</p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                action={() => onClose()}
                baseUrl="/cart"
                className=" rounded-md "
              >
                View Cart
              </Button>

              <Button
                action={() => onClose()}
                baseUrl="/checkout"
                variant="secondary"
                className="rounded-md "
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartSidebarModal;
