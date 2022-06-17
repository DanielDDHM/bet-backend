"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[GAME GET]', () => {
    it('GET ALL GAMES', async () => {
        const game = await new services_1.GameService({}).get();
        expect(game).toHaveProperty("games");
    });
    it('GET GAME WITH ID ', async () => {
        const game = await new services_1.GameService({
            id: "62ac712d60a2196f5420e14f",
        }).get();
        expect(game).toHaveProperty("id");
    });
    it('GET GAME WITH FAIL ', async () => {
        try {
            const bet = await new services_1.GameService({
                id: "41310355",
            }).get();
            expect(bet).toBe(Error);
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=get.spec.js.map