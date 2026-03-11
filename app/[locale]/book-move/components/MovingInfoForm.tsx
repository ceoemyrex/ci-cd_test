"use client";
import { ArrowDropDownIcon, LocationIcon } from "@/app/icons";
import { LocationAutocomplete } from "./LocationDetailsForm";
import {
  Place,
  // ProvinceProvider
} from "@/services";
import { CreateMoveRequest } from "@/services/MoveRequest";
import { ReactNode, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { CalendarDaysIcon, Check, LoaderCircle } from "lucide-react"; // Lucide icon
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
/* -------------------- Dropdown Component -------------------- */
export function Dropdown({
  placeholder,
  options,
  value,
  onChange,
  loading = false,
}: {
  placeholder?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  loading?: boolean;
}) {
  const [open, setOpen] = useState(false);

  // Find selected label to show in input
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-3 flex-1 relative">
      <div
        onClick={() => {
          if (loading) return;
          setOpen((prev) => !prev);
        }}
        className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center cursor-pointer"
      >
        <p className="text-dark text-xs lg:text-sm">
          {selectedOption?.label || (
              <span className="text-grey">{placeholder}</span>
            ) || <span className="text-grey"></span>}
        </p>
        <span className="ml-auto">
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <ArrowDropDownIcon />
          )}
        </span>
      </div>

      {open && (
        <div className="absolute mt-1 w-full bg-white border border-black/10 rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------- Checkbox Button -------------------- */
export function CheckboxButton({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-x-2"
    >
      <span
        className={`h-4 w-4 rounded border border-[#D9D9D9] flex items-center justify-center ${
          checked ? "bg-white" : "bg-white"
        }`}
      >
        {checked && <Check className="h-4 w-4 text-secondary" />}
      </span>
      <span>{label}</span>
    </button>
  );
}

export function MovingInfoForm({
  moveFrom,
  moveTo,
  handleUpdate,
  setMoveFrom,
  setMoveTo,
  termsAccepted,
  setTermsAccepted,
  formData,
}: {
  formData: CreateMoveRequest;
  handleUpdate: (value: Partial<CreateMoveRequest>) => void;
  moveTo: Place | null;
  moveFrom: Place | null;
  setMoveFrom: (place: Place) => void;
  setMoveTo: (place: Place) => void;
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
}) {
  const [promotionsAccepted, setPromotionsAccepted] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const { locale } = useParams<{ locale: Locale }>();

  const moveDateJS = useMemo(() => {
    if (formData.moveDate) {
      return new Date(formData.moveDate);
    }
  }, [formData.moveDate]);

  return (
    <div className="bg-white border mt-4 lg:mt-0 border-black/10 rounded-lg min-h-screen mb-18">
      <header className="flex p-4 lg:px-8 items-center justify-between">
        <p className="text-lg lg:text-2xl font-medium">
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Moving Information",
              nl: "Verhuisgegevens",
            },
          })}{" "}
          (<span className="text-grey">Few Items</span>)
        </p>
      </header>
      <div className="p-4 pb-8 lg:px-8 space-y-8">
        <div className="space-y-3 max-w-130">
          <p className="text-dark text-sm lg:text-base">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Moving Date",
                nl: "Verhuisdatum",
              },
            })}{" "}
            *
          </p>
          <div
            onClick={() => setDateOpen((p) => !p)}
            className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center"
          >
            <CalendarDaysIcon className="text-grey" />

            <p
              id="movingDate"
              className="outline-0 w-full text-left text-xs lg:text-sm"
            >
              {formData.moveDate ? (
                formData.moveDate
              ) : (
                <span className="text-grey">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "dd/mm/yyyy",
                      nl: "dd/mm/jjjj",
                    },
                  })}
                </span>
              )}
            </p>
            {/* <label htmlFor="movingDate" className="ml-auto">
            </label> */}
            <div
              className={`transition-all ease-in-out duration-500 ${dateOpen ? "rotate-180" : ""}`}
            >
              <ArrowDropDownIcon />
            </div>
          </div>
          {dateOpen && (
            <div className="border flex items-center justify-center border-black/10 p-4 rounded-lg">
              <DayPicker
                animate
                mode="single"
                selected={moveDateJS}
                onSelect={(date) => {
                  if (date) {
                    handleUpdate({
                      moveDate: DateTime.fromJSDate(date).toFormat(
                        "yyyy-MM-dd",
                      ) as string,
                    });
                    setDateOpen(false);
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className="space-y-6">
          <p className="text-secondary text-xl font-medium">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                nl: "Contactgegevens",
                en: "Contact Information",
              },
            })}
          </p>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Full Name",
                  nl: "Naam",
                },
              })}
              *
            </p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full outline-0 text-base  lg:text-sm"
                placeholder={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    nl: "Vul je volledige naam in",
                    en: "Enter your full name",
                  },
                })}
                value={formData.fullName}
                onChange={(e) => handleUpdate({ fullName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Email Address",
                  nl: "E-mailadres",
                },
              })}
              *
            </p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full text-base outline-0  lg:text-sm"
                placeholder={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    nl: "Vul je e-mailadres in ",
                    en: "Enter your email address",
                  },
                })}
                value={formData.email}
                onChange={(e) => handleUpdate({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  nl: "Telefoonnummer",
                  en: "Phone Number",
                },
              })}{" "}
              *
            </p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full text-base outline-0  lg:text-sm"
                placeholder={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Enter your phone number",
                    nl: "Vul je telefoonnummer in",
                  },
                })}
                value={formData.phoneNumber}
                onChange={(e) => handleUpdate({ phoneNumber: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 lg:p-8 space-y-8 border-t border-black/10">
        <div className="space-y-6">
          <p className="text-secondary text-base lg:text-xl font-medium">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                nl: "Ophaalgegevens",
                en: "Pickup Details",
              },
            })}
          </p>
          <div className="max-w-130">
            <LocationAutocomplete
              theme="light"
              label={`${AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "From",
                  nl: "Ophaaladres",
                },
              })}*`}
              onSelectPlace={setMoveFrom}
              locationText={moveFrom?.formattedAddress}
              placeholder={""}
              icon={<LocationIcon />}
            />
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">{`${AppTranslator.getLocaleText(
              {
                locale,
                translations: {
                  en: "Remark  (optional)",
                  nl: "Opmerkingen (optioneel)",
                },
              },
            )}`}</p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey text-base w-full outline-0  lg:text-sm"
                placeholder={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Remarks for the location ",
                    nl: "Opmerkingen over het ophaaladres ",
                  },
                })}
                value={formData.fromRemark ?? ""}
                onChange={(e) => handleUpdate({ fromRemark: e.target.value })}
              />
            </div>
          </div>
          <div className="border rounded-xl max-w-130 border-black/10">
            <header className="flex p-4 border-b border-black/10">
              <p className="font-medium text-secondary lg:text-xl">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Restrictions",
                    nl: "Bijzonderheden",
                  },
                })}
              </p>
            </header>
            <div>
              <div className="p-4 space-y-4 lg:space-y-0 lg:p-8 lg:flex gap-x-8 items-center">
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-sm lg:text-base">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: {
                        en: " Number Of Floors (optional)",
                        nl: "Aantal verdiepingen (optioneel)",
                      },
                    })}
                  </p>
                  <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                    <input
                      type="number"
                      className="placeholder:text-grey w-full text-base outline-0  lg:text-sm"
                      placeholder={AppTranslator.getLocaleText({
                        locale,
                        translations: {
                          en: "Enter Number of Floors",
                          nl: "Aantal verdiepingen ",
                        },
                      })}
                      value={formData.fromNumberOfFloors ?? ""}
                      onChange={(e) =>
                        handleUpdate({ fromNumberOfFloors: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-base lg:text-sm">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: {
                        en: "Elevator",
                        nl: "Lift aanwezig?",
                      },
                    })}
                  </p>
                  <div className="bg-[#F9FCF9]  text-base lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                    <CheckboxButton
                      label={AppTranslator.getLocaleText({
                        locale,
                        translations: {
                          en: "Yes",
                          nl: "Ja",
                        },
                      })}
                      checked={formData.fromHasElevator == true}
                      onChange={(val) => {
                        handleUpdate({
                          fromHasElevator: val,
                        });
                      }}
                    />
                    <CheckboxButton
                      label={AppTranslator.getLocaleText({
                        locale,
                        translations: {
                          en: "No",
                          nl: "Nee",
                        },
                      })}
                      checked={formData.fromHasElevator == false}
                      onChange={(val) => {
                        handleUpdate({
                          fromHasElevator: !val,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 lg:p-8 space-y-8 border-t border-black/10">
        <div className="space-y-6">
          <p className="text-secondary lg:text-xl font-medium">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Drop-off Details",
                nl: "Aflevergegevens",
              },
            })}
          </p>
          <div className="max-w-130">
            <LocationAutocomplete
              theme="light"
              label={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "From *",
                  nl: "Afleveradres*",
                },
              })}
              onSelectPlace={setMoveTo}
              locationText={moveTo?.formattedAddress}
              placeholder={""}
              icon={<LocationIcon />}
            />
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Remark (optional)",
                  nl: "Opmerkingen (optioneel)",
                },
              })}
            </p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full text-base outline-0  lg:text-sm"
                placeholder={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Remarks for the location ",
                    nl: "Opmerkingen over het ophaaladres ",
                  },
                })}
                value={formData.toRemark ?? ""}
                onChange={(e) => handleUpdate({ toRemark: e.target.value })}
              />
            </div>
          </div>
          <div className="border rounded-xl max-w-130 border-black/10">
            <header className="flex p-4 border-b border-black/10">
              <p className="font-medium text-secondary lg:text-xl">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Restrictions",
                    nl: "Bijzonderheden",
                  },
                })}
              </p>
            </header>
            <div>
              <div className="p-4 lg:p-8 space-y-4 lg:space-y-0 lg:flex gap-x-8 items-center">
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-sm lg:text-base">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: {
                        en: " Number Of Floors (optional)",
                        nl: "Aantal verdiepingen (optioneel)",
                      },
                    })}
                  </p>
                  <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                    <input
                      type="number"
                      className="placeholder:text-grey w-full text-base outline-0  lg:text-sm"
                      placeholder={AppTranslator.getLocaleText({
                        locale,
                        translations: {
                          en: "Enter Number of Floors",
                          nl: "Aantal verdiepingen ",
                        },
                      })}
                      value={formData.toNumberOfFloors ?? ""}
                      onChange={(e) =>
                        handleUpdate({ toNumberOfFloors: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-base lg:text-sm">
                    {" "}
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: {
                        en: "Elevator",
                        nl: "Lift aanwezig?",
                      },
                    })}
                  </p>
                  <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                    <CheckboxButton
                      label={AppTranslator.getLocaleText({
                        locale,
                        translations: {
                          en: "Yes",
                          nl: "Ja",
                        },
                      })}
                      checked={formData.toHasElevator == true}
                      onChange={(val) => {
                        handleUpdate({
                          toHasElevator: val,
                        });
                      }}
                    />
                    <CheckboxButton
                      label={AppTranslator.getLocaleText({
                        locale,
                        translations: {
                          en: "No",
                          nl: "Nee",
                        },
                      })}
                      checked={formData.toHasElevator == false}
                      onChange={(val) => {
                        handleUpdate({
                          toHasElevator: !val,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-130 space-y-4 lg:space-y-0 lg:grid grid-cols-3 gap-x-4">
            <div className="space-y-3 flex-1">
              <p className="text-dark text-base lg:text-sm">
                {" "}
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Moving Boxes",
                    nl: "Verhuisdozen",
                  },
                })}
              </p>
              <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <CheckboxButton
                  label={AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Yes",
                      nl: "Ja",
                    },
                  })}
                  checked={formData.toNeedShuttle == true}
                  onChange={(val) => handleUpdate({ toNeedShuttle: val })}
                />
                <CheckboxButton
                  label={AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "No",
                      nl: "Nee",
                    },
                  })}
                  checked={formData.toNeedShuttle == false}
                  onChange={(val) => handleUpdate({ toNeedShuttle: !val })}
                />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-dark text-base lg:text-sm">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Moving Insurance",
                    nl: "Verhuisverzekering",
                  },
                })}
              </p>
              <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <CheckboxButton
                  label={AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Yes",
                      nl: "Ja",
                    },
                  })}
                  checked={formData.toHasBuildingInsurance == true}
                  onChange={(val) =>
                    handleUpdate({ toHasBuildingInsurance: val })
                  }
                />
                <CheckboxButton
                  label={AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "No",
                      nl: "Nee",
                    },
                  })}
                  checked={formData.toHasBuildingInsurance == false}
                  onChange={(val) =>
                    handleUpdate({ toHasBuildingInsurance: !val })
                  }
                />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-dark text-base lg:text-sm">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Packing Assistance",
                    nl: "Inpakservice",
                  },
                })}
              </p>
              <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <CheckboxButton
                  label={AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Yes",
                      nl: "Ja",
                    },
                  })}
                  checked={formData.toNeedHelpPacking == true}
                  onChange={(val) => handleUpdate({ toNeedHelpPacking: val })}
                />
                <CheckboxButton
                  label={AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "No",
                      nl: "Nee",
                    },
                  })}
                  checked={formData.toNeedHelpPacking == false}
                  onChange={(val) => handleUpdate({ toNeedHelpPacking: !val })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t p-4 lg:p-8 space-y-6 border-black/10">
        <CheckboxButton
          checked={termsAccepted}
          onChange={setTermsAccepted}
          label={
            <a
              target="_blank"
              href={"/terms-and-conditions"}
              className="text-secondary text-xs underline lg:text-base"
            >
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Accept terms and condition *",
                  nl: "Ik ga akkoord met de algemene voorwaarden*",
                },
              })}
            </a>
          }
        />
        <CheckboxButton
          checked={promotionsAccepted}
          onChange={setPromotionsAccepted}
          label={
            <span className="text-xs lg:text-base">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Receive Promotions and moving tips",
                  nl: "Ik ontvang graag aanbiedingen en verhuistips",
                },
              })}
            </span>
          }
        />
      </footer>
    </div>
  );
}
