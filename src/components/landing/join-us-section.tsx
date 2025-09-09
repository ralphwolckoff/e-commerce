import { Button } from "@/ui/design/button/button";
import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";
import { RiPlayFill } from "react-icons/ri";

export function JoinUsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className=" flex flex-col justify-center items-center md:text-left mb-6">
        <Typography variant="h3" component="h2">
          Join With Us
        </Typography>
        <Typography variant="body-lg" component="p">
          Signup for the newsletter and receive 10% off your first order.
        </Typography>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        <div className="md:w-1/2 relative">
          <Image
            src="/assets/imgs/stock.jpg"
            alt="Video placeholder of a modern living room"
            width={700}
            height={450}
            layout="responsive"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button variant="ico" iconTheme="accent" icon={{icon:RiPlayFill}} />
          </div>
        </div>
        <div className="md:w-1/2">
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Button
            size="very-small"
              type="submit"
              className=" font-bold py-3 px-6  transition-colors"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
