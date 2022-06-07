import  pkg  from 'pg';
const {Pool} = pkg;
//import  Pool from 'pg/lib/index.js';

import { db } from '../config.js';

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
export default  getConnection;