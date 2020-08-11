"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var uuid_1 = require("uuid");
exports.users = [
    {
        id: uuid_1.v4(),
        login: 'vasily',
        password: 'vasily',
        age: 18,
        isDeleted: false,
    },
    {
        id: uuid_1.v4(),
        login: 'valya',
        password: 'valya',
        age: 19,
        isDeleted: false,
    },
    {
        id: uuid_1.v4(),
        login: 'vadim',
        password: 'vadim',
        age: 25,
        isDeleted: false,
    },
    {
        id: uuid_1.v4(),
        login: 'slava',
        password: 'slava',
        age: 32,
        isDeleted: false,
    }
];
