import combine from 'koa-combine-routers';
import root from './root';
import auth from './auth';
import messages from './messages';

const router = combine([root, messages, auth]);

export default router;
