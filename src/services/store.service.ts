import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type {
  BuyGiftCardParams,
  BuyPhonePackageParams,
  BuyPhonePackageResult,
  GiftCard,
  PhonePackage,
  RawBuyPhonePackageResult,
  RawGiftCard,
  RawPhonePackage,
} from "../types.ts";

function mapGiftCard(raw: RawGiftCard): GiftCard {
  return {
    id: raw.id,
    uuid: raw.uuid,
    slug: raw.slug,
    name: raw.name,
    lead: raw.lead,
    color: raw.color,
    tax: raw.tax,
    taxGold: raw.tax_gold,
    logo: raw.logo,
    sublogo: raw.sublogo,
    desc: raw.desc,
    meta: raw.meta,
    featured: raw.featured,
    category: raw.category,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function mapPhonePackage(raw: RawPhonePackage): PhonePackage {
  return {
    id: raw.id,
    name: raw.name,
    logo: raw.logo,
    details: raw.details,
    price: raw.price,
    goldPrice: raw.gold_price,
    external: raw.external,
    externalAmount: raw.external_amount,
    period: raw.period,
  };
}

function mapBuyPhonePackageResult(raw: RawBuyPhonePackageResult): BuyPhonePackageResult {
  return {
    message: raw.message,
    transactionUuid: raw.transaction_uuid,
    buyedService: raw.buyedService,
  };
}

export class StoreService {
  constructor(private readonly http: AxiosInstance) {}

  async getGiftCards(): Promise<GiftCard[]> {
    const { data } = await this.http.get<RawGiftCard[]>("/store/gift_cards");
    return data.map(mapGiftCard);
  }

  async getGiftCard(uuid: string): Promise<GiftCard> {
    if (!uuid?.trim()) {
      throw new QvaPayValidationError("uuid is required", "uuid");
    }
    const { data } = await this.http.get<RawGiftCard>(`/store/gift_cards/${uuid}`);
    return mapGiftCard(data);
  }

  async buyGiftCard(uuid: string, params: BuyGiftCardParams): Promise<{ message: string; data: string }> {
    if (!uuid?.trim()) {
      throw new QvaPayValidationError("uuid is required", "uuid");
    }
    if (params.amount <= 0) {
      throw new QvaPayValidationError("amount must be greater than 0", "amount");
    }
    const { data } = await this.http.post<{ message: string; data: string }>(
      `/store/gift_cards/${uuid}/buy`,
      { code: params.code, amount: params.amount }
    );
    return data;
  }

  async getPhonePackages(): Promise<PhonePackage[]> {
    const { data } = await this.http.get<{ phone_packages: RawPhonePackage[] }>("/store/phone_packages");
    return data.phone_packages.map(mapPhonePackage);
  }

  async buyPhonePackage(params: BuyPhonePackageParams): Promise<BuyPhonePackageResult> {
    if (!params.phoneNumber?.trim()) {
      throw new QvaPayValidationError("phoneNumber is required", "phoneNumber");
    }
    if (!params.phonePackageId) {
      throw new QvaPayValidationError("phonePackageId is required", "phonePackageId");
    }
    const { data } = await this.http.post<RawBuyPhonePackageResult>("/store/phone_packages/buy", {
      phone_package_id: params.phonePackageId,
      phone_number: params.phoneNumber,
    });
    return mapBuyPhonePackageResult(data);
  }
}
