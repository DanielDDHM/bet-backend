import {
  StatusCode,
  AddressCreateDTO,
  AddressGetDTO,
  DefaultMessages
} from "../types";
import { AddressService } from "../services";
import { Request, Response } from 'express';
import { AppError } from "../helpers";

export default class AddressController {

  async get(req: Request, res: Response) {
    const { query: { zipCode, streetNumber } } = req;
    const data = { zipCode, streetNumber: Number(streetNumber) }
    try {
      const address = await new AddressService(data as AddressGetDTO).get()
      return res.status(StatusCode.OK).send(address)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const addressCreated = await new AddressService(body as AddressCreateDTO).create()
      return res.status(StatusCode.OK)
        .send({ data: addressCreated, message: DefaultMessages.ADDRESS_CREATED })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
