import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const { PORT, HOST } = process.env;

export default function(app) {
    app.listen(PORT, () => console.log(`started in http://${HOST}:${PORT}`));
}
