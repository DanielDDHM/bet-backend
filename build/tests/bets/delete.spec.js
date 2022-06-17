"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[BETS DELETE]', () => {
    afterAll(async () => {
        await config_1.prisma.bets.create({
            data: {
                gameId: "62aaf673c02eb14dcbfe0cde",
                usersId: "62aaf4cf5a66de846e8990b2",
                bet: 24,
                value: "100",
            }
        });
    });
    it('DELETE BET WITH SUCCESS', async () => {
        const bet = await config_1.prisma.bets.findFirst({
            where: {
                gameId: "62aaf673c02eb14dcbfe0cde"
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        const betDel = await new services_1.BetService({ id: bet?.id, role: 'ADMIN' }).delete();
        expect(betDel).toHaveProperty("message");
    });
    it('GET BET WITH FAIL ', async () => {
        try {
            const bet = await new services_1.BetService({
                usersId: "41310355",
                role: 'USER'
            }).delete();
            expect(bet).toBe(Error);
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=delete.spec.js.map