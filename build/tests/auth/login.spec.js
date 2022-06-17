"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[LOGIN TEST]', () => {
    it('SUCESSFULL LOGIN', async () => {
        const login = await new services_1.AuthService({
            nick: "teste",
            email: "teste@teste.com.br",
            password: "teste"
        }).login();
        expect(login).toHaveProperty('auth');
    });
    it('ERROR ON LOGIN', async () => {
        try {
            const login = await new services_1.AuthService({
                nick: "teste",
                email: "teste@tes",
                password: "teste"
            }).login();
            expect(login).toBe(Error);
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=login.spec.js.map