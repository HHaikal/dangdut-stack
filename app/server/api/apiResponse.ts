import type { Either } from "../core/either";

export interface IHttpApi {
    get<L, R>(props: any): Promise<Either<L, R>>;
    post<L, R>(props: any): Promise<Either<L, R>>;
}
