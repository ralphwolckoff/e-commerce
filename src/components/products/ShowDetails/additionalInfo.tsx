import Image from 'next/image';
import React, { useState } from 'react';

const AdditionalInfo = () => {
      const [activeTab, setActiveTab] = useState("tabOne");

      const tabs = [
        {
          id: "tabOne",
          title: "Description",
        },
        {
          id: "tabTwo",
          title: "Additional Information",
        },
        {
          id: "tabThree",
          title: "Reviews",
        },
      ];

    return (
      <div>
        <section className="overflow-hidden bg-gray-200/50 py-20">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            {/* <!--== tab header start ==--> */}
            <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
              {tabs.map((item, key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(item.id)}
                  className={`font-medium lg:text-lg ease-out duration-200 hover:text-primary relative before:h-0.5 before:bg-primary before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${
                    activeTab === item.id
                      ? "text-primary before:w-full"
                      : "text-gray before:w-0"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            {/* <!--== tab header end ==--> */}

            {/* <!--== tab content start ==--> */}
            {/* <!-- tab content one start --> */}
            <div>
              <div
                className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
                  activeTab === "tabOne" ? "flex" : "hidden"
                }`}
              >
                <div className="max-w-[670px] w-full">
                  <h2 className="font-medium text-2xl text-dark mb-7">
                    Specifications:
                  </h2>

                  <p className="mb-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </p>
                  <p className="mb-6">
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s.
                  </p>
                  <p>
                    with the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions.
                  </p>
                </div>

                <div className="max-w-[447px] w-full">
                  <h2 className="font-medium text-2xl text-dark mb-7">
                    Care & Maintenance:
                  </h2>

                  <p className="mb-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </p>
                  <p>
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- tab content one end --> */}

            {/* <!-- tab content two start --> */}
            <div>
              <div
                className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 ${
                  activeTab === "tabTwo" ? "block" : "hidden"
                }`}
              >
                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">Brand</p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">Apple</p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">Model</p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      iPhone 14 Plus
                    </p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Display Size
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">6.7 inches</p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Display Type
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Super Retina XDR OLED, HDR10, Dolby Vision, 800 nits
                      (HBM), 1200 nits (peak)
                    </p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Display Resolution
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      1284 x 2778 pixels, 19.5:9 ratio
                    </p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">Chipset</p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Apple A15 Bionic (5 nm)
                    </p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">Memory</p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      128GB 6GB RAM | 256GB 6GB RAM | 512GB 6GB RAM
                    </p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Main Camera
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      12MP + 12MP | 4K@24/25/30/60fps, stereo sound rec.
                    </p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Selfie Camera
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      12 MP | 4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS
                    </p>
                  </div>
                </div>

                {/* <!-- info item --> */}
                <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                  <div className="max-w-[450px] min-w-[140px] w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Battery Info
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-sm sm:text-base text-dark">
                      Li-Ion 4323 mAh, non-removable | 15W wireless (MagSafe),
                      7.5W wireless (Qi)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- tab content two end --> */}

            {/* <!-- tab content three start --> */}
            <div>
              <div
                className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
                  activeTab === "tabThree" ? "flex" : "hidden"
                }`}
              >
                <div className="max-w-[570px] w-full">
                  <h2 className="font-medium text-2xl text-dark mb-9">
                    03 Review for this product
                  </h2>

                  <div className="flex flex-col gap-6">
                    {/* <!-- review item --> */}
                    <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <a href="#" className="flex items-center gap-4">
                          <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                            <Image
                              src="/images/users/user-01.jpg"
                              alt="author"
                              className="w-12.5 h-12.5 rounded-full overflow-hidden"
                              width={50}
                              height={50}
                            />
                          </div>

                          <div>
                            <h3 className="font-medium text-dark">
                              Davis Dorwart
                            </h3>
                            <p className="text-custom-sm">
                              Serial Entrepreneur
                            </p>
                          </div>
                        </a>

                        <div className="flex items-center gap-1">
                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <p className="text-dark mt-6">
                        “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                        malesuada justo vitaeaugue suscipit beautiful vehicula’’
                      </p>
                    </div>

                    {/* <!-- review item --> */}
                    <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <a href="#" className="flex items-center gap-4">
                          <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                            <Image
                              src="/images/users/user-01.jpg"
                              alt="author"
                              className="w-12.5 h-12.5 rounded-full overflow-hidden"
                              width={50}
                              height={50}
                            />
                          </div>

                          <div>
                            <h3 className="font-medium text-dark">
                              Davis Dorwart
                            </h3>
                            <p className="text-custom-sm">
                              Serial Entrepreneur
                            </p>
                          </div>
                        </a>

                        <div className="flex items-center gap-1">
                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <p className="text-dark mt-6">
                        “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                        malesuada justo vitaeaugue suscipit beautiful vehicula’’
                      </p>
                    </div>

                    {/* <!-- review item --> */}
                    <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <a href="#" className="flex items-center gap-4">
                          <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                            <Image
                              src="/images/users/user-01.jpg"
                              alt="author"
                              className="w-12.5 h-12.5 rounded-full overflow-hidden"
                              width={50}
                              height={50}
                            />
                          </div>

                          <div>
                            <h3 className="font-medium text-dark">
                              Davis Dorwart
                            </h3>
                            <p className="text-custom-sm">
                              Serial Entrepreneur
                            </p>
                          </div>
                        </a>

                        <div className="flex items-center gap-1">
                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <p className="text-dark mt-6">
                        “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                        malesuada justo vitaeaugue suscipit beautiful vehicula’’
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-w-[550px] w-full">
                  <form>
                    <h2 className="font-medium text-2xl text-dark mb-3.5">
                      Add a Review
                    </h2>

                    <p className="mb-6">
                      Your email address will not be published. Required fields
                      are marked *
                    </p>

                    <div className="flex items-center gap-3 mb-7.5">
                      <span>Your Rating*</span>

                      <div className="flex items-center gap-1">
                        <span className="cursor-pointer text-[#FBB040]">
                          <svg
                            className="fill-current"
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                              fill=""
                            />
                          </svg>
                        </span>

                        <span className="cursor-pointer text-[#FBB040]">
                          <svg
                            className="fill-current"
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                              fill=""
                            />
                          </svg>
                        </span>

                        <span className="cursor-pointer text-[#FBB040]">
                          <svg
                            className="fill-current"
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                              fill=""
                            />
                          </svg>
                        </span>

                        <span className="cursor-pointer text-gray-5">
                          <svg
                            className="fill-current"
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                              fill=""
                            />
                          </svg>
                        </span>

                        <span className="cursor-pointer text-gray-5">
                          <svg
                            className="fill-current"
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                      <div className="mb-5">
                        <label htmlFor="comments" className="block mb-2.5">
                          Comments
                        </label>

                        <textarea
                          name="comments"
                          id="comments"
                          rows={5}
                          placeholder="Your comments"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        ></textarea>

                        <span className="flex items-center justify-between mt-2.5">
                          <span className="text-custom-sm text-dark-4">
                            Maximum
                          </span>
                          <span className="text-custom-sm text-dark-4">
                            0/250
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-5 sm:gap-7.5 mb-5.5">
                        <div>
                          <label htmlFor="name" className="block mb-2.5">
                            Name
                          </label>

                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name"
                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block mb-2.5">
                            Email
                          </label>

                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your email"
                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                      >
                        Submit Reviews
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <!-- tab content three end --> */}
            {/* <!--== tab content end ==--> */}
          </div>
        </section>
      </div>
    );
};

export default AdditionalInfo;