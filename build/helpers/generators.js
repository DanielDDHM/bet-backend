"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Generator {
    constructor(param) {
        this.param = param;
    }
    async numberGenerator(param = this.param) {
        return Math.floor(Math.random() * (param - 2) + 1);
    }
    makeid() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}
exports.default = Generator;
//# sourceMappingURL=generators.js.map