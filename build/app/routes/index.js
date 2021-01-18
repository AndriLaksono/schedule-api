"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Import Routes
const _routes_schedule_1 = __importDefault(require("../services/schedule/_routes.schedule"));
const router = express_1.Router();
exports.default = {
    schedule: router.use('/schedule', _routes_schedule_1.default),
};
