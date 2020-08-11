import { v4 as uuidv4 } from 'uuid';

export const users = [
    {
        id: uuidv4(),
        login: 'vasily',
        password: 'vasily',
        age: 18,
        isDeleted: false,
    },
    {
        id: uuidv4(),
        login: 'valya',
        password: 'valya',
        age: 19,
        isDeleted: false,
    },
    {
        id: uuidv4(),
        login: 'vadim',
        password: 'vadim',
        age: 25,
        isDeleted: false,
    },
    {
        id: uuidv4(),
        login: 'slava',
        password: 'slava',
        age: 32,
        isDeleted: false,
    }
];