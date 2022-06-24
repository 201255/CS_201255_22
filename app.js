import express from 'express';

import { api } from './config/config.js';
import user from './router/user.js';
import cors from 'cors';
import fathers from './router/fathers.js';
import sons from './router/sons.js';
import imagenes from './router/imagenes.js';

const app = express ();

app.use('/api_v1/user', user);
app.use('/api_v1/fathers', fathers);
app.use('/api_v1/sons', sons);
app.use('/api_v1/imagenes', imagenes);

app.use(cors({origin: true, credentials: true})); 

app.listen(api.port, () =>{
    console.log('Api escuchando en el puerto =>',api.port);
});
