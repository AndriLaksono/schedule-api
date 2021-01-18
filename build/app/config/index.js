"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    app: {
        HOST: process.env.APP_HOST || '0.0.0.0',
        PORT: process.env.APP_PORT || 4444,
    },
    _db: {
        HOST: '188.166.244.33',
        DBNAME: 'testingdb',
        USER: 'root',
        PASSWORD: 'master',
    },
};
