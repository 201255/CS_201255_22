import  pkg  from 'pg';
import Sequelize from 'sequelize';
const {Pool} = pkg;
//import  Pool from 'pg/lib/index.js';

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

const sequelizeClient = new Sequelize(db.database, db.user, db.password, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    host: db.host,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

sequelizeClient.sync({force: true})
.then(() => {
    console.log('Conectado')
})
.catch(() => {
    console.log('No se conecto')
});

export const getData = {getConnection,sequelizeClient}  ;