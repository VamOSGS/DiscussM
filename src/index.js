// @flow
import Koa from 'koa';
import cors from '@koa/cors';
import router from './router';
import start from './utils/start';
import mount from 'koa-mount';
import front from './utils/serveFront';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = new Koa();
const api = new Koa();

start(app);
api.use(cors('*'));
api.use(router);

app.use(mount('/api', api));
app.use(mount('/', front));
