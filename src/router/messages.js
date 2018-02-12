import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { sendMessage, getMessages } from '../db/methods';

const messages = new Router();

messages.post('/send', bodyParser(), async (ctx) => {
    console.log(ctx.request.body);
    await sendMessage(ctx.request.body)
        .then((res) => {
            ctx.response.body = res;
        })
        .catch((e) => {
            ctx.response.body = e;
        });
});

messages.patch('/messages', bodyParser(), async (ctx) => {
    await getMessages(ctx.request.body).then((res) => {
        ctx.response.body = res;
    });
});

export default messages;
