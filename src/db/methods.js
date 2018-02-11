// @flow
import type { UserType } from '../types.flow';
import User from '../models/user';
import bcrypt from 'bcrypt-nodejs';
import { createToken } from 'jwt-koa';

export async function check(details) {
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
