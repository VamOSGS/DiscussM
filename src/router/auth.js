import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import { register, check } from '../utils/methods';

const auth = new Router();

auth.post('/login', koaBody(), async (ctx) => {
    console.log('login', ctx.request.body);
    ctx.response.body = 'good job';
});

auth.post('/register', koaBody(), async (ctx) => {
    await check(ctx.request.body.username).then(async (data) => {
        if (data === null) {
            await register(ctx.request.body).then((user) => {
                ctx.response.body = { user, token: null };
            });
        } else {
            ctx.response.body = { message: 'Username taken' };
        }
    });
});

export default auth;
