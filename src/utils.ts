import axios from "axios";
import type { AxiosInstance } from "axios";
import type { QvaPayConfig } from "./types.ts";
import { QvaPayApiError, QvaPayAuthError, QvaPayNetworkError } from "./errors.ts";

const DEFAULT_BASE_URL = "https://qvapay.com/api/v1";
const DEFAULT_TIMEOUT = 10_000;

function attachErrorInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (res) => res,
    (error: unknown) => {
      if (!axios.isAxiosError(error)) throw error;

      if (!error.response) {
        throw new QvaPayNetworkError(
          error.message || "Network error — no response received"
        );
      }

      const { status, data } = error.response as {
        status: number;
        data: Record<string, string> | undefined;
      };
      const apiMessage: string = data?.message ?? data?.error ?? "API error";

      if (status === 401 || status === 403) {
        throw new QvaPayAuthError(apiMessage, status);
      }

      throw new QvaPayApiError(apiMessage, status, data?.status_message);
    }
  );
}

/** Axios instance that injects app_id + app_secret on every request. */
export function createHttpClient(config: QvaPayConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseUrl ?? DEFAULT_BASE_URL,
    timeout: config.timeout ?? DEFAULT_TIMEOUT,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  instance.interceptors.request.use((req) => {
    req.params = { app_id: config.appId, app_secret: config.appSecret, ...req.params };
    return req;
  });

  attachErrorInterceptor(instance);
  return instance;
}

/** Axios instance with no auth injection — used for public auth endpoints. */
export function createPlainHttpClient(
  config: Pick<QvaPayConfig, "baseUrl" | "timeout">
): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseUrl ?? DEFAULT_BASE_URL,
    timeout: config.timeout ?? DEFAULT_TIMEOUT,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  attachErrorInterceptor(instance);
  return instance;
}

/** Axios instance that injects a Bearer token dynamically on every request. */
export function createUserHttpClient(
  config: Pick<QvaPayConfig, "baseUrl" | "timeout">,
  getToken: () => string | null
): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseUrl ?? DEFAULT_BASE_URL,
    timeout: config.timeout ?? DEFAULT_TIMEOUT,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  instance.interceptors.request.use((req) => {
    const token = getToken();
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  attachErrorInterceptor(instance);
  return instance;
}

/** Generic paginated response mapper. */
export function mapPaginated<Raw, Out>(
  raw: { current_page: number; data: Raw[]; last_page: number; per_page: number; total: number },
  mapItem: (item: Raw) => Out
): { currentPage: number; data: Out[]; lastPage: number; perPage: number; total: number } {
  return {
    currentPage: raw.current_page,
    data: raw.data.map(mapItem),
    lastPage: raw.last_page,
    perPage: raw.per_page,
    total: raw.total,
  };
}
