import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors";
import type {
  AuthResponse,
  LoginParams,
  RawAuthResponse,
  RawUser,
  RegisterConfirmationParams,
  RegisterParams, AuthSessionResponse,
  User,
} from "../types";

/**
 * Servicio para gestionar la autenticación de usuarios.
 *
 * Este servicio permite el flujo completo de identidad: login, registro,
 * confirmación y gestión de sesiones.
 */
export class AuthService {
  constructor(
    private readonly plainHttp: AxiosInstance,
    private readonly userHttp: AxiosInstance,
    private readonly onLogin: (token: string) => void,
  ) {}

  /**
   * Inicia sesión con correo y contraseña.
   *
   * @param params - Credenciales del usuario.
   * @returns Datos de autenticación y perfil del usuario.
   * @throws {QvaPayValidationError} Si faltan campos requeridos.
   */
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

  /**
   * Registra un nuevo usuario en QvaPay.
   *
   * @param params - Datos del nuevo usuario.
   * @returns Datos de autenticación.
   * @throws {QvaPayValidationError} Si faltan campos requeridos.
   */
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

  /**
   * Cierra la sesión del usuario actual.
   */
  async logout(): Promise<void> {
    await this.userHttp.get("/logout");
  }

  /**
   * Confirma el registro de un usuario mediante un PIN enviado por correo.
   *
   * @param params - Datos de confirmación.
   * @returns El perfil del usuario confirmado.
   * @throws {QvaPayValidationError} Si faltan campos requeridos.
   */
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

  /**
   * Verifica si el token actual es válido.
   */
  async checkAuth(): Promise<boolean> {
    const { data } = await this.userHttp.get<{ success: string }>(
      "/check_auth",
    );
    return !!data.success;
  }

  /**
   * Solicita un nuevo PIN de seguridad para la cuenta.
   */
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

  /**
   * Obtiene la lista de sesiones activas del usuario.
   */
  async getSessions(): Promise<AuthSessionResponse> {
    const { data } = await this.userHttp.get("/auth/sessions");
    return data;
  }

  /**
   * Elimina una sesión específica por su ID.
   *
   * @param id - El identificador de la sesión.
   * @returns Mensaje de confirmación.
   */
  async deleteSession(id: string): Promise<string> {
    const { data } = await this.userHttp.delete<{ message: string }>(
      `/auth/sessions/${id}`,
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
