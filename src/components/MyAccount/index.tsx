import { AddressSection } from "./sections/addess-section";
import { PersonalInformationSection } from "./sections/personal-info-section";

// Main App Component
export default function App() {


  

  return (
    <div className="flex flex-col items-center gap-4 ">
      <div className="flex h-full gap-7">
        <PersonalInformationSection />

        <AddressSection />
      </div>
    </div>
  );
}
