"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const services_1 = require("../services");
const helpers_1 = require("../helpers");
class AddressController {
    async get(req, res) {
        const { query: { zipCode, streetNumber } } = req;
        const data = { zipCode, streetNumber: Number(streetNumber) };
        try {
            const address = await new services_1.AddressService(data).get();
            return res.status(types_1.StatusCode.OK).send(address);
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async create(req, res) {
        const { body } = req;
        try {
            const addressCreated = await new services_1.AddressService(body).create();
            return res.status(types_1.StatusCode.OK)
                .send({ data: addressCreated, message: types_1.DefaultMessages.ADDRESS_CREATED });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.default = AddressController;
//# sourceMappingURL=address.controller.js.map