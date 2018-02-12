import mongoose, { Schema } from 'mongoose';
import bluebird from 'bluebird';
mongoose.Promise = bluebird;

const MessageSchema = new Schema({
    user: {
        id: { type: String, required: true },
        username: { type: String, required: true },
    },
    messages: { type: Array },
});

const message = mongoose.model('Message', MessageSchema);

export default message;
