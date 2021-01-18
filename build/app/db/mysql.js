"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const config_1 = __importDefault(require("../config"));
const connection = knex_1.default({
    client: 'mysql2',
    connection: {
        host: config_1.default._db.HOST,
        user: config_1.default._db.USER,
        password: config_1.default._db.PASSWORD,
        database: config_1.default._db.DBNAME,
    },
});
connection
    .raw('SELECT 1')
    .then(() => {
    console.log('Connected To DB');
})
    .catch((e) => {
    console.log(e, 'Failed to Connect DB');
});
exports.default = connection;
