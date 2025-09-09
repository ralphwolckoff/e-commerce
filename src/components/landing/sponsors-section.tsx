import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";

export function SponsorsSection() {
  const sponsors = [
    {
      src: "/assets/imgs/YouTube-Logo.png",
      alt: "Uber Eats Logo",
    },
    { src: "/assets/imgs/Slack-Logo.png", alt: "Slack Logo" },
    {
      src: "/assets/imgs/microsoft-Logo.png",
      alt: "Microsoft Logo",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-orange-100/20">
      <div className="max-w-7xl mx-auto text-center">
        <Typography variant="h3" component="h2" className="mb-10">
          Our Sponsor
        </Typography>
        <div className="flex flex-wrap justify-center items-center space-x-8">
          {sponsors.map((sponsor) => (
            <Image
              key={sponsor.alt}
              src={sponsor.src}
              alt={sponsor.alt}
              width={100}
              height={50}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
