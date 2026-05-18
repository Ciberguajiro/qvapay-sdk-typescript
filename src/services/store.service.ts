import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors";
import type {
  BuyPhonePackageParams,
  BuyPhonePackageResult,
  LatamTopupCatalogCountries,
  LatamTopupCatalogOffers,
  LatamTopupCatalogOperators,
  LatamTopupParams,
  LatamTopupPurchaseParams,
  LatamTopupPurchaseResult,
  LatamTopupResult,
  PhonePackage,
  PhonePackageDetail,
  PurchaseVoucherParams,
  PurchaseVoucherResult,
  RawBuyPhonePackageResult,
  RawPhonePackage,
  VoucherCatalogBrands,
  VoucherCatalogCountries,
  VoucherCatalogFeatured,
  VoucherCatalogOffers,
} from "../types";

function mapPhonePackage(raw: RawPhonePackage): PhonePackage {
  return {
    id: raw.id,
    name: raw.name,
    logo: raw.logo,
    details: raw.details.map(
      (d): PhonePackageDetail => ({ label: d.label, value: d.value }),
    ),
    price: raw.price,
    goldPrice: raw.gold_price,
    external: raw.external,
    externalAmount: raw.external_amount,
    period: raw.period,
  };
}

function mapBuyPhonePackageResult(
  raw: RawBuyPhonePackageResult,
): BuyPhonePackageResult {
  return {
    message: raw.message,
    transactionUuid: raw.transaction_uuid,
    buyedService: raw.buyedService,
  };
}

function mapLatamTopupPurchaseResult(raw: {
  message: string;
  transaction_uuid: string;
  buyedService_id: string;
}): LatamTopupPurchaseResult {
  return {
    message: raw.message,
    transaction_uuid: raw.transaction_uuid,
    buyedService_id: raw.buyedService_id,
  };
}

export class StoreService {
  constructor(private readonly http: AxiosInstance) {}

  async getPhonePackages(): Promise<PhonePackage[]> {
    const { data } = await this.http.get<{ phone_packages: RawPhonePackage[] }>(
      "/store/phone_package",
    );
    return data.phone_packages.map(mapPhonePackage);
  }

  async buyPhonePackage(
    params: BuyPhonePackageParams,
  ): Promise<BuyPhonePackageResult> {
    if (!params.phoneNumber?.trim()) {
      throw new QvaPayValidationError(
        "El número de teléfono es requerido",
        "phoneNumber",
      );
    }
    if (!params.phonePackageId) {
      throw new QvaPayValidationError(
        "El ID del paquete es requerido",
        "phonePackageId",
      );
    }
    const { data } = await this.http.post<RawBuyPhonePackageResult>(
      "/store/phone_package",
      {
        phone_package_id: params.phonePackageId,
        phone_number: params.phoneNumber,
      },
    );
    return mapBuyPhonePackageResult(data);
  }

  // ─── Voucher Catalog ───────────────────────────────────────────────────

  async getVoucherFeatured(): Promise<VoucherCatalogFeatured> {
    const { data } = await this.http.get<VoucherCatalogFeatured>(
      "/store/voucher-catalog",
      { params: { featured: true } },
    );
    return data;
  }

  async getVoucherCountries(): Promise<VoucherCatalogCountries> {
    const { data } = await this.http.get<VoucherCatalogCountries>(
      "/store/voucher-catalog",
      { params: { countries: true } },
    );
    return data;
  }

  async getVoucherBrands(
    country: string,
    query?: string,
  ): Promise<VoucherCatalogBrands> {
    if (!country?.trim()) {
      throw new QvaPayValidationError("El código de país es requerido", "country");
    }
    const { data } = await this.http.get<VoucherCatalogBrands>(
      "/store/voucher-catalog",
      { params: { country, ...(query && { q: query }) } },
    );
    return data;
  }

  async getVoucherOffers(
    country: string,
    brand: string,
  ): Promise<VoucherCatalogOffers> {
    if (!country?.trim()) {
      throw new QvaPayValidationError("El código de país es requerido", "country");
    }
    if (!brand?.trim()) {
      throw new QvaPayValidationError("El nombre de la marca es requerido", "brand");
    }
    const { data } = await this.http.get<VoucherCatalogOffers>(
      "/store/voucher-catalog",
      { params: { country, brand } },
    );
    return data;
  }

  async purchaseVoucher(
    params: PurchaseVoucherParams,
  ): Promise<PurchaseVoucherResult> {
    if (!params.offer_id?.trim()) {
      throw new QvaPayValidationError("El offer_id es requerido", "offer_id");
    }
    if (!params.country?.trim()) {
      throw new QvaPayValidationError("El país es requerido", "country");
    }
    if (!params.brand?.trim()) {
      throw new QvaPayValidationError("La marca es requerida", "brand");
    }
    const { data } = await this.http.post<PurchaseVoucherResult>(
      "/store/voucher/purchase",
      params,
    );
    return data;
  }

  // ─── LATAM Topup Catalog ───────────────────────────────────────────────

  async getLatamTopupCountries(): Promise<LatamTopupCatalogCountries> {
    const { data } = await this.http.get<LatamTopupCatalogCountries>(
      "/store/topup-catalog",
      { params: { countries: true } },
    );
    return data;
  }

  async getLatamTopupOperators(
    country: string,
  ): Promise<LatamTopupCatalogOperators> {
    if (!country?.trim()) {
      throw new QvaPayValidationError("El código de país es requerido", "country");
    }
    const { data } = await this.http.get<LatamTopupCatalogOperators>(
      "/store/topup-catalog",
      { params: { country } },
    );
    return data;
  }

  async getLatamTopupOffers(
    country: string,
    brand: string,
  ): Promise<LatamTopupCatalogOffers> {
    if (!country?.trim()) {
      throw new QvaPayValidationError("El código de país es requerido", "country");
    }
    if (!brand?.trim()) {
      throw new QvaPayValidationError("El nombre del operador es requerido", "brand");
    }
    const { data } = await this.http.get<LatamTopupCatalogOffers>(
      "/store/topup-catalog",
      { params: { country, brand } },
    );
    return data;
  }

  async getLatamTopup(params: LatamTopupParams): Promise<LatamTopupResult> {
    if (!params.country?.trim()) {
      throw new QvaPayValidationError("El país es requerido", "country");
    }
    const { data } = await this.http.get<LatamTopupResult>("/store/topup", {
      params: {
        country: params.country,
        ...(params.brand && { brand: params.brand }),
      },
    });
    return data;
  }

  async purchaseLatamTopup(
    params: LatamTopupPurchaseParams,
  ): Promise<LatamTopupPurchaseResult> {
    if (!params.offer_id?.trim()) {
      throw new QvaPayValidationError("El offer_id es requerido", "offer_id");
    }
    if (!params.phone_number?.trim()) {
      throw new QvaPayValidationError(
        "El número de teléfono es requerido",
        "phone_number",
      );
    }
    if (!params.country?.trim()) {
      throw new QvaPayValidationError("El país es requerido", "country");
    }
    const { data } = await this.http.post<{
      message: string;
      transaction_uuid: string;
      buyedService_id: string;
    }>("/store/topup", params);
    return mapLatamTopupPurchaseResult(data);
  }
}
