/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useState } from "react";
import { AddLocationDetails } from "./AddLocationDetails";
import { AddInventoryList } from "./AddInventoryList";
import { AddMovingInfoForm } from "./AddMovingInfoForm";
import { MovingFormSummary } from "./MovingFormSummary";
import { useRouter } from "next/navigation";
import { CreateMoveRequest, MoveRequestProvider } from "@/services/MoveRequest";
import { Place } from "@/services";
import { notification } from "antd";
import { Portal } from "@/components";
import StarrySpace from "./MovingSummary";
import { DateTime } from "luxon";

export function BookMoveForm() {
  const [notificationApi, context] = notification.useNotification();
  const [moveFrom, setMoveFrom] = useState<Place | null>(null);
  const [moveTo, setMoveTo] = useState<Place | null>(null);
  const [moveSize, setMoveSize] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<CreateMoveRequest>({
    fullName: "",
    phoneNumber: "",
    email: "",
    provinceId: "",

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

      setSuccess(true);
      setCurrentStep(0);
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

  const CurrentStepComponent = steps[currentStep];

  return (
    <>
      {context}
      <CurrentStepComponent
        moveFrom={moveFrom}
        moveTo={moveTo}
        setMoveFrom={useCallback((place) => {
          setMoveFrom(place);

          const streetAddressComponent = place.addressComponents?.find((adc) =>
            adc.types.includes("street_number"),
          );

          const strAddrComp = streetAddressComponent?.shortText.split(" ");
          const firstStr = strAddrComp?.[0];

          handleUpdateForm({
            pickUpAddress: place.formattedAddress,
            pickUpLatitude: place.location.latitude.toString(),
            pickUpAddressNumber: firstStr ?? "1",
          });
        }, [])}
        setMoveTo={useCallback((place) => {
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
        }, [])}
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
      {success && (
        <Portal>
          <div className="fixed overflow-auto flex items-center justify-center p-4 top-0 left-0 w-full h-full bg-white/20 backdrop-blur z-1000000">
            <div className="bg-white flex-1 max-w-135 border border-black/10 rounded-2xl">
              <StarrySpace />
              <img
                src="/success.png"
                className="h-15 w-15 lg:h-30 lg:w-30 mx-auto -mt-7.5 lg:-mt-15 relative rounded-full"
                alt="Success"
              />

              <div>
                <div className=" p-8">
                  <p className="font-bold text-center text-xl lg:text-3xl">
                    Thank you for questing a quote {formData.fullName}{" "}
                  </p>
                  <p className="text-grey text-sm lg:text-base text-center">
                    Your quotes are on their way to your email
                  </p>
                  <div className="my-10 text-center">
                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-theme text-white text-sm lg:text-base rounded-lg px-10 py-4 font-medium"
                    >
                      Ok Got It
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
