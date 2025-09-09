import { Button } from "@/ui/design/button/button";
import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";
import { SocialNetwokbuttons } from "../navigation/social-networks-buttons";

export function HeroSection() {
  return (
    <section className="relative pt-6 pb-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex  z-50 md:flex-row items-center justify-between">
        <Image
          src={"/assets/imgs/pexels-fotoaibe.jpg"}
          alt="toop"
          fill
          className="-z-10"
        />

        <div className=" flex flex-col gap-6 p-6 rounded-lg shadow-lg w-[700px] h-[350px] md:w-1/2 md:h-1/2 md:pr-10 bg-gray-100/60">
          <Typography variant="h3" weight="regular">
            Make Your Place a Better Living
          </Typography>
          <Typography variant="body-base" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
          <Button
            baseUrl="/products"
            className="font-bold rounded-full"
          >
            Buy Now
          </Button>
        </div>
        <div className="">
          <SocialNetwokbuttons className="flex flex-col gap-4"/>
        </div>
      </div>
    </section>
  );
}
