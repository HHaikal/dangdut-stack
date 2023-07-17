export type ISignin = {
    email: string;
    password: string;
};

export interface ISigninError {
    isCredentialsError: boolean;
    isJustError: boolean;
}

export type ISigninResult = {
    accessToken: string;
    refreshToken: string;
};

export type ISigninResultRaw = {
    access_token: string;
    refresh_token: string;
};

export type ISigninErrorRaw = {
    message: string;
    error_type: string;
};
