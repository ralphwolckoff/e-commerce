import { AuthProvider } from "@/context/AuthContext";
import { CartModalProvider } from "@/context/CartSidebarModalContext";
import { ModalProvider } from "@/context/QuickViewModalContext";
import "@/styles/globals.css";
import ScrollToTop from "@/ui/design/avatars/ScrollToTop";
import PreLoader from "@/ui/design/spinner/PreLoader";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import {ToastContainer, Zoom } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
    }, []);
  return (
    <AuthProvider>
      <CartModalProvider>
        <ModalProvider>
          <ToastContainer
            position="bottom-center"
            theme="light"
            autoClose={6000}
            transition={Zoom}
          />
          {loading && <PreLoader />}
          {/* <LoadingOverlay isLoading={loading} /> */}
          <Component {...pageProps} />
          <ScrollToTop />
        </ModalProvider>
      </CartModalProvider>
    </AuthProvider>
  );
}


