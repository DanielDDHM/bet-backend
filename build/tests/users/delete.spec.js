"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
describe('[USER DELETE]', () => {
    afterAll(async () => {
        const data = {
            name: "confuso",
            nick: new helpers_1.Generator('').makeid(),
            email: new helpers_1.Generator('').makeid() + "@teste.com.br",
            password: "teste",
            phone: "71996421369",
            addressId: '62ac9e9f617b009386afc55d'
        };
        await config_1.prisma.users.create({ data });
    });
    it('DELETE USER WITH SUCCESS', async () => {
        const user = await config_1.prisma.users.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        });
        const userDel = await new services_1.UserService({ id: user?.id, role: 'ADMIN' }).delete();
        expect(userDel).toHaveProperty("message");
    });
    it('GET GAME WITH FAIL ', async () => {
        try {
            const game = await new services_1.UserService({ id: "sdasdasd", role: 'ADMIN' }).delete();
            expect(game).toBe(Error);
        }
        catch (error) {
            expect(error);
        }
    });
});
//# sourceMappingURL=delete.spec.js.map