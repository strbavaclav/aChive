"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpResolver = void 0;
const graphql_1 = require("graphql");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUpResolver = async (_, { authData }) => {
    const { email, password, passwordConfirm } = authData;
    try {
        const existingUser = await UserModel_1.default.findOne({
            $or: [{ email }],
        });
        if (existingUser) {
            throw new graphql_1.GraphQLError('User already exists with given email', {
                extensions: { code: 'USER_EMAIL_EXISTS' },
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new UserModel_1.default({
            email,
            password: hashedPassword,
        });
        console.log(newUser);
        await newUser.save();
        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new graphql_1.GraphQLError('SIGN_UP_FAIL', {
            extensions: { code: 'AUTH_FAILED' },
        });
    }
};
exports.signUpResolver = signUpResolver;
