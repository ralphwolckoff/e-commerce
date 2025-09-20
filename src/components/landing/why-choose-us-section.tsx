import { Button } from "@/ui/design/button/button";
import { Typography } from "@/ui/design/typography/Typography";
import {  RiGroupFill, RiShieldCheckFill, RiStarFill } from "react-icons/ri";

export function WhyChooseUsSection() {
  const features = [
    {
      title: "Quality",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: RiStarFill
    },
    {
      title: "Longevity",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: RiShieldCheckFill 
    },
    {
      title: "Community",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: RiGroupFill 
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <Typography variant="h3" component="h2" className=" mb-12">
          Why Choose Us?
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-gray-50 rounded-lg shadow-sm text-center"
            >
              <Button variant="ico" iconTheme="secondary" icon={{icon:feature.icon}} />
              <Typography
                variant="lead"
                component="h3"
                className="mb-2 "
              >
                {feature.title}
              </Typography>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button
                baseUrl="#"
                variant="secondary"
                className="text-primary-700 hover:text-primary-600"
              >
                More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
