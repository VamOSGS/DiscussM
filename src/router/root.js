import Router from 'koa-router';
import jwtKoa from 'jwt-koa';

import { check } from '../db/methods';

const root = new Router();

root.get('/check', jwtKoa.middleware, (ctx) => {
    ctx.body = 'SECRET';
});
root.get('/user/:username', async (ctx) => {
    const { username } = ctx.params;
    const user = await check({ username });
    if (user == null) {
        ctx.body = {
            success: false,
            message: 'User not found',
        };
    } else {
        ctx.body = {
            success: true,
            id: user._id,
            username: user.username,
            image: user.image,
            name: user.name,
            gender: user.gender,
            age: user.age,
        };
    }
});
root.get('/', async (ctx) => {
    ctx.body = ` <h1>Working...</h1>`;
});

export default root;
