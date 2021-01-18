"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
const app = express_1.default();
// Load App
app_1.default(app);
app.listen(config_1.default.app.PORT, config_1.default.app.HOST, () => {
    console.log(`Server listen on PORT ${config_1.default.app.PORT}`);
});
