import serve from 'koa-static';
import send from 'koa-send';
import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';

const front = new Koa();
const router = new Router();

front.use(serve(path.resolve('static')));
front.use(router.routes());
front.use(router.allowedMethods());

router.get('*', async (ctx) => {
    const { url } = ctx;
    switch (url) {
        case '/user/style.css':
            await send(ctx, './static/style.css');
            break;
        case '/user/bundle.js':
            await send(ctx, './static/bundle.js');
            break;
        case '/user/style.css.map':
            await send(ctx, './static/style.css.map');
            break;
        default:
            await send(ctx, './static/index.html');

            break;
    }
});

export default front;
