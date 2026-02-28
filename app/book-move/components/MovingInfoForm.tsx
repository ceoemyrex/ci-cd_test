"use client";
import { ArrowDropDownIcon, LocationIcon } from "@/app/icons";
import { LocationAutocomplete } from "./LocationDetailsForm";
import { Place } from "@/services";
import { CreateMoveRequest } from "@/services/MoveRequest";
import { ReactNode, useState } from "react";
import { DateTime } from "luxon";
import { Check } from "lucide-react"; // Lucide icon
/* -------------------- Dropdown Component -------------------- */
export function Dropdown({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  // Find selected label to show in input
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-3 flex-1 relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center cursor-pointer"
      >
        <p className="text-grey text-xs lg:text-sm">
          {selectedOption?.label || placeholder || "Select an option"}
        </p>
        <span className="ml-auto">
          <ArrowDropDownIcon />
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
  formData,
}: {
  formData: CreateMoveRequest;
  handleUpdate: (value: Partial<CreateMoveRequest>) => void;
  moveTo: Place | null;
  moveFrom: Place | null;
  setMoveFrom: (place: Place) => void;
  setMoveTo: (place: Place) => void;
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promotionsAccepted, setPromotionsAccepted] = useState(false);
  /**
   * Convert ISO date → datetime-local value
   */
  const isoToLocalInput = (iso?: string | null) => {
    if (!iso) return "";

    return DateTime.fromISO(iso).toLocal().toFormat("yyyy-MM-dd'T'HH:mm");
  };

  /**
   * Convert datetime-local value → ISO date
   */
  const localInputToISO = (value: string) => {
    if (!value) return "";

    return DateTime.fromFormat(value, "yyyy-MM-dd'T'HH:mm").toUTC().toISO();
  };

  return (
    <div className="bg-white border border-black/10 rounded-lg min-h-screen mb-18">
      <header className="flex p-4 px-8 items-center justify-between">
        <p className="text-2xl font-medium">
          Moving Information (<span className="text-grey">Few Items</span>)
        </p>
      </header>
      <div className="p-4 pb-8 px-8 space-y-8">
        <div className="space-y-3 max-w-130">
          <p className="text-dark text-sm lg:text-base">Moving Date *</p>
          <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
            <input
              id="movingDate"
              type="datetime-local"
              className="placeholder:text-grey outline-0 w-full text-xs lg:text-sm"
              value={isoToLocalInput(formData.moveDate)}
              onChange={(e) =>
                handleUpdate({
                  moveDate: localInputToISO(e.target.value) ?? undefined,
                })
              }
            />
            {/* <label htmlFor="movingDate" className="ml-auto">
              <ArrowDropDownIcon />
            </label> */}
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-secondary text-xl font-medium">
            Contact Information
          </p>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">Full Name *</p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full text-xs outline-0  lg:text-sm"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleUpdate({ fullName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">Email Address *</p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full text-xs outline-0  lg:text-sm"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleUpdate({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">Phone Number *</p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full text-xs outline-0  lg:text-sm"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleUpdate({ phoneNumber: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 space-y-8 border-t border-black/10">
        <div className="space-y-6">
          <p className="text-secondary text-xl font-medium">Pickup Details</p>
          <div className="max-w-130">
            <LocationAutocomplete
              theme="light"
              label={"From *"}
              selectedPlace={moveFrom}
              onSelectPlace={setMoveFrom}
              placeholder={""}
              icon={<LocationIcon />}
            />
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">Remark</p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey text-xs w-full outline-0  lg:text-sm"
                placeholder="Remarks for the location "
                value={formData.fromRemark}
                onChange={(e) => handleUpdate({ fromRemark: e.target.value })}
              />
            </div>
          </div>
          <div className="border rounded-xl max-w-130 border-black/10">
            <header className="flex p-4 border-b border-black/10">
              <p className="font-medium text-secondary text-xl">Restrictions</p>
            </header>
            <div>
              <div className="p-8 flex gap-x-8 items-center">
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-sm lg:text-base">
                    Number Of Floors *
                  </p>
                  <Dropdown
                    placeholder={"Number of floors"}
                    options={[
                      {
                        value: "1",
                        label: "1",
                      },
                      {
                        value: "2",
                        label: "2",
                      },
                    ]}
                    value={formData.fromNumberOfFloors.toString()}
                    onChange={(val) => {
                      handleUpdate({
                        fromNumberOfFloors: parseInt(val),
                      });
                    }}
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-base lg:text-sm">Elevator</p>
                  <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                    <CheckboxButton
                      label={"Yes"}
                      checked={formData.fromHasElevator}
                      onChange={(val) => {
                        handleUpdate({
                          fromHasElevator: val,
                        });
                      }}
                    />
                    <CheckboxButton
                      label={"No"}
                      checked={!formData.fromHasElevator}
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
      <div className="p-8 space-y-8 border-t border-black/10">
        <div className="space-y-6">
          <p className="text-secondary text-xl font-medium">Drop-off Details</p>
          <div className="max-w-130">
            <LocationAutocomplete
              theme="light"
              label={"From *"}
              selectedPlace={moveTo}
              onSelectPlace={setMoveTo}
              placeholder={""}
              icon={<LocationIcon />}
            />
          </div>
          <div className="space-y-3 max-w-130">
            <p className="text-dark text-sm lg:text-base">Remark</p>
            <div className="bg-[#F9FCF9] border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
              <input
                className="placeholder:text-grey w-full text-xs outline-0  lg:text-sm"
                placeholder="Remarks for the location "
                value={formData.toRemark}
                onChange={(e) => handleUpdate({ toRemark: e.target.value })}
              />
            </div>
          </div>
          <div className="border rounded-xl max-w-130 border-black/10">
            <header className="flex p-4 border-b border-black/10">
              <p className="font-medium text-secondary text-xl">Restrictions</p>
            </header>
            <div>
              <div className="p-8 flex gap-x-8 items-center">
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-sm lg:text-base">
                    Number Of Floors *
                  </p>
                  <Dropdown
                    placeholder={"Number of floors"}
                    options={[
                      {
                        value: "1",
                        label: "1",
                      },
                      {
                        value: "2",
                        label: "2",
                      },
                      {
                        value: "3",
                        label: "3",
                      },
                      {
                        value: "4",
                        label: "4",
                      },
                    ]}
                    value={formData.toNumberOfFloors.toString()}
                    onChange={(val) => {
                      handleUpdate({
                        toNumberOfFloors: parseInt(val),
                      });
                    }}
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-dark text-base lg:text-sm">Elevator</p>
                  <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                    <CheckboxButton
                      label={"Yes"}
                      checked={formData.toHasElevator}
                      onChange={(val) => {
                        handleUpdate({
                          toHasElevator: val,
                        });
                      }}
                    />
                    <CheckboxButton
                      label={"No"}
                      checked={!formData.toHasElevator}
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

          <div className="max-w-130 grid grid-cols-3 gap-x-4">
            <div className="space-y-3 flex-1">
              <p className="text-dark text-base lg:text-sm">Moving Boxes</p>
              <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <CheckboxButton
                  label={"Yes"}
                  checked={formData.toNeedShuttle}
                  onChange={(val) => handleUpdate({ toNeedShuttle: val })}
                />
                <CheckboxButton
                  label={"No"}
                  checked={!formData.toNeedShuttle}
                  onChange={(val) => handleUpdate({ toNeedShuttle: !val })}
                />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-dark text-base lg:text-sm">Moving Insurance</p>
              <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <CheckboxButton
                  label={"Yes"}
                  checked={formData.toHasBuildingInsurance}
                  onChange={(val) =>
                    handleUpdate({ toHasBuildingInsurance: val })
                  }
                />
                <CheckboxButton
                  label={"No"}
                  checked={!formData.toHasBuildingInsurance}
                  onChange={(val) =>
                    handleUpdate({ toHasBuildingInsurance: !val })
                  }
                />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-dark text-base lg:text-sm">
                Packing Assistance
              </p>
              <div className="bg-[#F9FCF9]  text-xs lg:text-sm justify-between border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <CheckboxButton
                  label={"Yes"}
                  checked={formData.toNeedHelpPacking}
                  onChange={(val) => handleUpdate({ toNeedHelpPacking: val })}
                />
                <CheckboxButton
                  label={"No"}
                  checked={!formData.toNeedHelpPacking}
                  onChange={(val) => handleUpdate({ toNeedHelpPacking: !val })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t p-8 space-y-6 border-black/10">
        <CheckboxButton
          checked={termsAccepted}
          onChange={setTermsAccepted}
          label={
            <span className="text-secondary">Accept terms and condition *</span>
          }
        />
        <CheckboxButton
          checked={promotionsAccepted}
          onChange={setPromotionsAccepted}
          label={
            <>Receive Promotions and moving tips</>
          }
        />
      </footer>
    </div>
  );
}
