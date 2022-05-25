import { response } from "express";
export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }

  execute(message: string, statusCode: number) {
    return response.status(statusCode).send(message)
  }
}

export default AppError;
