import Router from 'koa-router';
import jwtKoa from 'jwt-koa';

const root = new Router();

root.get('/check', jwtKoa.middleware, (ctx) => {
    ctx.body = 'SECRET';
});
root.get('/', async (ctx) => {
    ctx.body = ` <h1>Working...</h1>`;
});

export default root;
