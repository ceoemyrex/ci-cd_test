import { MovingInfoForm } from "./MovingInfoForm";
import { CreateMoveRequest } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";
import { useState } from "react";
import { notification } from "antd";

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
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [notificationApi, context] = notification.useNotification();

  const handleSubmit = () => {
    if (!formData.moveDate) {
      notificationApi.error({
        title: "Missing Moving Date",
        description: "Please select your moving date.",
      });
      return;
    }

    if (!formData.fullName?.trim()) {
      notificationApi.error({
        title: "Full Name Required",
        description: "Please enter your full name.",
      });
      return;
    }

    if (!formData.email?.trim()) {
      notificationApi.error({
        title: "Email Required",
        description: "Please enter your email address.",
      });
      return;
    }

    if (!formData.phoneNumber?.trim()) {
      notificationApi.error({
        title: "Phone Number Required",
        description: "Please enter your phone number.",
      });
      return;
    }

    if (!moveFrom) {
      notificationApi.error({
        title: "Pickup Location Missing",
        description: "Please select where you are moving from.",
      });
      return;
    }

    if (!Number(formData.fromNumberOfFloors)) {
      notificationApi.error({
        title: "Pickup Floors Required",
        description: "Enter number of floors for pickup location.",
      });
      return;
    }

    if (!moveTo) {
      notificationApi.error({
        message: "Drop-off Location Missing",
        description: "Please select your destination.",
      });
      return;
    }

    if (!Number(formData.toNumberOfFloors)) {
      notificationApi.error({
        message: "Drop-off Floors Required",
        description: "Enter number of floors for drop-off location.",
      });
      return;
    }

    // ✅ All good
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
