import { useState } from "react";
import { AddressSection } from "./sections/addess-section";
import { MessageModal } from "./messageModal";
import { PersonalInformationSection } from "./sections/personal-info-section";

// Main App Component
export default function App() {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  const showInfoMessage = (msg: string) => {
    setMessage(msg);
    setShowMessageModal(true);
  };

  

  return (
    <div className="flex flex-col items-center gap-4 ">
      <div className="flex h-full gap-7">
        <PersonalInformationSection />

        <AddressSection />
      </div>

      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        message={message}
      />
    </div>
  );
}
