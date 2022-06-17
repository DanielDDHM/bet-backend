"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[ADDRESS CREATE]', () => {
    it('CREATE ADDRESS WITH SUCCESS', async () => {
        const address = await new services_1.AddressService({
            zipCode: "41310355",
            streetNumber: 100
        }).create();
        expect(address).toHaveProperty("id");
    });
    it('CREATE ADDRESS WITH FAIL', async () => {
        try {
            const address = await new services_1.AddressService({
                zipCode: "ABC",
                streetNumber: 100
            }).create();
            expect(address).toBe(Error);
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
    afterEach(async () => {
        await config_1.prisma.address.deleteMany();
    });
});
//# sourceMappingURL=create.spec.js.map