import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import { register, login } from '../db/methods';

const auth = new Router();
auth.post('/login', koaBody(), async (ctx) => {
    await login(ctx.request.body).then((res) => {
        ctx.response.body = res;
    });
});

auth.post('/register', koaBody(), async (ctx) => {
    await register(ctx.request.body).then((res) => {
        ctx.response.body = res;
    });
});

export default auth;
