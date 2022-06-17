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
exports.sortValidation = exports.deleteGamesValidation = exports.activateGameValidation = exports.updateGamesValidation = exports.createGamesValidation = exports.getGamesValidation = void 0;
const z = __importStar(require("zod"));
exports.getGamesValidation = z.object({
    id: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    page: z.number()
        .nonnegative()
        .optional(),
    perPage: z.number()
        .nonnegative()
        .optional()
}).strict();
exports.createGamesValidation = z.object({
    name: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
    ownerId: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
    prize: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
    numbers: z.number()
        .nonnegative({ message: 'NOT_NEGATIVE' })
        .min(1, { message: 'NOT_EMPTY' }),
    sortDate: z.date(),
    nick: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
}).strict();
exports.updateGamesValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    prize: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    sortDate: z.date()
        .optional(),
    winner: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    prizePhoto: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
    nick: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
}).strict();
exports.activateGameValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
    nick: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
}).strict();
exports.deleteGamesValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
    nick: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
}).strict();
exports.sortValidation = z.object({
    id: z.string()
        .min(2, { message: 'MIN_LENGHT_3' }),
    role: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
    nick: z.string()
        .min(3, { message: 'NOT_EMPTY' })
}).strict();
//# sourceMappingURL=game.validation.js.map