import type { AuthServiceInterface, LoginMerchantProps, LoginUserProps, RegisterConfirmationProps, RegisterUserProps, RequestPinProps } from "../types/auth.interfaces";


class AuthService implements AuthServiceInterface {
    login_user(props: LoginUserProps): string {
        throw new Error("Method not implemented.");
    }
    login_merchant(props: LoginMerchantProps): string {
        throw new Error("Method not implemented.");
    }
    register(props: RegisterUserProps): string {
        throw new Error("Method not implemented.");
    }
    register_confirmation(props: RegisterConfirmationProps): string {
        throw new Error("Method not implemented.");
    }
    check_auth(): string {
        throw new Error("Method not implemented.");
    }
    logout(): string {
        throw new Error("Method not implemented.");
    }
    request_pin(props: RequestPinProps): string {
        throw new Error("Method not implemented.");
    }

}