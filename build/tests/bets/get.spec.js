"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[BET GET]', () => {
    beforeAll(async () => {
        await new services_1.BetService({
            usersId: "62aaf4cf5a66de846e8990b2",
            gameId: "62aaf4cf5a66de846e8990b2",
            bet: 24,
            value: "100",
            nick: "teste"
        }).create();
    });
    it('GET BET WITH GAMEID ', async () => {
        const bet = await new services_1.BetService({
            gameId: "62aaf4cf5a66de846e8990b2",
            role: 'ADMIN'
        }).get();
        expect(bet).toHaveProperty("bets");
    });
    it('GET BET WITH USERID ', async () => {
        const bet = await new services_1.BetService({
            usersId: "62aaf4cf5a66de846e8990b2",
            role: 'ADMIN'
        }).get();
        expect(bet).toHaveProperty("bets");
    });
    it('GET BET WITH FAIL ', async () => {
        try {
            const bet = await new services_1.BetService({
                usersId: "41310355",
                role: 'USER'
            }).get();
            expect(bet).toBe(Error);
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=get.spec.js.map