"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
describe('[ADDRESS GET]', () => {
    beforeAll(async () => {
        await new services_1.AddressService({
            zipCode: "41310355",
            streetNumber: 100
        }).create();
    });
    it('GET ADDRESS WITH SUCCESS ', async () => {
        const address = await new services_1.AddressService({
            zipCode: "41310355",
            streetNumber: 100
        }).get();
        expect(address).toHaveProperty("id");
    });
    it('GET ADDRESS WITH FAIL ', async () => {
        try {
            const address = await new services_1.AddressService({
                zipCode: "41310355",
                streetNumber: 10000
            }).get();
            expect(address).toBe(Error);
        }
        catch (error) {
            expect(error).toBeInstanceOf(helpers_1.AppError);
        }
    });
});
//# sourceMappingURL=get.spec.js.map