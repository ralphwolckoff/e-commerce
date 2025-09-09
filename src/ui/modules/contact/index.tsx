import { Button } from "@/ui/design/button/button";
import { useState } from "react";


export const ContactModule = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  // Gère les changements dans les champs de saisie du formulaire.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gère la soumission du formulaire.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer les données à une API
    console.log("Formulaire soumis :", formData);

    // Simulation de l'envoi
    if (formData.firstName && formData.lastName) {
      setStatus({
        message: "Message envoyé avec succès!",
        type: "success",
      });
      // Réinitialiser le formulaire après l'envoi
      setFormData({
        firstName: "",
        lastName: "",
        subject: "",
        phone: "",
        message: "",
      });
    } else {
      setStatus({
        message: "Veuillez remplir les champs obligatoires.",
        type: "error",
      });
    }

    // Effacer le statut après 3 secondes
    setTimeout(() => {
      setStatus({ message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
      {/* Section des informations de contact */}
      <div className="bg-gray-50 p-8 md:p-12 w-full md:w-1/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Contact Information
        </h2>
        <div className="space-y-6 text-gray-600">
          <div className="flex items-center space-x-3">
            <UserIcon className="w-5 h-5 text-primary-800" />
            <span className="text-lg">Name: James Septimus</span>
          </div>
          <div className="flex items-center space-x-3">
            <PhoneIcon className="w-5 h-5 text-primary-800" />
            <span className="text-lg">Phone: 1234 567890</span>
          </div>
          <div className="flex items-start space-x-3">
            <AddressIcon className="w-5 h-5 text-primary-800 mt-1" />
            <span className="text-lg">
              Address: 7398 Smoke Ranch Road, Las Vegas, Nevada 89128
            </span>
          </div>
        </div>
      </div>

      {/* Section du formulaire */}
      <div className="p-8 md:p-12 w-full md:w-2/3">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Jhon"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Deo"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Type your subject"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your phone"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Type your message"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              size="small"
              className="px-6 py-3 font-semibold  rounded-lg shadow-md hfocus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors"
            >
              Send Message
            </Button>
          </div>
        </form>

        {/* Affichage du statut (succès/erreur) */}
        {status.message && (
          <div
            className={`mt-4 p-3 rounded-md text-sm text-center ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

// Composants SVG pour les icônes
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const AddressIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
