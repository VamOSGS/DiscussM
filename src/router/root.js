import Router from 'koa-router';
import jwtKoa from 'jwt-koa';
import multer from 'koa-multer';
import path from 'path';

const root = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, ` ${Date.now()}&${file.originalname}`);
    },
});
const upload = multer({ storage });

root.post('/upload', upload.single('file'), async (ctx) => {
    const { file } = ctx.req;
    console.log(file);
});

root.get('/check', jwtKoa.middleware, (ctx) => {
    ctx.body = 'SECRET';
});
root.get('/', async (ctx) => {
    ctx.body = ` <h1>Working...</h1>`;
});

export default root;
