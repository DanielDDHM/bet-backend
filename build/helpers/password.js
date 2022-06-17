"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const types_1 = require("../types");
const apperror_exception_1 = __importDefault(require("./apperror.exception"));
class PasswordCrypt {
    constructor(pass, userP) {
        this.pass = pass;
        this.userP = userP;
        this.salt = 10;
    }
    async crypt(pass = this.pass, salt = this.salt) {
        try {
            const encryptPass = await bcryptjs_1.default.hash(String(pass), salt);
            return encryptPass;
        }
        catch (error) {
            throw new apperror_exception_1.default('ERROR ON CRYPT PASSWORD', types_1.StatusCode.FAILED_DEPENDENCY);
        }
    }
    async compare(pass = this.pass, userP = this.userP) {
        try {
            const comparePass = await bcryptjs_1.default.compare(pass, String(userP));
            return comparePass;
        }
        catch (error) {
            throw new apperror_exception_1.default(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = PasswordCrypt;
//# sourceMappingURL=password.js.map