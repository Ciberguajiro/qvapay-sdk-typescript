/** Base class for all SDK errors. */
export class QvaPayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QvaPayError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** Network-level failure (no response received). */
export class QvaPayNetworkError extends QvaPayError {
  constructor(message: string) {
    super(message);
    this.name = "QvaPayNetworkError";
  }
}

/** 401 / 403 — invalid or missing credentials. */
export class QvaPayAuthError extends QvaPayError {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "QvaPayAuthError";
    this.statusCode = statusCode;
  }
}

/** Any non-2xx HTTP response from the API (except auth errors). */
export class QvaPayApiError extends QvaPayError {
  readonly statusCode: number;
  readonly statusMessage: string | undefined;

  constructor(message: string, statusCode: number, statusMessage?: string) {
    super(message);
    this.name = "QvaPayApiError";
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}

/** Invalid arguments passed to an SDK method before a request is made. */
export class QvaPayValidationError extends QvaPayError {
  /** The field that failed validation, if applicable. */
  readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "QvaPayValidationError";
    this.field = field;
  }
}
