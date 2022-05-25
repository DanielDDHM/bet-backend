import { StatusCode } from "../types";
import { Request, Response } from 'express';
import { AppError } from "../helpers";
import { createUserService } from "../services/users";
export const create = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const userCreated = await new createUserService(body)
    return res.status(StatusCode.OK).send({ data: userCreated, message: 'USER_CREATED' })

  } catch (error: any) {
    throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
  }
}
