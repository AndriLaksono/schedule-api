"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const errors_1 = __importDefault(require("./errors"));
const routes_1 = __importDefault(require("./routes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Schedule Api Example',
        version: '1.0.0',
        description: 'This is a REST API application made with Express.',
        contact: {
            name: 'Developer',
            email: 'andrilaksono222@gmail.com',
        },
    },
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/app/services/**/_routes*.ts'],
};
const swaggerSpec = swagger_jsdoc_1.default(options);
exports.default = (app) => {
    // Middleware
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    // Documentation Handling
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Api Handling
    Object.keys(routes_1.default).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.use('/api', routes_1.default[key]);
    });
    // Error Handling
    app.use(errors_1.default);
    // Unhandling Rejection Expection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.on('unhandledRejection', (reason, p) => {
        console.log(p);
        throw reason;
    });
    process.on('uncaughtException', (error) => {
        console.log(error);
        process.exit(1);
    });
};
