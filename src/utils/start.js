if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import startDb from './db';

const { PORT, HOST } = process.env;

export default function(app) {
    startDb();
    app.listen(PORT || 8000, () =>
        console.log(`started in http://${HOST}:${PORT}`)
    );
}
