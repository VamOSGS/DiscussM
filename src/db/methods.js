// @flow
import type { UserType } from '../types.flow';
import bcrypt from 'bcrypt-nodejs';
import { createToken } from 'jwt-koa';
import { User, Message } from '../models/index.js';
import type { MessageType } from '../types.flow';

export async function check(details: { username?: string, email?: string }) {
    return User.findOne(details);
}

export async function register(data: UserType) {
    return check({ username: data.username }).then((res) => {
        if (res === null) {
            return check({ email: data.email }).then(async (res2) => {
                if (res2 === null) {
                    const user = await new User({
                        username: data.username,
                        name: data.name,
                        age: data.age,
                        email: data.email,
                        gender: data.gender,
                        image: data.image,
                    });
                    const salt: string = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(data.password, salt);
                    return user.save().then((user) => {
                        const token = createToken({ user }, '10m');
                        return { success: true, user, token };
                    });
                } else {
                    return { success: false, message: 'Email registred!' };
                }
            });
        } else {
            return { success: false, message: 'Username taken!' };
        }
    });
}

export async function login(data: { username: string, password: string }) {
    return check({ username: data.username }).then((user) => {
        if (user === null) {
            return { success: false, message: 'User not found!' };
        } else {
            const passCheck = bcrypt.compareSync(data.password, user.password);
            if (passCheck === true) {
                const token = createToken({ user }, '10m');
                return { success: true, user, token };
            } else {
                return { success: false, message: 'Wrong password!' };
            }
        }
    });
}

export function sendMessage(data: MessageType): Promise<any> {
    return new Promise((resolve, reject) => {
        check({ username: data.to.username }).then((user) => {
            if (user === null) {
                reject({
                    success: false,
                    message: 'User not found!',
                });
            } else {
                Message.findOneAndUpdate(
                    { user: data.to },
                    {
                        $push: { messages: data.message },
                    },
                    { new: true, safe: true, upsert: true },
                    (err, res) => {
                        if (err) {
                            reject({
                                success: false,
                                message: 'Message isn\'t sent!',
                            });
                        }
                        resolve({ success: true, res });
                    }
                );
            }
        });
    });
}

export async function getMessages(user: { id: string, username: string }) {
    return Message.findOne({ user });
}
