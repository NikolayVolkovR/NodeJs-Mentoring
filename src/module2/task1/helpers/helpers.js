"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyObject = void 0;
exports.isEmptyObject = function (obj) { return Object.keys(obj).length === 0 && obj.constructor === Object; };
