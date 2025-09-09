"use client";

import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingCartLine } from "react-icons/ri";
import { SocialNetwokbuttons } from "./social-networks-buttons";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";


export default function Footer() {

  return (
    <footer>
      <div className="bg-gray-200 text-white py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 mx-10">
              <div className=" flex items-center z-10 justify-center rounded-full bg-primary text-white h-10 w-10">
                <RiShoppingCartLine size={26} />
              </div>
              <Typography
                variant="caption2"
                component="h5"
                className="text-primary"
              >
                ONLINE SHOP
              </Typography>
            </div>
            <p className="text-primary text-sm mb-6 max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            {/* Social Icons */}
            <SocialNetwokbuttons className="flex items-center gap-5" />
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-semibold text-primary text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-primary text-sm">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-primary-600 transition duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary-600 transition duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-primary-600 transition duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-primary-600 transition duration-200"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services */}
          <div>
            <h3 className="font-semibold text-primary text-lg mb-4">
              Customer Services
            </h3>
            <ul className="space-y-2 text-primary text-sm">
              <li>
                <Link
                  href="/my-account"
                  className="hover:text-primary-600 transition duration-200"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-primary-600 transition duration-200"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/return"
                  className="hover:text-primary-600 transition duration-200"
                >
                  Return
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary-600 transition duration-200"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Our Information */}
          <div>
            <h3 className="font-semibold text-primary text-lg mb-4">
              Our Information
            </h3>
            <ul className="space-y-2 text-primary text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary-600 transition duration-200"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary-600 transition duration-200"
                >
                  User Terms & Condition
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="hover:text-primary-600 transition duration-200"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div>
            <h3 className="font-semibold text-primary text-lg mb-4">
              Contact Info
            </h3>
            <ul className="space-y-2 text-primary text-sm">
              <li>+0123-456-789</li>
              <li>example@gmail.com</li>
              <li>
                8502 Preston Rd.
                <br />
                Inglewood, Maine
                <br />
                98380
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section (Orange/Yellow) */}
      <div className="bg-gray-800 text-primary-700 py-4 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-2 md:mb-0">
            Copyright &copy; 2024 Furniture. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-white transition duration-200">
                <span>English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transform group-hover:rotate-180 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Simple Dropdown for Language (can be expanded) */}
              <div className="absolute bottom-full mb-2 right-0 w-24 bg-white text-gray-800 rounded shadow-lg p-2 hidden group-hover:block">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="#"
                      className="block hover:bg-gray-100 p-1 rounded"
                    >
                      French
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block hover:bg-gray-100 p-1 rounded"
                    >
                      Spanish
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <span>|</span>
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-white transition duration-200">
                <span>USD</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transform group-hover:rotate-180 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Simple Dropdown for Currency (can be expanded) */}
              <div className="absolute bottom-full mb-2 right-0 w-24 bg-white text-gray-800 rounded shadow-lg p-2 hidden group-hover:block">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="#"
                      className="block hover:bg-gray-100 p-1 rounded"
                    >
                      EUR
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block hover:bg-gray-100 p-1 rounded"
                    >
                      GBP
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
