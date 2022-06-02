const express =  require('express');

const config = require('../config.js');
const user = require('./components/user/network');
const cors = require('cors');

const app = express ();

app.use('/api_v1/user', user);

app.use(cors({origin: true, credentials: true})); 

app.listen(config.api.port, () =>{
    console.log('Api escuchando en el puerto =>', config.api.port);
});
