// @flow

export type UserType = {
    username: string,
    name: string,
    image: string,
    gender: string,
    age: number,
    email: string,
    password: string,
};

export type MessageType = {
    to: {
        username: string,
        id: string,
    },
    message: {
        date: Date,
        message: string,
    },
};
