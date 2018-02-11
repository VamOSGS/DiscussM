if (process.env.NODE_ENV !== 'production') require('dotenv').config();
console.log(process.env.NODE_ENV);

const { PORT, HOST } = process.env;

export default function(app) {
    app.listen(PORT || 8000, () =>
        console.log(`started in http://${HOST}:${PORT}`)
    );
}
