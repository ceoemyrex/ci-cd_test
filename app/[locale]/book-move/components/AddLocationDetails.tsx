/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { LocationDetailsForm } from "./LocationDetailsForm";
import { CreateMoveRequest, Place, ProvinceProvider } from "@/services";
import { message, notification } from "antd";
import { BookFormContainer } from "./BookFormContainer";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { AppTranslator, Locale } from "@/app/utils";

export function AddLocationDetails({
  onNext,
  onPrev,
  moveFrom,
  moveSize,
  moveTo,
  setMoveFrom,
  handleUpdate,
  setMoveTo,
  setMoveSize,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  moveFrom: Place | null;
  moveTo: Place | null;
  setMoveFrom: (value: Place) => void;
  setMoveTo: (value: Place) => void;
  moveSize: string;
  setMoveSize: (value: string) => void;
  handleUpdate: (value: Partial<CreateMoveRequest>) => void;
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [provinces, setProvinceOptions] = useState<
    { provinceId: number; provinceName: string }[]
  >([
    { provinceId: 1, provinceName: "Drenthe" },
    {
      provinceId: 2,
      provinceName: "Flevoland",
    },
    {
      provinceId: 3,
      provinceName: "Friesland (Fryslân)",
    },
    {
      provinceId: 4,
      provinceName: "Gelderland",
    },
    {
      provinceId: 5,
      provinceName: "Groningen",
    },
    {
      provinceId: 6,
      provinceName: "Limburg",
    },
    {
      provinceId: 7,
      provinceName: "Noord-Brabant",
    },
    {
      provinceId: 8,
      provinceName: "Noord-Holland",
    },
    {
      provinceId: 9,
      provinceName: "Overijssel",
    },
    {
      provinceId: 10,
      provinceName: "Utrecht",
    },
    {
      provinceId: 11,
      provinceName: "Zeeland",
    },
    {
      provinceId: 12,
      provinceName: "Zuid-Holland",
    },
  ]);

  const getProvinces = useCallback(async () => {
    try {
      const res = await ProvinceProvider.getProvinces();
      if (res.result.length) {
        setProvinceOptions(res.result);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const provincesText = useMemo(
    () => provinces.map((item) => item.provinceName),
    [provinces],
  );

  useEffect(() => {
    getProvinces();
  }, [getProvinces]);

  const handleSubmit = () => {
    if (!moveFrom) {
      message.error(
        AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Please select move from location",
            nl: "Selecteer alstublieft de verhuislocatie (van)",
          },
        }),
      );
      return;
    }

    if (!moveTo) {
      message.error(
        AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Please select move to location",
            nl: "Selecteer alstublieft de verhuislocatie (naar)",
          },
        }),
      );
      return;
    }

    const provinceAddrComp = moveFrom.addressComponents?.find((item)=>item.types.includes("administrative_area_level_1"))

    if(!provinceAddrComp){
      notificationApi.error({
        title: AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Invalid Address",
            nl: "Ongeldig adres",
          },
        }),
        description: AppTranslator.getLocaleText({
          locale,
          translations: {
            en: `Please provide your Move From address that includes one of these provinces ${provincesText.join(", ")}`,
            nl: `Geef een 'Verhuis van' adres op dat een van deze provincies bevat: ${provincesText.join(", ")}`,
          },
        }),
      });
      return;
    }

    const matchingProvince = provinces.find((province) => {
      return province.provinceName
        .toLowerCase()
        .includes(provinceAddrComp?.longText?.toLowerCase());
    });

    if (!matchingProvince) {
      notificationApi.error({
        title: AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Invalid Address",
            nl: "Ongeldig adres",
          },
        }),
        description: AppTranslator.getLocaleText({
          locale,
          translations: {
            en: `Please provide your Move From address that includes one of these provinces ${provincesText.join(", ")}`,
            nl: `Geef een 'Verhuis van' adres op dat een van deze provincies bevat: ${provincesText.join(", ")}`,
          },
        }),
      });
      return;
    }

    handleUpdate({ provinceId: matchingProvince.provinceId.toString() });
    onNext?.();
  };

  return (
    <>
      {contextHolder}
      <BookFormContainer
        canContinue={Boolean(moveFrom && moveTo && moveSize)}
        currentStep={1}
        onPrev={onPrev}
        onNext={handleSubmit}
      >
        <LocationDetailsForm
          moveFrom={moveFrom}
          moveSize={moveSize}
          moveTo={moveTo}
          setMoveFrom={setMoveFrom}
          setMoveTo={setMoveTo}
          setMoveSize={setMoveSize}
        />
      </BookFormContainer>
    </>
  );
}
