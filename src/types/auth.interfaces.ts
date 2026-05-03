export interface AuthServiceInterface {
  login_user(props: LoginUserProps): LoginUserResponse;
  login_merchant(props: LoginMerchantProps): LoginUserResponse;
  register(props: RegisterUserProps): GeneralResponse;
  register_confirmation(props: RegisterConfirmationProps): RegisterConfirmationResponse;
  check_auth(): CheckAuthResponse;
  logout(): GeneralResponse;
  request_pin(props: RequestPinProps): GeneralResponse;
}

export type LoginUserResponse = {
  accessToken: string;
  token_type: string;
  me: string;
};

export type CheckAuthResponse = {
  success: string;
};

export type GeneralResponse = {
  message: string;
};

export type LoginUserProps = {
  email: string;
  password: string;
};

export type LoginMerchantProps = {
  app_id: string;
  app_key: string;
};

export type RegisterUserProps = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  invite: string;
  terms: string;
};

export type RegisterConfirmationProps = {
  uuid: string;
  email: string;
  pin: string;
};

export type RequestPinProps = {
  email: string;
  password: string;
};

export type RegisterConfirmationResponse = {
  message: string;
  user: Perfil_Type;
};

export type Perfil_Type = {
  uuid: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  two_factor_reset_code: string;
  bio: string;
  address: string;
  image: string;
  cover?: string;
  balance: string;
  pending_balance: string;
  satoshis: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
  phone_verified: string;
  telegram: string;
  twitter?: string;
  kyc: boolean;
  kyc_status: string;
  vip: boolean;
  golden_check: boolean;
  referral_source?: string;
  registration_platform?: string;
  pin: number;
  last_seen: string;
  telegram_id: string;
  role: string;
  p2p_enabled: number;
};
