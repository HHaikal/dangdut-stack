import { GuestApi } from "../api/guest";
import type { Either } from "../core/either";
import { left, right } from "../core/either";
import type {
    ISignin,
    ISigninError,
    ISigninResult,
    ISigninErrorRaw,
    ISigninResultRaw,
} from "../dto/signin";

export class AuthService extends GuestApi {
    async signin(
        payload: ISignin,
    ): Promise<Either<ISigninError, ISigninResult>> {
        const result = await this.post<ISigninErrorRaw, ISigninResultRaw>({
            url: "/signin",
            payload: payload,
        });

        if (result.isLeft()) {
            let isCredentialsError = false;
            let isJustError = false;

            const { error_type } = result.value;

            if (error_type === "CREDENTIALS") {
                isCredentialsError = true;
            } else {
                isJustError = true;
            }

            return left({
                isCredentialsError,
                isJustError,
            });
        } else {
            const { access_token, refresh_token } = result.value;

            return right({
                accessToken: access_token,
                refreshToken: refresh_token,
            });
        }
    }
}
