import { ApiResponseDto } from '../dto/api-response.dto';

export class ResponseHelper {
  static success<T>(
    responseBody: T,
    messageTitle: string,
    message: string,
  ): ApiResponseDto<T> {
    return {
      success: true,
      messageTitle,
      message,
      responseBody,
      timestamp: new Date().toISOString(),
    };
  }

  static error(messageTitle: string, message: string): ApiResponseDto<null> {
    return {
      success: false,
      messageTitle,
      message,
      responseBody: null,
      timestamp: new Date().toISOString(),
    };
  }
}
