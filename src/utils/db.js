if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import mongoose from 'mongoose';

const { DB_USER, DB_USER_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

export default function() {
    mongoose.connect(
        `mongodb://${DB_USER}:${DB_USER_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
}
