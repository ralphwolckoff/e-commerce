import Image from "next/image";

export default function ServiceFeatures() {
  const features = [
    {
      icon: "/assets/imgs/camping-car.png",
      alt: "Free Shipping Icon",
      title: "Free Shipping",
      description: "Free shipping for order above $180",
    },
    {
      icon: "/assets/imgs/dollar.png",
      alt: "Flexible Payment Icon",
      title: "Flexible Payment",
      description: "Multiple secure payment options",
    },
    {
      icon: "/assets/imgs/fleches-repetition.png",
      alt: "24x7 Support Icon",
      title: "24x7 Support",
      description: "We support online all days.",
    },
  ];

  return (
    <section className="bg-gray-200 py-8 md:py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center space-x-4 text-center md:text-left"
          >
            <div className="flex-shrink-0">
              <Image
                src={feature.icon}
                alt={feature.alt}
                width={48} 
                height={48}
                className="filter hue-rotate-[290deg] brightness-125 saturate-150" 
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
