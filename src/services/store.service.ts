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

/**
 * Mapper para tarjetas de regalo (Gift Cards).
 */
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

/**
 * Mapper para paquetes de telefonía.
 */
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

/**
 * Mapper para el resultado de la compra de un paquete de telefonía.
 */
function mapBuyPhonePackageResult(raw: RawBuyPhonePackageResult): BuyPhonePackageResult {
  return {
    message: raw.message,
    transactionUuid: raw.transaction_uuid,
    buyedService: raw.buyedService,
  };
}

/**
 * Servicio para gestionar compras en la tienda de QvaPay.
 */
export class StoreService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Obtiene la lista de todas las tarjetas de regalo disponibles.
   */
  async getGiftCards(): Promise<GiftCard[]> {
    const { data } = await this.http.get<RawGiftCard[]>("/store/gift_cards");
    return data.map(mapGiftCard);
  }

  /**
   * Obtiene los detalles de una tarjeta de regalo específica.
   */
  async getGiftCard(uuid: string): Promise<GiftCard> {
    if (!uuid?.trim()) {
      throw new QvaPayValidationError("El UUID es requerido", "uuid");
    }
    const { data } = await this.http.get<RawGiftCard>(`/store/gift_cards/${uuid}`);
    return mapGiftCard(data);
  }

  /**
   * Compra una tarjeta de regalo.
   */
  async buyGiftCard(uuid: string, params: BuyGiftCardParams): Promise<{ message: string; data: string }> {
    if (!uuid?.trim()) {
      throw new QvaPayValidationError("El UUID es requerido", "uuid");
    }
    if (params.amount <= 0) {
      throw new QvaPayValidationError("El monto debe ser mayor a 0", "amount");
    }
    const { data } = await this.http.post<{ message: string; data: string }>(
      `/store/gift_cards/${uuid}/buy`,
      { code: params.code, amount: params.amount }
    );
    return data;
  }

  /**
   * Obtiene la lista de paquetes de telefonía (recargas) disponibles.
   */
  async getPhonePackages(): Promise<PhonePackage[]> {
    const { data } = await this.http.get<{ phone_packages: RawPhonePackage[] }>("/store/phone_packages");
    return data.phone_packages.map(mapPhonePackage);
  }

  /**
   * Compra un paquete de telefonía para un número específico.
   */
  async buyPhonePackage(params: BuyPhonePackageParams): Promise<BuyPhonePackageResult> {
    if (!params.phoneNumber?.trim()) {
      throw new QvaPayValidationError("El número de teléfono es requerido", "phoneNumber");
    }
    if (!params.phonePackageId) {
      throw new QvaPayValidationError("El ID del paquete es requerido", "phonePackageId");
    }
    const { data } = await this.http.post<RawBuyPhonePackageResult>("/store/phone_packages/buy", {
      phone_package_id: params.phonePackageId,
      phone_number: params.phoneNumber,
    });
    return mapBuyPhonePackageResult(data);
  }
}
