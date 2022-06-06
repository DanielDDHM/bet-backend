import {
  StatusCode,
  CreateAddressDTO,
  GetAddressDTO
} from "../types";
import { AddressService } from "../services";
import { Request, Response } from 'express';
import { AppError } from "../helpers";

export default class AddressController {

  async get(req: Request, res: Response) {
    const { body } = req;
    try {
      const address = await new AddressService(body as GetAddressDTO).get()
      return res.status(StatusCode.OK).send(address)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const addressCreated = await new AddressService(body as CreateAddressDTO).create()
      return res.status(StatusCode.OK).send({ data: addressCreated, message: 'ADDRESS CREATED' })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
