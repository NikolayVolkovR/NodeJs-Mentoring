"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.handleUserDelete = exports.handleUserCreate = exports.handleUserUpdate = exports.findUsersAutoSuggest = exports.findUserById = void 0;
var data_1 = require("../models/data");
var uuid_1 = require("uuid");
exports.findUserById = function (id) {
    return data_1.users.find(function (user) { return user.id === id; });
};
exports.findUsersAutoSuggest = function (limit, value) {
    return data_1.users.filter(function (_a) {
        var login = _a.login;
        return login.indexOf(value) === 0;
    }).slice(0, limit);
};
exports.handleUserUpdate = function (userId, data) {
    var index = data_1.users.findIndex(function (_a) {
        var id = _a.id;
        return id = userId;
    });
    data_1.users[index] = Object.assign(data_1.users[index], data);
};
exports.handleUserCreate = function (data) {
    var user = __assign(__assign({ id: uuid_1.v4() }, data), { isDeleted: false });
    data_1.users.push(user);
    return user;
};
exports.handleUserDelete = function (userId) {
    data_1.users.forEach(function (user) {
        if (user.id === userId) {
            user.isDeleted = true;
        }
    });
};
exports.handleErrors = function (err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(500).render('error', { error: err });
};
