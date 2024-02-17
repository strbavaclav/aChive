"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenResolver = void 0;
const graphql_1 = require("graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyTokenResolver = async (_, { token }) => {
    try {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_JWT_SECRET);
        return true;
    }
    catch (error) {
        console.log(error);
        throw new graphql_1.GraphQLError('ONBOARD_FAIL', {
            extensions: { code: 'ONBOARD_FAILED' },
        });
    }
};
exports.verifyTokenResolver = verifyTokenResolver;
