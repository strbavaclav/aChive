"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpResolver = void 0;
const graphql_1 = require("graphql");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../../../libs/jwt");
const signUpResolver = async (_, { authData }) => {
    const { email, password, passwordConfirm } = authData;
    try {
        const existingUser = await UserModel_1.default.findOne({
            email,
        });
        if (existingUser) {
            throw new graphql_1.GraphQLError('User already exists with given email', {
                extensions: {
                    code: 'USER_EMAIL_EXISTS',
                    formInput: 'email',
                    message: 'User already exists with given email!',
                },
            });
        }
        if (password.length < 8) {
            throw new graphql_1.GraphQLError('Password is too short!', {
                extensions: {
                    code: 'USER_PASSWORD_SHORT',
                    formInput: 'password',
                    message: 'Password is too short!',
                },
            });
        }
        if (password !== passwordConfirm) {
            throw new graphql_1.GraphQLError('Passwords do not match!', {
                extensions: {
                    code: 'USER_PASSWORDS_NOT_MATCH',
                    formInput: 'passwordConfirm',
                    message: 'Passwords do not match!',
                },
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new UserModel_1.default({
            email,
            password: hashedPassword,
            onboarded: false,
        });
        const token = (0, jwt_1.createToken)({ userId: newUser._id });
        await newUser.save();
        return Object.assign(Object.assign({}, newUser.toObject()), { token });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.signUpResolver = signUpResolver;
