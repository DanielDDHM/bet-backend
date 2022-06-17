"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const services_1 = require("../../services");
describe('[GAME SORT]', () => {
    afterAll(async () => {
        const game = await config_1.prisma.game.create({
            data: {
                name: "teste",
                prize: "10000",
                sortDate: new Date("06/14/2023"),
                ownerId: "62aaf4cf5a66de846e8990b2",
                numbers: 24
            }
        });
        let i = 0;
        while (i <= 5) {
            await config_1.prisma.bets.create({
                data: {
                    usersId: "62a855d398e56bd3e29691d3",
                    bet: 1,
                    gameId: game.id,
                    value: "100"
                }
            });
            i++;
        }
    });
    it('SORT GAME WITH SUCCESS', async () => {
        const game = await config_1.prisma.game.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        });
        const gameSort = await new services_1.GameService({ id: game?.id, nick: "teste", role: 'ADMIN' }).sort();
        expect(gameSort).toHaveProperty("winners");
    });
    it('SORT GAME WITH FAIL ', async () => {
        try {
            const game = await config_1.prisma.game.findFirst({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            const gameSort = await new services_1.GameService({ id: game?.id, nick: "tetttt", role: 'USER' }).sort();
            expect(gameSort).toBe(Error);
        }
        catch (error) {
            expect(error);
        }
    });
});
//# sourceMappingURL=sort.spec.js.map