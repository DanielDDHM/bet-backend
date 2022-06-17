"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const index_1 = require("./index");
const config_1 = require("../config");
const validations_1 = require("../validations");
const types_1 = require("../types");
class UserService {
    constructor(params) {
        this.params = params;
    }
    async get(params = this.params) {
        const { id, email, nick, page, perPage, role } = validations_1.getUserValidation.parse(params);
        try {
            if (email || nick || id) {
                const user = await config_1.prisma.users.findFirst({
                    where: {
                        OR: [
                            { id },
                            { email },
                            { nick }
                        ]
                    },
                });
                return user;
            }
            else if (role === types_1.UserTypes.ADMIN) {
                const [users, total] = await config_1.prisma.$transaction([
                    config_1.prisma.users.findMany({
                        skip: (Number(page) - 1) * Number(perPage) || 0,
                        take: Number(perPage) || 10,
                    }),
                    config_1.prisma.users.count()
                ]);
                return { users, total: total };
            }
            throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.NOT_ACCEPTABLE);
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async create(params = this.params) {
        try {
            const { name, nick, password, phone, email, address: { zipCode, streetNumber }, } = validations_1.createUserValidation.parse(params);
            const query = {
                name,
                nick,
                password: await new helpers_1.PasswordCrypt(password).crypt(),
                phone,
                email
            };
            const [existUser, existAddress] = await config_1.prisma.$transaction([
                config_1.prisma.users.findUnique({
                    where: { nick }
                }),
                config_1.prisma.address.findFirst({
                    where: {
                        zipCode,
                        streetNumber
                    }
                })
            ]);
            if (existUser) {
                throw new helpers_1.AppError(types_1.DefaultMessages.USER_EXISTS, types_1.StatusCode.BAD_REQUEST);
            }
            if (!existAddress) {
                const { data: { logradouro, bairro, localidade, uf } } = await new helpers_1.AddressFinder(zipCode).check();
                const addressCreated = await new index_1.AddressService({
                    zipCode,
                    streetNumber,
                    street: logradouro,
                    neighborhood: bairro,
                    city: localidade,
                    state: uf
                }).create();
                const userCreated = await config_1.prisma.users.create({
                    data: {
                        ...query,
                        addressId: addressCreated.id
                    }
                });
                return userCreated;
            }
            const userCreated = await config_1.prisma.users.create({
                data: {
                    ...query,
                    addressId: existAddress.id,
                }
            });
            return userCreated;
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async update(params = this.params) {
        try {
            const { id, name, nick, email, password, phone, photo, address } = validations_1.userUpdateValidation.parse(params);
            const query = {
                name,
                nick,
                email,
                password: await new helpers_1.PasswordCrypt(password).crypt(),
                phone,
                photo
            };
            const userExists = await config_1.prisma.users.findUnique({
                where: { id }
            });
            if (!userExists)
                throw new helpers_1.AppError(types_1.DefaultMessages.USER_NOT_EXISTS, types_1.StatusCode.NOT_FOUND);
            if (address) {
                const addressFind = await config_1.prisma.address.findFirst({
                    where: {
                        OR: [
                            { zipCode: address.zipCode },
                            { streetNumber: address.streetNumber }
                        ]
                    }
                });
                const userUpdated = await config_1.prisma.users.update({
                    where: {
                        id: userExists.id
                    },
                    data: {
                        ...query,
                        addressId: addressFind?.id
                    }
                });
                return userUpdated;
            }
            const userUpdated = await config_1.prisma.users.update({
                where: {
                    id
                },
                data: {
                    ...query
                }
            });
            return userUpdated;
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async activateUser(params = this.params) {
        try {
            const { id, role } = validations_1.activateUserValidation.parse(params);
            const user = await config_1.prisma.users.findUnique({
                where: { id },
            });
            if (!user)
                throw new helpers_1.AppError(types_1.DefaultMessages.USER_NOT_EXISTS, types_1.StatusCode.BAD_REQUEST);
            if (role !== types_1.UserTypes.ADMIN) {
                throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
            }
            let activate;
            switch (user.isActive) {
                case true:
                    activate = false;
                    break;
                case false:
                    activate = true;
                    break;
            }
            await config_1.prisma.users.update({
                where: { id },
                data: { isActive: activate }
            });
            return { id: id, Status: activate, updatedAt: user?.updatedAt };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async confirmUser(params = this.params) {
        try {
            const { id } = validations_1.confirmUserValidation.parse(params);
            const user = await config_1.prisma.users.findUnique({
                where: { id },
            });
            if (!user)
                throw new helpers_1.AppError(types_1.DefaultMessages.USER_NOT_EXISTS, types_1.StatusCode.BAD_REQUEST);
            let confirm;
            switch (user.isConfirmed) {
                case false:
                    confirm = true;
                    break;
                case true:
                    throw new helpers_1.AppError(types_1.DefaultMessages.USER_HAS_CONFIRMED, types_1.StatusCode.BAD_REQUEST);
                    break;
            }
            await config_1.prisma.users.update({
                where: { id },
                data: { isConfirmed: confirm }
            });
            return { id: id, Status: confirm, updatedAt: user?.updatedAt };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(params = this.params) {
        const { id, email, password, role } = validations_1.deleteUserValidation.parse(params);
        try {
            const user = await config_1.prisma.users.findUnique({
                where: { id },
            });
            if (!user)
                throw new helpers_1.AppError(types_1.DefaultMessages.USER_NOT_EXISTS, types_1.StatusCode.NOT_FOUND);
            if (role === types_1.UserTypes.ADMIN) {
                await config_1.prisma.users.delete({
                    where: { id }
                });
                return { message: `USER ${user?.nick} DELETED by ADMIN`, deleted: true };
            }
            const verifyPass = await new helpers_1.PasswordCrypt(String(password), user?.password).compare();
            if (!verifyPass || user?.email !== email) {
                throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
            }
            await config_1.prisma.users.delete({
                where: { id }
            });
            return { message: `USER ${user?.nick} DELETED by USER`, deleted: true };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map