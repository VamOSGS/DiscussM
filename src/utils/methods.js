// @flow
import type { UserType } from '../types.flow';
import User from '../models/user';
import bcrypt from 'bcrypt-nodejs';

export async function register(data: UserType) {
    const user = await new User({
        username: data.username,
        name: data.name,
        age: data.age,
        gender: data.gender,
        image: data.image,
    });
    const salt: string = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(data.password, salt);
    return user.save();
}

export async function check(username: string) {
    return User.findOne({ username });
}
