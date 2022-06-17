"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const api_1 = require("./docs/api");
const prompt_script_1 = __importDefault(require("./scripts/prompt.script"));
const cronjobs_1 = require("./cronjobs");
const { PORT, NAME } = process.env;
(0, prompt_script_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_1.apiDocumentation));
cronjobs_1.betsCron.start();
app.use('/v1', routes_1.default);
app.get('/', (request, response) => {
    const user = String(NAME) || "User";
    return response.send({
        message: `Hello ${user}`,
        status: 'UP'
    });
});
app.listen(PORT, () => {
    console.log(`APP STARTED ON http://localhost:${PORT || 3000}`);
});
//# sourceMappingURL=app.js.map