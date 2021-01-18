import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './errors';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

const swaggerSpec = swaggerJSDoc(options);

export default (app: Application): void => {
    // Middleware

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Documentation Handling
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Api Handling

    Object.keys(routes).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.use('/api', (routes as any)[key]);
    });

    // Error Handling

    app.use(errorHandler);

    // Unhandling Rejection Expection

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
        console.log(p);
        throw reason;
    });

    process.on('uncaughtException', (error: Error) => {
        console.log(error);
        process.exit(1);
    });
};
