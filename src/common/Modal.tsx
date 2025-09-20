"use client";

import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  size?: "xm"|"sm" | "md" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  title,
  size = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // document.body.style.overflow = "hidden"; // Empêche le défilement de l'arrière-plan
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      // document.body.style.overflow = ""; // Rétablit le défilement
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    xm: "max-w-[300px] max-h-[450px]",
    sm: "max-w-[500px]",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className={clsx(
        `fixed inset-0 z-50 flex justify-end transform transition-transform duration-300 ease-in-out ${className}`,
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-xl overflow-hidden w-full ${sizeClasses[size]} transform transition-all duration-300 scale-100 opacity-100`}
      >
        <div className="flex justify-between items-center p-5 bg-primary  border-b border-gray-200">
          <h3 className="text-xl  font-semibold text-gray">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="py-6 ">{children}</div>
      </div>
    </div>
  );
}
