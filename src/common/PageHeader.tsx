import { useStoreStore } from "@/store/storeStore";
import { Typography } from "@/ui/design/typography/Typography";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function PageHeader() {
  const [stickyMenu, setStickyMenu] = useState(false);
  const { store} = useStoreStore()

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <div
      className={clsx(
        `sticky bg-gray-50 left-0 top-0 z-999999   text-center overflow-hidden transition-all ease-in-out duration-300 ${
        stickyMenu && "shadow"
      }`
      )}
    >
      <div className="relative z-10 flex flex-col items-center gap-4 mx-auto px-4">
        <div className="relative h-[100px] w-[100px] rounded-full">
          <Image
            fill
            src={store?.logo || ""}
            alt="logo"
            className=" rounded-full border-4 border-gray-200"
          />
        </div>

        <div className="flex items-center justify-center">
          <Typography variant="h4" component="h4">
            {store?.name}
          </Typography>
        </div>
      </div>
    </div>
  );
}
