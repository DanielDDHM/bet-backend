"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const config_1 = require("../config");
const types_1 = require("../types");
const validations_1 = require("../validations");
class AddressService {
    constructor(params) {
        this.params = params;
    }
    async get(params = this.params) {
        try {
            const { zipCode, streetNumber } = validations_1.getAddressValidation.parse(params);
            const address = await config_1.prisma.address.findFirst({
                where: {
                    zipCode,
                    streetNumber
                }
            });
            if (!address)
                throw new helpers_1.AppError(types_1.DefaultMessages.ADDRESS_NOT_FOUND, types_1.StatusCode.NOT_FOUND);
            return address;
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(types_1.DefaultMessages.INTERNAL_SERVER_ERROR, types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async create(params = this.params) {
        try {
            const { zipCode, streetNumber } = validations_1.createAddressValidation.parse(params);
            const { data: { logradouro, bairro, localidade, uf } } = await new helpers_1.AddressFinder(zipCode).check();
            const addressCreated = await config_1.prisma.address.create({
                data: {
                    zipCode,
                    streetNumber,
                    street: logradouro,
                    neighborhood: bairro,
                    city: localidade,
                    state: uf
                }
            });
            return addressCreated;
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(types_1.DefaultMessages.INTERNAL_SERVER_ERROR, types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = AddressService;
//# sourceMappingURL=address.service.js.map