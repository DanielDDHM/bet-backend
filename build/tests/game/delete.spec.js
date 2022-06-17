"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[GAME DELETE]', () => {
    afterAll(async () => {
        await config_1.prisma.game.create({
            data: {
                name: "teste",
                prize: "10000",
                sortDate: new Date("06/14/2023"),
                ownerId: "62aaf4cf5a66de846e8990b2",
                numbers: 24
            }
        });
    });
    it('DELETE GAME WITH SUCCESS', async () => {
        const game = await config_1.prisma.game.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        });
        const gameDel = await new services_1.GameService({ id: game?.id, nick: "teste", role: 'ADMIN' }).delete();
        expect(gameDel).toHaveProperty("message");
    });
    it('DELETE GAME WITH FAIL ', async () => {
        try {
            const game = await new services_1.GameService({ id: "sdasdasd", nick: "teste", role: 'ADMIN' }).delete();
            expect(game).toBe(Error);
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=delete.spec.js.map