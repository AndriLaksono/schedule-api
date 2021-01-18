import knex from 'knex';
import config from '../config';

const connection = knex({
    client: 'mysql2',
    connection: {
        host: config._db.HOST,
        user: config._db.USER,
        password: config._db.PASSWORD,
        database: config._db.DBNAME,
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

export default connection;
