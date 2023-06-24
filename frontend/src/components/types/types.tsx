export interface AuthResponse {
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}
export interface AuthResponseError {
    body: {
        error: string;
    }
}
export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
}
export interface AccessTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}