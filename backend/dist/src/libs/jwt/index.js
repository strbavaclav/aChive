"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAndVerifyJWT = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (content) => {
    return jsonwebtoken_1.default.sign(content, process.env.ACCESS_JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.createToken = createToken;
const parseAndVerifyJWT = (token) => {
    const tokenParts = token.split(' ')[1];
    if (!tokenParts) {
        return null;
    }
    try {
        return jsonwebtoken_1.default.verify(tokenParts, process.env.ACCESS_JWT_SECRET);
    }
    catch (err) {
        console.log(err);
        return null;
    }
};
exports.parseAndVerifyJWT = parseAndVerifyJWT;
