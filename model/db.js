import  pkg  from 'pg';
import Sequelize from 'sequelize';
const {Pool} = pkg;
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
});

const sequelizeClient = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return new Sequelize(db.database, db.user, db.password, {
                host: db.host,
                dialect: 'postgres',
            });

        case 'test':
            return new Sequelize(db.database, db.user, db.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                host: db.host,
                dialect: 'postgres',
            });

        default:
            return new Sequelize(db.database, db.user, db.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                    }
                },
                host: db.host,
                dialect: 'postgres',
            });
    }
})();


import { db } from '../config/config.js';

async function getConnection(){
    const client = new Pool({
        user: db.user,
        host: db.host,
        database: db.database,
        password: db.password,
        port: db.port,

    })
    await client.connect();
    return client;


    
}

// const sequelizeClient = new Sequelize(db.database, db.user, db.password, {
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     host: db.host,
//     dialect: 'postgres',
//     define: {
//         timestamps: false
//     }
// });

sequelizeClient.sync({force: true})
.then(() => {
    console.log('Conectado')
})
.catch(() => {
    console.log('No se conecto')
});

export const getData = {getConnection,sequelizeClient}  ;