import combine from 'koa-combine-routers';
import root from './root';

const router = combine([root]);

export default router;
