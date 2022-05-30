import {
  StatusCode,
  CreateAddressDTO,
  GetAddressDTO,
  UpdateAddressDTO
} from "../types";
import { AddressService } from "../services";
import { Request, Response } from 'express';

export default class AddressController {

  async get(req: Request, res: Response) {
    const { body } = req;
    try {
      const address = await new AddressService(body as GetAddressDTO).get()
      return res.status(StatusCode.OK).send(address)
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const addressCreated = await new AddressService(body as CreateAddressDTO).create()
      return res.status(StatusCode.OK).send({ data: addressCreated, message: 'ADDRESS_CREATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async update(req: Request, res: Response) {
    const { params, body } = req
    try {
      const updatedAddress = await new AddressService({ params, body } as UpdateAddressDTO).update
      return res.status(StatusCode.OK).send({ data: updatedAddress, message: 'ADDRESS_UPDATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
