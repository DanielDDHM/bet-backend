"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateUserValidation = exports.confirmUserValidation = exports.deleteUserValidation = exports.userUpdateValidation = exports.createUserValidation = exports.getUserValidation = void 0;
const z = __importStar(require("zod"));
exports.getUserValidation = z.object({
    id: z.string()
        .optional(),
    nick: z.string()
        .min(2, { message: 'MIN_LENGHT_3' })
        .max(8, { message: 'MAX_LENGTH_8' })
        .optional(),
    email: z.string()
        .min(2, { message: 'NON_EMPTY' })
        .optional(),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' })
        .optional(),
    page: z.number()
        .nonnegative()
        .optional(),
    perPage: z.number()
        .nonnegative()
        .optional()
}).strict();
exports.createUserValidation = z.object({
    name: z.string()
        .min(2, { message: 'MIN_LENGHT_3' })
        .max(10, { message: 'MAX_LENGTH_10' }),
    nick: z.string()
        .min(2, { message: 'MIN_LENGHT_3' })
        .max(8, { message: 'MAX_LENGTH_8' }),
    email: z.string()
        .min(2, { message: 'NON_EMPTY' }),
    password: z.string()
        .min(2, { message: 'NON_EMPTY' })
        .max(10, { message: 'MAX_LENGTH_8' }),
    photo: z.string()
        .min(2, { message: 'MIN_LENGHT_3' })
        .optional(),
    phone: z.string()
        .min(2, { message: 'NON_EMPTY' })
        .max(13, { message: 'MAX_LENGTH_13' }),
    address: z.object({
        zipCode: z.string()
            .min(2, { message: 'NON_EMPTY' })
            .max(10, { message: 'MAX_LENGTH_10' }),
        streetNumber: z.number()
            .nonnegative({ message: 'NON_NEGATIVE' })
            .min(2, { message: 'NON_EMPTY' }),
        street: z.string()
            .min(2, { message: 'NON_EMPTY' })
            .optional(),
        neighboorhood: z.string()
            .min(2, { message: 'NON_EMPTY' })
            .optional(),
        city: z.string()
            .min(2, { message: 'NON_EMPTY' })
            .max(10, { message: 'MAX_LENGTH_8' })
            .optional(),
        state: z.string()
            .min(2, { message: 'NON_EMPTY' })
            .max(3, { message: 'MAX_LENGTH_3' })
            .optional(),
    }),
    isStaff: z.boolean().optional(),
}).strict();
exports.userUpdateValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    name: z.string()
        .min(2, { message: 'MIN_LENGHT_3' })
        .optional(),
    nick: z.string()
        .min(2, { message: 'MIN_LENGHT_3' })
        .max(8, { message: 'MAX_LENGTH_8' })
        .optional(),
    email: z.string()
        .min(2, { message: 'NON_EMPTY' }),
    password: z.string()
        .min(2, { message: 'NON_EMPTY' })
        .max(10, { message: 'MAX_LENGTH_8' }),
    photo: z.string()
        .min(2, { message: 'MIN_LENGHT_3' })
        .optional(),
    phone: z.string()
        .min(2, { message: 'NON_EMPTY' })
        .optional(),
    address: z.object({
        zipCode: z.string()
            .min(2, { message: 'NON_EMPTY' })
            .optional(),
        streetNumber: z.number()
            .nonnegative({ message: 'NON_NEGATIVE' })
            .min(2, { message: 'NON_EMPTY' })
            .optional(),
    }).optional(),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' })
        .optional(),
}).strict();
exports.deleteUserValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    email: z.string()
        .min(2, { message: 'NON_EMPTY' })
        .optional(),
    password: z.string()
        .min(2, { message: 'NON_EMPTY' })
        .max(10, { message: 'MAX_LENGTH_8' })
        .optional(),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
}).strict();
exports.confirmUserValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
}).strict();
exports.activateUserValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
}).strict();
//# sourceMappingURL=user.validation.js.map