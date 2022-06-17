"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[USERS CREATE]', () => {
    jest.setTimeout(15000);
    it('CREATE USERS WITH SUCCESS', async () => {
        const data = {
            name: "confuso",
            nick: new helpers_1.Generator('').makeid(),
            email: new helpers_1.Generator('').makeid() + "@teste.com.br",
            password: "teste",
            phone: "71996421369",
            address: {
                zipCode: "41310355",
                streetNumber: 69
            }
        };
        const userCreated = await new services_1.UserService(data).create();
        expect(userCreated).toHaveProperty("id");
    });
    it('CREATE USERS WITH FAIL', async () => {
        try {
            const betCreated = await new services_1.UserService({
                name: "confuso",
                nick: 'dsasdasd',
                email: "br",
                password: "teste",
                phone: "71996421369",
                address: {
                    zipCode: "41310355",
                    streetNumber: 69
                }
            }).create();
            expect(betCreated).toBe(Error);
        }
        catch (error) {
            expect(error);
        }
    });
});
//# sourceMappingURL=create.spec.js.map