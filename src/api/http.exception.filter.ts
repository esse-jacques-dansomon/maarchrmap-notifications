import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine the appropriate status code based on the exception
    let status;
    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    // Format the error message based on the exception
    let message = 'An error occurred while processing your request.';
    if (exception.message) {
      message = exception.message;
    }

    // Create a custom error response object
    const errorResponse = {
      success: false,
      code: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: exception,
      trace: exception.stack,
    };
    console.log(errorResponse);
    // Set the HTTP status code and response body
    response.status(status).json(errorResponse);
  }
}
