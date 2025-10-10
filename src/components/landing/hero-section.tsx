import { Button } from "@/ui/design/button/button";
import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";
import { SocialNetwokbuttons } from "../navigation/social-networks-buttons";


export function HeroSection() {
  return (
    <section className="relative pt-6 pb-20 md:pb-40 px-4 sm:px-6 lg:px-8 min-h-[500px] flex items-center justify-center">
      <Image
        src={"/assets/imgs/pexels-fotoaibe.jpg"}
        alt="Décoration intérieure élégante"
        fill
        className="-z-10 "
        sizes="100vw"
      />
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-end md:items-center justify-between z-10 gap-8">
        <div className="flex flex-col gap-4 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg md:max-w-none md:w-1/2 bg-white/20 backdrop-blur-sm">
          <Typography variant="h3" weight="regular">
            Make Your Place a Better Living
          </Typography>
          <Typography
            variant="body-base"
            component="p"
            className="text-gray-600"
          >
           Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </Typography>
          <Button baseUrl="/shop" className="font-bold rounded-full w-fit mt-2">
            Buy Now
          </Button>
        </div>
        <div className="w-fit md:w-auto">
          <SocialNetwokbuttons className="flex flex-row md:flex-col gap-4  p-3 rounded-full" />
        </div>
      </div>
    </section>
  );
}
