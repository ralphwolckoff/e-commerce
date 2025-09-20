import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Chuck Norris",
      role: "CEO & Founder",
      rating: 5,
      comment:
        "They have got a commitment to excellence and a team that truly cares about their work and their customers.",
      avatar: "/assets/user/user-35.jpg",
    },
    {
      name: "Tom Hanks",
      role: "Lead Designer",
      rating: 4,
      comment:
        "This team is truly talented and great to work with. They are always professional and on time.",
      avatar: "/assets/user/user-36.jpg",
    },
    {
      name: "Darth Vader",
      role: "CTO",
      rating: 5,
      comment:
        "Amazing work! This team is truly talented and great to work with. Highly recommended.",
      avatar: "/assets/user/user-37.jpg",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex justify-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 fill-current ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <Typography variant="h3" component="h2" className="mb-12">
          Our Happy Clients
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-8 bg-white rounded-lg shadow-md hover:shadow-md/40 overflow-hidden flex flex-col items-center"
            >
              <div className="text-7xl text-gray-400 mb-4">“</div>
              <Typography variant="caption3" component="p" className="mb-6">
                {testimonial.comment}
              </Typography>
              <div className="flex items-center gap-1">
                <Image
                  src={testimonial.avatar}
                  alt={`Avatar of ${testimonial.name}`}
                  width={80}
                  height={80}
                  className="rounded-full mt-6 mb-2"
                />
                <div>
                  <Typography component="h4" variant="caption3">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body-sm" component="p">
                    {testimonial.role}
                  </Typography>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
