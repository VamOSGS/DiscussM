import Router from 'koa-router';
const root = new Router();

root.get('/', (ctx) => {
    ctx.body = '<h1>Working...</h1>';
});

export default root;
