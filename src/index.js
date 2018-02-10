// @flow
import Koa from 'koa';
import router from './router';
import start from './utils/start';

const app = new Koa();

start(app);
app.use(router);
