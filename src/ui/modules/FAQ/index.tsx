"use client";

import React, { useState } from "react";

const questionsAnswers = [
  {
    question: "What services do you offer?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Can I see examples of your previous work/portfolio?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "How do I get started with a project?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Do you provide consultations or initial design concepts?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Do you work within a specific budget range?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What are your payment and pricing structures?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What is your design style or approach?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Do you provide consultations or initial design concepts?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
  </svg>
);

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      onClick={onClick}
      className="flex justify-between items-center w-full text-left"
    >
      <span className="font-semibold text-gray-800">{question}</span>
      {isOpen ? (
        <MinusIcon className="text-gray-500" />
      ) : (
        <PlusIcon className="text-gray-500" />
      )}
    </button>
    {isOpen && (
      <div className="mt-2 pr-10 text-gray-600 animate-slide-down">
        {answer}
      </div>
    )}
  </div>
);

export const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-sans">
      <style>{`
        .animate-slide-down {
          animation: slideDown 0.3s ease-in-out forwards;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="text-center mb-12">
        <p className="uppercase text-sm font-semibold text-gray-500">FAQ</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Question? <span className="text-yellow-600">Look here.</span>
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
        {questionsAnswers.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800">
          Still have a <span className="text-yellow-600">questions?</span>
        </h3>
        <button className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition-colors">
          <span className="mr-2">✨</span>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default FAQComponent;
