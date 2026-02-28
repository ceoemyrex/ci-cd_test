
export interface MoveItem {
  room: string;
  itemName: string;
  numberOfItems: number;
}

export interface CreateMoveRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  provinceId: number;

  pickUpAddress: string;
  pickUpAddressNumber: string;
  dropOffAddress: string;
  dropOffAddressNumber: string;

  pickUpLongitude: string;
  pickUpLatitude: string;
  dropOffLongitude: string;
  dropOffLatitude: string;

  moveDate: string;     // ISO date string
  pickUpTime: string;   // ISO date string

  fromNumberOfFloors: number;
  toNumberOfFloors: number;

  fromLongCarry: string;
  toLongCarry: string;

  fromRemark: string;
  toRemark: string;

  fromHasElevator: boolean;
  toHasElevator: boolean;

  fromNeedShuttle: boolean;
  toNeedShuttle: boolean;

  fromHasBuildingInsurance: boolean;
  toHasBuildingInsurance: boolean;

  fromNeedHelpPacking: boolean;
  toNeedHelpPacking: boolean;

  items: MoveItem[];
}