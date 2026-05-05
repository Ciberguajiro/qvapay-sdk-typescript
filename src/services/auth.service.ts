import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type {
  AuthResponse,
  LoginParams,
  RawAuthResponse,
  RawUser,
  RegisterParams,
  User,
} from "../types.ts";

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

export class AuthService {
  constructor(
    private readonly plainHttp: AxiosInstance,
    private readonly userHttp: AxiosInstance,
    private readonly onLogin: (token: string) => void
  ) {}

  async login(params: LoginParams): Promise<AuthResponse> {
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("email is required", "email");
    }
    if (!params.password) {
      throw new QvaPayValidationError("password is required", "password");
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
      throw new QvaPayValidationError("name is required", "name");
    }
    if (!params.email?.trim()) {
      throw new QvaPayValidationError("email is required", "email");
    }
    if (!params.password) {
      throw new QvaPayValidationError("password is required", "password");
    }
    if (!params.passwordConfirmation) {
      throw new QvaPayValidationError(
        "passwordConfirmation is required",
        "passwordConfirmation"
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
}
