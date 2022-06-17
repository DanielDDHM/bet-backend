"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const bets_service_1 = __importDefault(require("../../services/bets.service"));
describe('[BETS CREATE]', () => {
    it('CREATE BETS WITH SUCCESS', async () => {
        const betCreated = await new bets_service_1.default({
            usersId: "62aaf4cf5a66de846e8990b2",
            gameId: "62ac712d60a2196f5420e14f",
            bet: 24,
            value: "100",
            nick: "teste"
        }).create();
        expect(betCreated).toHaveProperty("id");
    });
    it('CREATE BETS WITH FAIL', async () => {
        try {
            const betCreated = await new bets_service_1.default({
                usersId: "62aaf4cf5a66de846e8990b2",
                gameId: "62ac712d60a2196f5420e14f",
                bet: 24,
                value: "100",
                nick: "teste"
            }).create();
            expect(betCreated).toHaveProperty("id");
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=create.spec.js.map