"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const types_1 = require("../types");
class CheckRole {
    async checkRole(req, res, next) {
        try {
            const nick = req.nick;
            const user = await config_1.prisma.users.findUnique({
                where: { nick }
            });
            if (user?.isActive === true && user?.isConfirmed === true) {
                if (user.isStaff === true) {
                    req.role = types_1.UserTypes.ADMIN;
                    return next();
                }
                else if (user.isStaff === false) {
                    req.role = types_1.UserTypes.USER;
                    return next();
                }
                else {
                    throw new helpers_1.AppError(`${types_1.DefaultMessages.NOT_PERMITED}`, types_1.StatusCode.BAD_REQUEST);
                }
            }
            else {
                let problem;
                user?.isActive === false ? problem = types_1.DefaultMessages.USER_NOT_ACTIVE :
                    user?.isConfirmed === false ? problem = types_1.DefaultMessages.USER_NOT_CONFIRMED :
                        problem = types_1.DefaultMessages.USER_NOT_SAME;
                throw new helpers_1.AppError(`${types_1.DefaultMessages.USER_PROBLEM}: ${problem}`, types_1.StatusCode.BAD_REQUEST);
            }
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).send(error);
            res.status(types_1.StatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}
exports.default = CheckRole;
//# sourceMappingURL=checkRole.middleware.js.map