import combine from 'koa-combine-routers';
import root from './root';
import auth from './auth';

const router = combine([root, auth]);

export default router;
