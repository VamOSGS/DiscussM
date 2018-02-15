import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import { register, login } from '../db/methods';
import upload from '../utils/upload';

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

auth.post('/register', upload.single('file'), koaBody(), async (ctx) => {
    const { username, password, email, gender, age } = ctx.req.body;
    const { filename } = ctx.req.file;
    if (username && password && email && gender && age) {
        const image = filename ? `/uploads/${filename}` : '';
        const userBody = {
            ...ctx.req.body,
            image,
        };
        await register(userBody).then((res) => {
            ctx.response.body = res;
        });
    } else {
        ctx.response.body = { success: true, message: 'no enough data!' };
    }
});

export default auth;
