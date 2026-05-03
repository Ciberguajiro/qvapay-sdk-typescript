import type { AuthServiceInterface, CheckAuthResponse, GeneralResponse, LoginMerchantProps, LoginUserProps, LoginUserResponse, RegisterConfirmationProps, RegisterConfirmationResponse, RegisterUserProps, RequestPinProps } from "../types/auth.interfaces";


class AuthService implements AuthServiceInterface {
    login_user(props: LoginUserProps): LoginUserResponse {
        throw new Error("Method not implemented.");
    }
    login_merchant(props: LoginMerchantProps): LoginUserResponse {
        throw new Error("Method not implemented.");
    }
    register(props: RegisterUserProps): GeneralResponse {
        throw new Error("Method not implemented.");
    }
    register_confirmation(props: RegisterConfirmationProps): RegisterConfirmationResponse {
        throw new Error("Method not implemented.");
    }
    check_auth(): CheckAuthResponse {
        throw new Error("Method not implemented.");
    }
    logout(): GeneralResponse {
        throw new Error("Method not implemented.");
    }
    request_pin(props: RequestPinProps): GeneralResponse {
        throw new Error("Method not implemented.");
    }

}