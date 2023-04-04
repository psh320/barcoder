export type Item = {
  barcodeNumber: string;
  brandName: string;
  id: number;
  itemImage: string;
  itemName: string;
  itemPrice: string;
  marketUrl: string;
  scanCount: number;
};

export type ScannedItem = {
  barcodeNumber: string;
  brandName: string;
  createAt: string;
  itemId: number;
  itemImage: string;
  itemName: string;
  itemPrice: string;
  marketUrl: string;
  scanCount: number;
  updateAt: string;
  userId: number;
};
