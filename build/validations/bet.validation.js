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
exports.betsDeleteValidation = exports.betsCreateValidation = exports.getBetsValidation = void 0;
const z = __importStar(require("zod"));
exports.getBetsValidation = z.object({
    usersId: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    gameId: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    page: z.number()
        .nonnegative()
        .optional(),
    perPage: z.number()
        .nonnegative()
        .optional(),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
}).strict();
exports.betsCreateValidation = z.object({
    usersId: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
    bet: z.number()
        .nonnegative({ message: 'NOT_NEGATIVE' })
        .min(1, { message: 'NOT_EMPTY' }),
    gameId: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
    value: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
    nick: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
}).strict();
exports.betsDeleteValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
}).strict();
//# sourceMappingURL=bet.validation.js.map