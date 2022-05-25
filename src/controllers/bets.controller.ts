import { StatusCode } from "../types";
import { Request, Response } from 'express';
import { AppError } from "../helpers";


export const create = (req: Request, res: Response) => {
  const { body } = req;
  try {
    return res.status(StatusCode.OK).send(body)

  } catch (error: any) {
    throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
  }
}
