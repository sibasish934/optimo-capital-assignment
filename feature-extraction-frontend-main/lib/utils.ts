import { AxiosError } from 'axios';

export function getErrorMessage(error: Error): string {
    return error instanceof AxiosError
        ? error.response?.data.detail ?? error.message
        : error.message;
}
