import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors";
import type {
  AuthResponse,
  LoginParams,
  RawAuthResponse,
  RawUser,
  RegisterConfirmationParams,
  RegisterParams,
  AuthSessionResponse,
  User,
  Create2faResult,
  Check2faParams,
  Reset2faParams,
  ConfirmReset2faParams,
  RequestResetPasswordParams,
  ConfirmResetPasswordParams,
} from "../types";

export class AuthService {
  constructor(
    private readonly plainHttp: AxiosInstance,
    private readonly userHttp: AxiosInstance,
    private readonly onLogin: (token: string) => void,
  ) {}

  async login(params: LoginParams): Promise<AuthResponse> {
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    if (!params.password) {
      throw new QvaPayValidationError("La contraseña es requerida", "password");
    }
    const { data } = await this.plainHttp.post<RawAuthResponse>("/login", {
      email: params.email,
      password: params.password,
    });
    const result = mapAuthResponse(data);
    this.onLogin(result.token);
    return result;
  }

  async register(params: RegisterParams): Promise<AuthResponse> {
    if (!params.name?.trim()) {
      throw new QvaPayValidationError("El nombre es requerido", "name");
    }
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    if (!params.password) {
      throw new QvaPayValidationError("La contraseña es requerida", "password");
    }
    if (!params.passwordConfirmation) {
      throw new QvaPayValidationError(
        "La confirmación de la contraseña es requerida",
        "passwordConfirmation",
      );
    }
    const { data } = await this.plainHttp.post<RawAuthResponse>("/register", {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.passwordConfirmation,
      ...(params.username !== undefined && { username: params.username }),
      ...(params.phone !== undefined && { phone: params.phone }),
    });
    const result = mapAuthResponse(data);
    this.onLogin(result.token);
    return result;
  }

  async logout(): Promise<void> {
    await this.userHttp.get("/logout");
  }

  async logoutAll(): Promise<string> {
    const { data } = await this.userHttp.delete<{ message: string }>("/logout");
    return data.message;
  }

  async registerConfirmation(
    params: RegisterConfirmationParams,
  ): Promise<User> {
    if (!params.uuid?.trim()) {
      throw new QvaPayValidationError("El UUID es requerido", "uuid");
    }
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    if (!params.pin?.trim()) {
      throw new QvaPayValidationError("El PIN es requerido", "pin");
    }
    const { data } = await this.plainHttp.post<{
      message: string;
      user: RawUser;
    }>("/register/confirmation", {
      uuid: params.uuid,
      email: params.email,
      pin: params.pin,
    });
    return mapUser(data.user);
  }

  async checkAuth(): Promise<boolean> {
    const { data } = await this.userHttp.get<{ success: string }>(
      "/check_auth",
    );
    return !!data.success;
  }

  async requestPin(params: LoginParams): Promise<string> {
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    if (!params.password) {
      throw new QvaPayValidationError("La contraseña es requerida", "password");
    }
    const { data } = await this.plainHttp.post<{ message: string }>(
      "/request_pin",
      {
        email: params.email,
        password: params.password,
      },
    );
    return data.message;
  }

  async getSessions(): Promise<AuthSessionResponse> {
    const { data } = await this.userHttp.get("/auth/sessions");
    return data;
  }

  async deleteSession(id: string): Promise<string> {
    const { data } = await this.userHttp.delete<{ message: string }>(
      `/auth/sessions/${id}`,
    );
    return data.message;
  }

  async create2fa(): Promise<Create2faResult> {
    const { data } = await this.userHttp.post<Create2faResult>("/auth/create-2fa");
    return data;
  }

  async check2fa(params: Check2faParams): Promise<string> {
    if (!params.two_factor_code?.trim()) {
      throw new QvaPayValidationError("El código 2FA es requerido", "two_factor_code");
    }
    const { data } = await this.userHttp.post<{ message: string }>(
      "/auth/check-2fa",
      { two_factor_code: params.two_factor_code },
    );
    return data.message;
  }

  async reset2fa(params: Reset2faParams): Promise<string> {
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    const { data } = await this.plainHttp.post<{ message: string }>(
      "/auth/reset-2fa",
      { email: params.email },
    );
    return data.message;
  }

  async confirmReset2fa(params: ConfirmReset2faParams): Promise<string> {
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    if (!params.code?.trim()) {
      throw new QvaPayValidationError("El código es requerido", "code");
    }
    const { data } = await this.plainHttp.patch<{ message: string }>(
      "/auth/reset-2fa",
      { email: params.email, code: params.code },
    );
    return data.message;
  }

  async requestResetPassword(params: RequestResetPasswordParams): Promise<string> {
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    const { data } = await this.plainHttp.post<{ message: string }>(
      "/auth/reset-password",
      { email: params.email },
    );
    return data.message;
  }

  async confirmResetPassword(params: ConfirmResetPasswordParams): Promise<string> {
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("El correo es requerido", "email");
    }
    if (!params.token?.trim()) {
      throw new QvaPayValidationError("El token es requerido", "token");
    }
    if (!params.password) {
      throw new QvaPayValidationError("La contraseña es requerida", "password");
    }
    const { data } = await this.plainHttp.patch<{ message: string }>(
      "/auth/reset-password",
      { email: params.email, token: params.token, password: params.password },
    );
    return data.message;
  }
}

function mapUser(raw: RawUser): User {
  return {
    uuid: raw.uuid,
    name: raw.name,
    username: raw.username,
    email: raw.email,
    photo: raw.photo,
    balance: raw.balance,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function mapAuthResponse(raw: RawAuthResponse): AuthResponse {
  return { token: raw.token, user: mapUser(raw.user) };
}
