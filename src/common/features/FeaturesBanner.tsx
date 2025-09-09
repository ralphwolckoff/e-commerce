import Image from "next/image";

export default function FeaturesBanner() {
  const features = [
    {
      icon: "/assets/imgs/dollar.png",
      alt: "Money Back Guarantee",
      title: "Money Back Granty",
    },
    {
      icon: "/assets/imgs/fleches-repetition.png",
      alt: "Easy Returned",
      title: "Easy Returned",
    },
    {
      icon: "/assets/imgs/camping-car.png",
      alt: "Free Delivery",
      title: "Free Delivery",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-around items-center bg-gray-100 py-6 px-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex items-center bg-gradient-to-r from-primary  to-secondary space-x-3 w-[450px] h-20 px-2 md:my-0 "
        >
          <div className={`p-3 rounded-full border-2 text-white `}>
            <Image
              src={feature.icon}
              alt={feature.alt}
              width={24}
              height={24}
              className="invert"
            />
          </div>
          <span className="text-gray-300 font-semibold text-lg">
            {feature.title}
          </span>
        </div>
      ))}
    </div>
  );
}
