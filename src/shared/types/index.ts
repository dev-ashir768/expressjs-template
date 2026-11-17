export type SuccessApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

// export type ErrorApiResponse<T> = {
//     success: boolean;
//     message: string;
//     data: T;
//     errors?: Record<string, string[]>;
//     stack?: string;
// }