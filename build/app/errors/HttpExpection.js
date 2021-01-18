"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
class HttpExpection extends Error {
    constructor(statusCode, httpData) {
        super(httpData.message);
        this.name = 'HttpExpection';
        this.statusCode = statusCode;
        this.data = httpData.data || null;
    }
}
exports.default = HttpExpection;
