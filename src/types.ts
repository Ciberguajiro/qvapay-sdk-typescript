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
