import mongoose, { Schema } from 'mongoose';
import bluebird from 'bluebird';
import bcrypt from 'bcrypt-nodejs';

mongoose.Promise = bluebird;

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String },
    gender: { type: String, required: true },
    image: { type: String },
    age: { type: Number, required: true },
    password: { type: String, required: true },
});

const user = mongoose.model('User', UserSchema);

export default user;
