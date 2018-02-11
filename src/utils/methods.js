// @flow
import type { UserType } from '../types.flow';
import User from '../models/user';

async function register(data: UserType) {
    const user = new User({
        username: data.username,
        name: data.name,
        age: data.age,
        gender: data.gender,
        image: data.image,
    });
}

export default {
    register,
};
