import { MovingInfoForm } from "./MovingInfoForm";
import { CreateMoveRequest } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";
import { useState } from "react";
import { notification } from "antd";
import { useParams } from "next/navigation";
import { Locale } from "@/app/utils";

const translations = {
  en: {
    missingDateTitle: "Missing Moving Date",
    missingDateDesc: "Please select your moving date.",

    fullNameTitle: "Full Name Required",
    fullNameDesc: "Please enter your full name.",

    provinceTitle: "Province is Required",
    provinceDesc: "Please select your province.",

    emailTitle: "Email Required",
    emailDesc: "Please enter your email address.",

    phoneTitle: "Phone Number Required",
    phoneDesc: "Please enter your phone number.",

    pickupTitle: "Pickup Location Missing",
    pickupDesc: "Please select where you are moving from.",

    pickupFloorsTitle: "Pickup Floors Required",
    pickupFloorsDesc: "Enter number of floors for pickup location.",

    dropTitle: "Drop-off Location Missing",
    dropDesc: "Please select your destination.",

    dropFloorsTitle: "Drop-off Floors Required",
    dropFloorsDesc: "Enter number of floors for drop-off location.",
  },

  nl: {
    missingDateTitle: "Verhuisdatum ontbreekt",
    missingDateDesc: "Selecteer uw verhuisdatum.",

    fullNameTitle: "Volledige naam vereist",
    fullNameDesc: "Voer uw volledige naam in.",

    provinceTitle: "Provincie vereist",
    provinceDesc: "Selecteer uw provincie.",

    emailTitle: "E-mailadres vereist",
    emailDesc: "Voer uw e-mailadres in.",

    phoneTitle: "Telefoonnummer vereist",
    phoneDesc: "Voer uw telefoonnummer in.",

    pickupTitle: "Ophaaladres ontbreekt",
    pickupDesc: "Selecteer waar u vandaan verhuist.",

    pickupFloorsTitle: "Aantal verdiepingen vereist",
    pickupFloorsDesc: "Voer het aantal verdiepingen in voor het ophaaladres.",

    dropTitle: "Afleveradres ontbreekt",
    dropDesc: "Selecteer uw bestemming.",

    dropFloorsTitle: "Aantal verdiepingen vereist",
    dropFloorsDesc: "Voer het aantal verdiepingen in voor het afleveradres.",
  },
};

export function AddMovingInfoForm({
  onNext,
  onPrev,
  formData,
  handleUpdate,
  moveFrom,
  moveTo,
  setMoveFrom,
  setMoveTo,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  formData: CreateMoveRequest;
  handleUpdate: (value: Partial<CreateMoveRequest>) => void;
  moveTo: Place | null;
  moveFrom: Place | null;
  setMoveFrom: (place: Place) => void;
  setMoveTo: (place: Place) => void;
}) {
  const { locale } = useParams() as { locale: Locale };
  const t = translations[locale] || translations.en;
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [notificationApi, context] = notification.useNotification();

  const handleSubmit = () => {
    if (!formData.moveDate) {
      notificationApi.error({
        title: t.missingDateTitle,
        description: t.missingDateDesc,
      });
      return;
    }

    if (!formData.fullName?.trim()) {
      notificationApi.error({
        title: t.fullNameTitle,
        description: t.fullNameDesc,
      });
      return;
    }

    if (!formData.provinceId?.trim()) {
      notificationApi.error({
        title: t.provinceTitle,
        description: t.provinceDesc,
      });
      return;
    }

    if (!formData.email?.trim()) {
      notificationApi.error({
        title: t.emailTitle,
        description: t.emailDesc,
      });
      return;
    }

    if (!formData.phoneNumber?.trim()) {
      notificationApi.error({
        title: t.phoneTitle,
        description: t.phoneDesc,
      });
      return;
    }

    if (!moveFrom) {
      notificationApi.error({
        title: t.pickupTitle,
        description: t.pickupDesc,
      });
      return;
    }

    // if (!Number(formData.fromNumberOfFloors)) {
    //   notificationApi.error({
    //     title: t.pickupFloorsTitle,
    //     description: t.pickupFloorsDesc,
    //   });
    //   return;
    // }

    if (!moveTo) {
      notificationApi.error({
        title: t.dropTitle,
        description: t.dropDesc,
      });
      return;
    }

    // if (!Number(formData.toNumberOfFloors)) {
    //   notificationApi.error({
    //     title: t.dropFloorsTitle,
    //     description: t.dropFloorsDesc,
    //   });
    //   return;
    // }

    onNext?.();
  };

  return (
    <>
      {context}
      <BookFormContainer
        canContinue
        isNextDisabled={!termsAccepted}
        currentStep={3}
        onPrev={onPrev}
        onNext={handleSubmit}
      >
        <MovingInfoForm
          formData={formData}
          moveFrom={moveFrom}
          moveTo={moveTo}
          handleUpdate={handleUpdate}
          setMoveFrom={setMoveFrom}
          setMoveTo={setMoveTo}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
        />
      </BookFormContainer>
    </>
  );
}
