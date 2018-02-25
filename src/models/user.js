import mongoose, { Schema } from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String },
    gender: { type: String, required: true },
    image: { type: String },
    age: { type: Number },
    fbid: { type: String },
    email: { type: String, required: true },
    password: { type: String }, // social auth will not have password
});

const user = mongoose.model('User', UserSchema);

export default user;
