// @flow
import path from 'path';
import Koa from 'koa';
import cors from '@koa/cors';
import router from './router';
import start from './utils/start';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import serve from 'koa-static';

const app = new Koa();

start(app);
app.use(serve(path.resolve('./static')));
app.use(cors('*'));
app.use(router);
