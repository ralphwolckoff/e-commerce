import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-20 sm:px-6 lg:px-8 bg-gray-50">
      <div className="grid grid-cols-12 mx-auto">
        <div className="col-span-6 flex flex-col justify-center text-center md:text-left ">
          <Typography variant="h3" component="h2" className="font-bold mb-4">
            About Us
          </Typography>
          <Typography
            variant="body-lg"
            component="p"
            className="mx-auto md:mx-0"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Typography>
        </div>
        <div className="col-span-6 relative w-full h-[400px]">
          <div className="absolute bottom-0  w-[90%] h-[60%]">
            <Image
              src="/assets/imgs/salon2.jpg"
              alt="Canapé moderne blanc"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="absolute top-0 right-0 w-[40%] mr-10 h-[50%] transform translate-y-10 translate-x-10">
            <Image
              src="/assets/imgs/chaise.jpg"
              alt="Chaise design avec table d'appoint"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
