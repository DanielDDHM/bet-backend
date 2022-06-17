"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const types_1 = require("../../types");
describe('[USERS ACTIVATE]', () => {
    it('ACTIVATE USERS WITH SUCCESS', async () => {
        const data = { id: "62aaf4cf5a66de846e8990b2", role: types_1.UserTypes.ADMIN };
        const gameActivated = await new services_1.UserService(data).activateUser();
        expect(gameActivated).toHaveProperty("id");
    });
    it('ACTIVATE USERS WITH FAIL', async () => {
        try {
            const data = { id: "62aaf4cf5a66de846e8990b2", role: types_1.UserTypes.USER };
            const gameActivated = await new services_1.UserService(data).activateUser();
            expect(gameActivated).toHaveProperty("id");
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=activate.spec.js.map