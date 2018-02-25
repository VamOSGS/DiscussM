import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import { register, login, fb, check } from '../db/methods';

const auth = new Router();

auth.post('/login', koaBody(), async (ctx) => {
    if (ctx.request.body.username && ctx.request.body.password) {
        await login(ctx.request.body).then((res) => {
            ctx.response.body = res;
        });
    } else {
        ctx.response.body = { success: true, message: 'no enough data!' };
    }
});

auth.post('/fb', koaBody(), async (ctx) => {
    await fb(ctx.request.body).then((res) => {
        ctx.response.body = res;
    });
});
auth.post('/fbCheck', koaBody(), async (ctx) => {
    await check(ctx.request.body).then((res) => {
        if (res === null) {
            ctx.response.body = true;
        } else {
            ctx.response.body = false;
        }
    });
});

auth.post('/register', koaBody(), async (ctx) => {
    const { username, password, email, gender, age, image } = ctx.request.body;
    if (username && password && email && gender && age) {
        await register(ctx.request.body).then((res) => {
            ctx.response.body = res;
        });
    } else {
        ctx.response.body = { success: false, message: 'no enough data!' };
    }
});

export default auth;
