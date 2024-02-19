"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataResolver = void 0;
const graphql_1 = require("graphql");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const getUserDataResolver = async (_, __, { authUser }) => {
    if (!authUser) {
        throw new graphql_1.GraphQLError('Unauthorized');
    }
    try {
        const user = await UserModel_1.default.findOne({ _id: authUser.userId });
        return Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject());
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getUserDataResolver = getUserDataResolver;
