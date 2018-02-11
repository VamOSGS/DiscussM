import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import User from '../models/user';

const auth = new Router();

auth.post('/login', koaBody(), async (ctx) => {
    console.log('login', ctx.request.body);
    ctx.response.body = 'good job';
});
auth.post('/register', koaBody(), async (ctx) => {
    console.log('register', ctx.request.body);
    ctx.response.body = 'good job';
});

export default auth;
