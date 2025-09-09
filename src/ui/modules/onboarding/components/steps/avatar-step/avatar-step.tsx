import { useToggle } from "@/hooks/use-toggle";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/components/container/container";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { useState } from "react";
import { Typography } from "@/ui/design/typography/Typography";
import { BaseComponentProps } from "@/types/onboarding-step-list";
import { UploadImage } from "@/components/upload-avatar/upload-image";
import Image from "next/image";
import { useStoreStore } from "@/store/storeStore";
import { storeService } from "@/services/storeService";

export const AvatarStep = ({
  next,
  prev,
  isFinalStep,
  stepList,
  getCurrentStep,
}: BaseComponentProps) => {
  const {store} = useStoreStore();
  const { value: isLoading, toggle } = useToggle();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const updateUserDocument = async (logo: string) => {
    toggle(); // Start loading state
    if (!store) {
      toggle(); // Stop loading state
      return;
    }
    const body = {
      logo: logo,
    }; 
    if (store?.id) {
      const response = await storeService.updateStore(store.id, body);

      if (!response) {
        console.error("Error updating user document");
      }
    }
    toggle(); // Stop loading state
    next();
  };

  const handleImageSelect =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        let imgDataUrl: string | ArrayBuffer | null = null;
        if (e.target) {
          imgDataUrl = e.target.result;
        }
        setImgPreview(imgDataUrl);
      };
      reader.readAsDataURL(file);
      setImgPreview(null);
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage !== null) {
      toggle();
      if (store?.id) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("storeId", store.id);

        const response = await fetch("/api/upload-logo", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImgPreview(data.newLogoUrl);
          await updateUserDocument(data.newLogoUrl);
        } else {
          console.error("Error uploading image");
        }
      }
      toggle();
      next();
    } else {
      next();
    }
  };

  return (
    <div className="relative h-screen pb-[91px]">
      <Image
        src={"/assets/imgs/pexels-lloyd.jpg"}
        alt="toop"
        width={1920}
        height={1080}
        className="fixed -z-10 overflow-hidden"
      />
      <div className="h-full overflow-auto">
        <Container className="grid h-full grid-cols-12">
          <div className="relative z-10 flex items-center h-full col-span-6 py-10">
            <div className="w-full space-y-5 pb-4.5">
              <OnboardingTabs tabs={stepList} getCurrentStep={getCurrentStep} />
              <Typography variant="h1" component="h1">
                Dernière étape
              </Typography>
              <Typography variant="body-base" component="p" theme="gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur voluptatem facilis asperiores quia nobis facere
                maxime deserunt laborum ullam. Enim consequuntur ea quia, veniam
                delectus maxime minus at, laudantium maiores optio vel
              </Typography>
            </div>
          </div>
          <div className="flex items-center h-full col-span-6">
            <div className="flex justify-center w-full">
              <UploadImage
                handleImageSelect={handleImageSelect}
                imgPreview={imgPreview}
                isLoading={isLoading}
              />
            </div>
          </div>
        </Container>
      </div>
      <OnboardingFooter
        prev={prev}
        next={handleImageUpload}
        isFinalStep={isFinalStep}
        isLoading={isLoading}
      />
    </div>
  );
};
