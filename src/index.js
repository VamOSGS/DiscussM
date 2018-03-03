// @flow
import Koa from 'koa';
import path from 'path';
import cors from '@koa/cors';
import favicon from 'koa-favicon';
import router from './router';
import start from './utils/start';
import mount from 'koa-mount';
import front from './utils/serveFront';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const app = new Koa();
const api = new Koa();

start(app);
app.use(favicon(path.resolve('static/favicon.ico')));
api.use(cors('*'));
api.use(router);

app.use(mount('/api', api));
app.use(mount('/', front));
