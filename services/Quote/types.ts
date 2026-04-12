export interface MoveItemCountResponseModel {
  roomName: string | null;
  count: number;
  items: string[] | null;
}

export interface MoveDetailsResponseModel {
  fullName: string | null;
  email: string | null;
  phoneNumber: string | null;
  moveDate: string | null;
  moveDay: string | null;
  status: string | null;
  moveTime: string | null;
  houseSize: string | null;
  numberOfRooms: number | null;
  from: string | null;
  to: string | null;
  amount: number | null;
  pickUpLongitude: string | null;
  pickUpLatitude: string | null;
  dropOffLongitude: string | null;
  dropOffLatitude: string | null;
  moveItemsDetails: MoveItemCountResponseModel[] | null;
}

export interface QuoteSummaryResponseModel {
  quoteId: number;
  companyName: string | null;
  proposedTime: string | null;
  companyEmail: string | null;
  additionalInformation: string | null;
  amount: number;
  image: string | null;
  moveDetails: MoveDetailsResponseModel | null;
}
