"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const types_1 = require("../../types");
describe('[GAMES CREATE]', () => {
    it('CREATE GAMES WITH SUCCESS', async () => {
        const data = {
            name: "teste",
            prize: "10000",
            sortDate: new Date("06/14/2023"),
            ownerId: "62aaf4cf5a66de846e8990b2",
            numbers: 24,
            nick: 'teste'
        };
        const gameCreated = await new services_1.GameService(data).create();
        expect(gameCreated).toHaveProperty("id");
    });
    it('CREATE GAMES WITH FAIL', async () => {
        try {
            const gameCreated = await new services_1.GameService({
                name: "teste",
                prize: "10000",
                sortDate: new Date("06/14/2023"),
                ownerId: "62aaf4cf5a66de846e8990b2",
                numbers: 24,
                nick: 'tesasdte',
                role: types_1.UserTypes.ADMIN
            }).create();
            expect(gameCreated).toHaveProperty("id");
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=create.spec.js.map