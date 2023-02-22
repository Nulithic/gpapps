export interface WalmartTracker {
  "PO Date": string;
  PO: number;
  MABD: string;
  "PO Type": string;
  "PO Event Code": string;
  "DC Number": number;
  BOL: string;
  "Carrier Reference": number;
  "Carrier SCAC": string;
  "Ship Date": string;
  "Load Destination": number;
  "Invoice Date": string;
  SO: number;
  "Carton Count": number;
  "Actual Weight": number;
  Height: number;
  Width: number;
  Length: number;
  "Floor or Pallet": string;
  Class: number;
  NMFC: string;
}

export interface HTMLOrder {
  PONumber: string;
  BasePONumber: string;
  Purpose: string;
  OrderType: string;
  Currency: string;
  VendorNumber: string;
  MerchandiseType: string;
  Department: string;
  Division: string;
  DoNotDeliverAfterDate: string;
  PurchaseOrderDate: string;
  ShipNoLaterDate: string;
  ShipNotBeforeDate: string;
  FOB: string;
  FOBPoint: string;
  FOBLocation: string;
  RoutingSequence: string;
  Carrier: string;
  TermsType: string;
  TermsBasisDate: string;
  TermsDiscountPercent: string;
  TermsDiscountDays: string;
  TermsNetDays: string;
  TermsDescription: string;
  BillToLocationID: string;
  BillToLocationName: string;
  BillToLocationStreet: string;
  BillToLocationCity: string;
  BillToLocationCountry: string;
  ShipToLocationID: string;
  ShipToLocationName: string;
  ShipToLocationStreet: string;
  ShipToLocationCity: string;
  ShipToLocationCountry: string;
  SoldToID: string;
  AllowancesAndCharges: HTMLOrderAllowancesAndCharges[];
  Items: HTMLItems[];
}
export interface HTMLOrderAllowancesAndCharges {
  Type: string;
  Code: string;
  Description: string;
  Percent: string;
  Amount: string;
  UnitOfMesure: string;
  Quantity: string;
  Rate: string;
}
export interface HTMLItems {
  LineNumber: string;
  VendorNumber: string;
  UPCNumber: string;
  BuyerNumber: string;
  Quantity: string;
  UnitOfMesure: string;
  UnitPrice: string;
  CasePack: string;
  RequestDate: string;
  ExtendedPrice: string;
  Description: string;
  Color: string;
  Size: string;
  RetailPrice: string;
  RetailType: string;
}
