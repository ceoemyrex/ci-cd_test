
export interface MoveItem {
  room: string;
  itemName: string;
  numberOfItems: number;
}

export interface TrackMove{
  fromLatitude: string,
  toLatitude: string,
  fromLongitude: string,
  toLongitude: string,
  hasArrived: false,
  inTransit: false,
  isCompleted: false
}

export interface CreateMoveRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  provinceId: string;

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

  fromNumberOfFloors: string | null;
  toNumberOfFloors: string | null;

  fromLongCarry: string;
  toLongCarry: string;

  fromRemark: string;
  toRemark: string;

  fromHasElevator: boolean | null;
  toHasElevator: boolean | null;

  fromNeedShuttle: boolean | null;
  toNeedShuttle: boolean | null;

  fromHasBuildingInsurance: boolean | null;
  toHasBuildingInsurance: boolean | null;

  fromNeedHelpPacking: boolean | null;
  toNeedHelpPacking: boolean | null;

  items: MoveItem[];
}