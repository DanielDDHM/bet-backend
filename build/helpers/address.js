"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const apperror_exception_1 = __importDefault(require("./apperror.exception"));
class AddressFinder {
    constructor(zipCode) {
        this.zipCode = zipCode;
    }
    async check(zipCode = this.zipCode) {
        try {
            const address = await axios_1.default.get(`https://viacep.com.br/ws/${zipCode}/json/`);
            if (!address)
                throw new apperror_exception_1.default(types_1.DefaultMessages.CPF_API_NOT_WORKING, types_1.StatusCode.SERVICE_UNAVAILABLE);
            return address;
        }
        catch (error) {
            throw new apperror_exception_1.default(String(error.message), error.statusCode);
        }
    }
}
exports.default = AddressFinder;
//# sourceMappingURL=address.js.map