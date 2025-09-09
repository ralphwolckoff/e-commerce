import Link from "next/link";
import Footer from "@/components/navigation/footer";

export default function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8 text-center">
        <div className="relative mb-8 select-none">
          \
          <div className="relative text-[15rem] md:text-[20rem] lg:text-[25rem] font-extrabold leading-none tracking-tight text-gray-200">
            <span className="inline-block relative bg-[url(/assets/imgs/pexels-fotoaibe.jpg)] bg-clip-text bg-left text-transparent">
              4
            </span>
            <span className="inline-block relative bg-[url(/assets/imgs/pexels-fotoaibe.jpg)] bg-clip-text bg-center text-transparent">
              0
            </span>
            <span className="inline-block relative bg-[url(/assets/imgs/pexels-fotoaibe.jpg)] bg-clip-text bg-right text-transparent">
              4
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Oops! Page not Found
        </h1>
        <p className="text-gray-600 text-lg max-w-lg mb-8">
          The page you are looking for cannot be found, take a break before
          trying again
        </p>

        <Link href="/">
          <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition duration-300 shadow-md">
            Go To Home Page
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
