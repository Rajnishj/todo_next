export class HttpError extends Error {
    statusCode: number | string
    constructor(message: string | undefined, statusCode: number | string) {
      super(message);
      this.statusCode = statusCode;
    }
  }