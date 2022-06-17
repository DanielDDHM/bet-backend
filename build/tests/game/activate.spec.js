"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const types_1 = require("../../types");
describe('[GAMES ACTIVATE]', () => {
    it('ACTIVATE GAMES WITH SUCCESS', async () => {
        const data = { id: "62ac712d60a2196f5420e14f", nick: "teste", role: types_1.UserTypes.ADMIN };
        const gameActivated = await new services_1.GameService(data).activateGame();
        expect(gameActivated).toHaveProperty("id");
    });
    it('ACTIVATE GAMES WITH FAIL', async () => {
        try {
            const data = { id: "62ac712d60a2196f5420e14f", role: types_1.UserTypes.USER };
            const gameActivated = await new services_1.GameService(data).activateGame();
            expect(gameActivated).toHaveProperty("id");
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=activate.spec.js.map