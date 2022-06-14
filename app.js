import express from 'express';

import { api } from './config.js';
import user from './api/components/user/network.js';
import cors from 'cors';

const app = express ();

app.use('/api_v1/user', user);

app.use(cors({origin: true, credentials: true})); 

app.listen(api.port, () =>{
    console.log('Api escuchando en el puerto =>',api.port);
});
