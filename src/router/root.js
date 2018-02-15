import Router from 'koa-router';
import jwtKoa from 'jwt-koa';
import upload from '../utils/upload';
import koaBody from 'koa-bodyparser';

const root = new Router();

root.post('/upload', upload.single('file'), koaBody(), async (ctx) => {
    const { file } = ctx.req;
    console.log(file);
    console.log(ctx.req.body);
});

root.get('/check', jwtKoa.middleware, (ctx) => {
    ctx.body = 'SECRET';
});
root.get('/', async (ctx) => {
    ctx.body = ` <h1>Working...</h1>`;
});

export default root;
