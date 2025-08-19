import { $ZodErrorTree } from "zod/v4/core";

export class AppError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export class HttpException extends AppError {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static Unauthorized(message: string = "Unauthorized") {
    return new HttpException(401, message);
  }

  static Forbidden(message: string = "Forbidden") {
    return new HttpException(403, message);
  }

  static NotFound(message: string = "Not Found") {
    return new HttpException(404, message);
  }
  static Conflict(message: string = "Conflict") {
    return new HttpException(409, message);
  }

  static InternalServerError(message: string = "Internal Server Error") {
    return new HttpException(500, message);
  }

  static ServiceUnavailable(message: string = "Service Unavailable") {
    return new HttpException(503, message);
  }
}

export class ValidationException extends AppError {
  constructor(cause: $ZodErrorTree<object>) {
    super("Bad request, Invalid data!", 400);
    this.cause = cause;
    this.name = this.constructor.name;
  }
}

function logErrorToService(error: unknown) {
  // Replace this with an actual logging service integration
  console.error(error);
}

export const handleError = <C extends object>(err: unknown) => {
  // Log the error to an external service or internal logging system
  logErrorToService(err);
  if (err instanceof HttpException) {
    return {
      error: true,
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
    };
  } else if (err instanceof ValidationException) {
    return {
      error: true,
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      cause: err.cause as $ZodErrorTree<C>,
    };
  } else {
    return {
      error: true,
      name: "InternalServerError",
      message: "An unexpected error occurred, please, try again later!",
      statusCode: 500,
    };
  }
};
