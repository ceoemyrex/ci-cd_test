"use client";

import { useCallback, useMemo, useState } from "react";
import { AddLocationDetails } from "./AddLocationDetails";
import { AddInventoryList } from "./AddInventoryList";
import { AddMovingInfoForm } from "./AddMovingInfoForm";
import { MovingFormSummary } from "./MovingFormSummary";
import { useRouter } from "next/navigation";
import { CreateMoveRequest, MoveRequestProvider } from "@/services/MoveRequest";
import { Place } from "@/services";
import { notification } from "antd";
import { DateTime } from "luxon";
import { BookMoveCheckoutFlow } from "./BookMoveTimelineStep";

export function BookMoveForm() {
  const [notificationApi, context] = notification.useNotification();
  const [moveFrom, setMoveFrom] = useState<Place | null>(null);
  const [moveTo, setMoveTo] = useState<Place | null>(null);
  const [moveSize, setMoveSize] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CreateMoveRequest>({
    fullName: "",
    phoneNumber: "",
    email: "",
    provinceId: "",
    houseSize: moveSize,

    pickUpAddress: "",
    pickUpAddressNumber: "",
    dropOffAddress: "",
    dropOffAddressNumber: "",

    pickUpLongitude: "",
    pickUpLatitude: "",
    dropOffLongitude: "",
    dropOffLatitude: "",

    moveDate: "",
    pickUpTime: DateTime.now().toISO(),

    fromNumberOfFloors: null,
    toNumberOfFloors: null,

    fromLongCarry: "Short driveway access",
    toLongCarry: "Short driveway access",

    fromRemark: "",
    toRemark: "",

    fromHasElevator: null,
    toHasElevator: null,

    fromNeedShuttle: null,
    toNeedShuttle: null,

    fromHasBuildingInsurance: null,
    toHasBuildingInsurance: null,

    fromNeedHelpPacking: null,
    toNeedHelpPacking: null,

    items: [],
  });

  const handleUpdateForm = (updateFormData: Partial<CreateMoveRequest>) => {
    setFormData((prev) => ({
      ...prev,
      ...updateFormData,
    }));
  };

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    AddLocationDetails,
    AddInventoryList,
    AddMovingInfoForm,
    MovingFormSummary,
  ];

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Parse the date (Capital MM for Month)
      // Then use .set() to hardcode the time if that's your requirement
      const baseDate = DateTime.fromFormat(formData.moveDate, "yyyy-MM-dd").set(
        { hour: 8, minute: 30, second: 0 },
      );

      // Format exactly as YYYY-MM-DDTHH:mm:ssZ
      const formattedDate = baseDate.toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

      const res = await MoveRequestProvider.getQuote({
        ...formData,
        pickUpTime: formattedDate,
        houseSize:moveSize,
        moveDate: formattedDate,
        fromHasElevator: formData.fromHasElevator == true,
        toHasElevator: formData.toHasElevator == true,

        fromNeedShuttle: formData.fromNeedShuttle == true,
        toNeedShuttle: formData.toNeedShuttle == true,

        fromHasBuildingInsurance: formData.fromHasBuildingInsurance == true,
        toHasBuildingInsurance: formData.toHasBuildingInsurance == true,

        fromNeedHelpPacking: formData.fromNeedHelpPacking == true,
        toNeedHelpPacking: formData.toNeedHelpPacking == true,
      });

      if (!res.responseStatus) {
        throw new Error(res?.responseMessage ?? "Request failed");
      }

      setCurrentStep(steps.length);
    } catch (error) {
      notificationApi.error({
        title: "Error",
        description: (error as Error)?.message ?? "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const bookingDetails = useMemo(() => {
    const moveDate = formData.moveDate
      ? DateTime.fromFormat(formData.moveDate, "yyyy-MM-dd")
      : null;
    const pickUpTime = formData.pickUpTime ? DateTime.fromISO(formData.pickUpTime) : null;

    return {
      fromAddress: moveFrom?.formattedAddress ?? formData.pickUpAddress,
      toAddress: moveTo?.formattedAddress ?? formData.dropOffAddress,
      moveSizeLabel: moveSize || "Move details pending",
      moveDateLabel: moveDate?.isValid
        ? moveDate.toFormat("dd LLLL, yyyy")
        : "Move date pending",
      moveDayLabel: moveDate?.isValid ? moveDate.toFormat("cccc") : "Flexible",
      moveTimeLabel: pickUpTime?.isValid ? pickUpTime.toFormat("hh:mm a") : "08:30 AM",
      fromLatitude: formData.pickUpLatitude,
      fromLongitude: formData.pickUpLongitude,
      toLatitude: formData.dropOffLatitude,
      toLongitude: formData.dropOffLongitude,
    };
  }, [formData, moveFrom, moveSize, moveTo]);

  const handleSetMoveFrom = useCallback((place: Place) => {
    setMoveFrom(place);

    const streetAddressComponent = place.addressComponents?.find((adc) =>
      adc.types.includes("street_number"),
    );

    const strAddrComp = streetAddressComponent?.shortText.split(" ");
    const firstStr = strAddrComp?.[0];

    handleUpdateForm({
      pickUpAddress: place.formattedAddress,
      pickUpLatitude: place.location.latitude.toString(),
      pickUpLongitude: place.location.longitude.toString(),
      pickUpAddressNumber: firstStr ?? "1",
    });
  }, []);

  const handleSetMoveTo = useCallback((place: Place) => {
    setMoveTo(place);

    const streetAddressComponent = place.addressComponents?.find((adc) =>
      adc.types.includes("street_number"),
    );

    const strAddrComp = streetAddressComponent?.shortText.split(" ");
    const firstStr = strAddrComp?.[0];

    handleUpdateForm({
      dropOffAddress: place.formattedAddress,
      dropOffAddressNumber: firstStr ?? "1",
      dropOffLatitude: place.location.latitude.toString(),
      dropOffLongitude: place.location.longitude.toString(),
    });
  }, []);

  if (currentStep === steps.length) {
    return (
      <>
        {context}
        <BookMoveCheckoutFlow
          booking={bookingDetails}
          onBack={() => setCurrentStep(steps.length - 1)}
        />
      </>
    );
  }

  const CurrentStepComponent = steps[currentStep];

  return (
    <>
      {context}
      <CurrentStepComponent
        moveFrom={moveFrom}
        moveTo={moveTo}
        setMoveFrom={handleSetMoveFrom}
        setMoveTo={handleSetMoveTo}
        onNext={next}
        moveSize={moveSize}
        setMoveSize={setMoveSize}
        onPrev={prev}
        moveItems={formData.items}
        handleUpdateMoveItems={(moveItems) => {
          handleUpdateForm({ items: moveItems });
        }}
        handleUpdate={handleUpdateForm}
        formData={formData}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
