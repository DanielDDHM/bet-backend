"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[USERS CONFIRM]', () => {
    it('CONFIRM USERS WITH SUCCESS', async () => {
        try {
            const data = { id: '62aaf4cf5a66de846e8990b2' };
            const gameConfirmed = await new services_1.UserService(data).confirmUser();
            expect(gameConfirmed).toHaveProperty("id");
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
    it('CONFIRM USERS WITH FAIL', async () => {
        try {
            const data = { id: '62aaf4cf5a66de846e8990b2' };
            const gameConfirmed = await new services_1.UserService(data).confirmUser();
            expect(gameConfirmed).toHaveProperty("id");
        }
        catch (error) {
            expect(error);
        }
    });
});
//# sourceMappingURL=confirm.spec.js.map