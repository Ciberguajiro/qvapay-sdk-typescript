export interface AuthServiceInterface {
  login_user(props: LoginUserProps): string;
  login_merchant(props: LoginMerchantProps): string;
  register(props: RegisterUserProps): string;
  register_confirmation(props: RegisterConfirmationProps): string;
  check_auth(): string;
  logout(): string;
  request_pin(props: RequestPinProps): string;
}

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
