export interface StoreServiceInterface {
  get_store_products(): StoreResponse;
  get_store_gift_card(): StoreGiftCardResponse;
  buy_store_gift_card(data: StoreGiftCardRequest, uuid: string): StoreGiftCardResponse;
  get_store_phone_package(): string;
  buy_phone_package(): string;
}

export type GiftCardType = {
  id: number;
  uuid: String;
  slug: String;
  name: String;
  lead: String;
  color: String;
  tax: number;
  tax_gold: number;
  logo: String;
  sublogo: String;
  desc: String;
  meta: String;
  featured: boolean;
  category: String;
  created_at: String;
  updated_at: String;
};

export type StoreGiftCardResponse = {
  message: string;
  data: string;
};

export type StoreGiftCardRequest = {
  code: string;
  amout: number;
};

export type StoreGiftCardBuyData = {
  transaction_uuid: string;
  buyedService_id: string;
  amout: number;
  status: string;
};

/// Producto de la tienda.
export type StoreProduct = {};

/// Respuesta de la Tienda en general
export type StoreResponse = {
  message: String;
  data: StoreProduct[];
};

/// Paquete de recarga telefonica de Cuba.
export type PhonePackageProduct = {
  id: number;
  name: String;
  logo: String;
  details: String;
  price: number;
  gold_price: number;
  external: boolean;
  external_amount: number;
  period: String;
};

export type PhonePackageResponse = {
  phone_packages: PhonePackageProduct[];
};

export type BuyPhonePackageRequest = {
  phone_package_id: number;
  phone_number: String;
};

export type BuyPhonePackageResponse = {
  message: String;
  transaction_uuid: String;
  buyedService: String;
};
