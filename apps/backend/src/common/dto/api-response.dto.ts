export class ApiResponseDto<T> {
  success!: boolean;
  messageTitle!: string;
  message!: string;
  responseBody!: T | null;
  timestamp!: string;
}