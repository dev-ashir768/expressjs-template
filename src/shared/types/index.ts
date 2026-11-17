type ValidationErrorItem = {
    path: string;
    message: string;
}

type SuccessResponse<T> = {
    success: boolean;
    message: string;
    data: T | null;
}

type ErrorResponse = {
    success: boolean;
    message: string;
    data: null;
    errors?: ValidationErrorItem[];
    stack?: string;
}

export type { ValidationErrorItem, SuccessResponse, ErrorResponse };