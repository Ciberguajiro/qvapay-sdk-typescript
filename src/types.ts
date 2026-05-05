// ─── Config ──────────────────────────────────────────────────────────────────

export interface QvaPayConfig {
  appId: string;
  appSecret: string;
  /** Pre-set Bearer token (e.g. from a previous login). */
  token?: string;
  /** @default "https://qvapay.com/api/v1" */
  baseUrl?: string;
  /** Request timeout in ms. @default 10000 */
  timeout?: number;
}

// ─── Domain models ───────────────────────────────────────────────────────────

export interface AppInfo {
  uuid: string;
  name: string;
  url: string;
  desc: string;
  logo: string;
  active: boolean;
  userId: number;
}

export interface User {
  uuid: string;
  name: string;
  username: string;
  email: string;
  photo: string | null;
  balance: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionStatus = "pending" | "paid" | "cancelled" | "refunded";

export interface Transaction {
  uuid: string;
  amount: string;
  currency: string;
  status: TransactionStatus;
  description: string;
  remoteId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  app: AppInfo;
}

export interface Invoice {
  uuid: string;
  amount: string;
  description: string;
  remoteId: string | null;
  signedUrl: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  currentPage: number;
  data: T[];
  lastPage: number;
  perPage: number;
  total: number;
}

// ─── Request params ──────────────────────────────────────────────────────────

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  username?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CreateInvoiceParams {
  /** Amount in USD, two decimals. Must be > 0. */
  amount: number;
  /** Max 300 characters. */
  description: string;
  /** Optional reference ID from your own system. */
  remoteId?: string;
  /** Signed URLs expire after 30 minutes. */
  signed?: boolean;
}

// ─── Raw API shapes (internal) ───────────────────────────────────────────────

export interface RawAppInfo {
  uuid: string;
  name: string;
  url: string;
  desc: string;
  logo: string;
  active: boolean;
  user_id: number;
}

export interface RawUser {
  uuid: string;
  name: string;
  username: string;
  email: string;
  photo: string | null;
  balance: string;
  created_at: string;
  updated_at: string;
}

export interface RawAuthResponse {
  token: string;
  user: RawUser;
}

export interface RawTransaction {
  uuid: string;
  amount: string;
  currency: string;
  status: TransactionStatus;
  description: string;
  remote_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  app: RawAppInfo;
}

export interface RawInvoice {
  uuid: string;
  amount: string;
  description: string;
  remote_id: string | null;
  signed_url: string | null;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface RawPaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}

// ─── Auth extras ─────────────────────────────────────────────────────────────

export interface RegisterConfirmationParams {
  uuid: string;
  email: string;
  pin: string;
}

// ─── Coins ───────────────────────────────────────────────────────────────────

export interface Coin {
  id: string;
  name: string;
  tick: string;
  logo: string;
  price: string;
  change24h: string;
}

export interface RawCoin {
  id: string;
  name: string;
  tick: string;
  logo: string;
  price: string;
  change_24h: string;
}

// ─── P2P ─────────────────────────────────────────────────────────────────────

export interface P2PUser {
  uuid: string;
  username: string;
  name: string;
  image: string;
  kyc: boolean;
  vip: boolean;
  goldenCheck: boolean;
}

export interface RawP2PUser {
  uuid: string;
  username: string;
  name: string;
  image: string;
  kyc: boolean;
  vip: boolean;
  golden_check: boolean;
}

export interface P2PCoin {
  tick: string;
  name: string;
  logo: string;
}

export interface RawP2PCoin {
  tic: string;
  name: string;
  logo: string;
}

export interface P2POffer {
  uuid: string;
  type: string;
  coin: string;
  amount: number;
  receive: number;
  status: string;
  onlyKyc: number;
  onlyVip: number;
  isPrivate: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: P2PUser;
  coinInfo: P2PCoin;
}

export interface RawP2POffer {
  uuid: string;
  type_1: string;
  coin: string;
  amount: number;
  receive: number;
  status: string;
  only_kyc: number;
  only_vip: number;
  private: number;
  message: string;
  created_at: string;
  updated_at: string;
  User: RawP2PUser;
  Coin: RawP2PCoin;
}

export interface CreateP2PParams {
  /** "buy" or "sell" */
  type: "buy" | "sell";
  /** Coin tick (e.g. "BANK_CUP") or numeric ID */
  coin: string;
  /** Amount in QUSD (0.1–100,000) */
  amount: number;
  /** Amount to receive in the selected coin (0.1–1,000,000) */
  receive: number;
  /** Payment details according to coin fields */
  details: Array<{ name: string; value: string }>;
  onlyKyc?: boolean;
  onlyVip?: boolean;
  isPrivate?: boolean;
  /** Public message (max 79 chars) */
  message?: string;
  webhook?: string;
  tags?: string[];
}

// ─── Stocks ──────────────────────────────────────────────────────────────────

export interface Stock {
  symbol: string;
  name: string;
  icon: string;
  iconStyle: string;
  image: string;
  price: string;
  change: string;
  changeDollar: string;
  volume: string;
  timestamp: string;
}

export interface RawStock {
  symbol: string;
  name: string;
  icon: string;
  icon_style: string;
  image: string;
  price: string;
  change: string;
  change_dollar: string;
  volume: string;
  timestamp: string;
}

export interface StockTrade {
  tradeUuid: string;
  transactionUuid: string;
  symbol: string;
  quantity: string;
  effectivePrice: string;
  marketPrice: string;
  spreadPercent: string;
  fee: string;
  extra: string;
}

export interface RawStockTrade {
  trade_uuid: string;
  transaction_uuid: string;
  symbol: string;
  quantity: string;
  effective_price: string;
  market_price: string;
  spread_percent: string;
  fee: string;
  extra: string;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export interface GiftCard {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  lead: string;
  color: string;
  tax: number;
  taxGold: number;
  logo: string;
  sublogo: string;
  desc: string;
  meta: string;
  featured: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawGiftCard {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  lead: string;
  color: string;
  tax: number;
  tax_gold: number;
  logo: string;
  sublogo: string;
  desc: string;
  meta: string;
  featured: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface BuyGiftCardParams {
  code: string;
  amount: number;
}

export interface PhonePackage {
  id: number;
  name: string;
  logo: string;
  details: string;
  price: number;
  goldPrice: number;
  external: boolean;
  externalAmount: number;
  period: string;
}

export interface RawPhonePackage {
  id: number;
  name: string;
  logo: string;
  details: string;
  price: number;
  gold_price: number;
  external: boolean;
  external_amount: number;
  period: string;
}

export interface BuyPhonePackageParams {
  phonePackageId: number;
  phoneNumber: string;
}

export interface BuyPhonePackageResult {
  message: string;
  transactionUuid: string;
  buyedService: string;
}

export interface RawBuyPhonePackageResult {
  message: string;
  transaction_uuid: string;
  buyedService: string;
}

// ─── Transfer ─────────────────────────────────────────────────────────────────

export interface TransferParams {
  /** Amount in USD, two decimals. Must be > 0. */
  amount: number;
  /** Recipient username or UUID */
  to: string;
  /** User PIN */
  pin: string;
  description?: string;
}

export interface TransferResult {
  success: boolean;
  message: string;
  transaction: string;
}
