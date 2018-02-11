// @flow
import Koa from 'koa';
import router from './router';
import start from './utils/start';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = new Koa();

start(app);
app.use(router);
