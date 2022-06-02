const {Pool}= require ('pg');

const config = require ('../config');

async function getConnection(){
    const client = new Pool({
        user: config.db.user,
        host: config.db.host,
        database: config.db.database,
        password: config.db.password,
        port: config.db.port,

    })
    await client.connect();
    return client;


    
}
module.exports={getConnection};