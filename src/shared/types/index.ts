export type SuccessResponse<T> = {
    success: boolean;
    message: string;
    data: T | null;
}

// export type ErrorApiResponse<T> = {
//     success: boolean;
//     message: string;
//     data: T;
//     errors?: Record<string, string[]>;
//     stack?: string;
// }