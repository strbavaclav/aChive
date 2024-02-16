"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInResolver = exports.signUpResolver = void 0;
const error_1 = require("graphql/error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const signUpResolver = async (_, { authData }) => {
    const { email, password, passwordConfirm } = authData;
    try {
        const existingUser = await UserModel_1.default.findOne({
            $or: [{ email }],
        });
        if (existingUser) {
            throw new error_1.GraphQLError('User already exists with given email', {
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
        throw new error_1.GraphQLError('SIGN_UP_FAIL', {
            extensions: { code: 'AUTH_FAILED' },
        });
    }
};
exports.signUpResolver = signUpResolver;
const signInResolver = async (_, { authData }) => {
    const { email, password } = authData;
    try {
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            throw new error_1.GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new error_1.GraphQLError('Invalid password', {
                extensions: { code: 'INVALID_PASSWORD' },
            });
        }
        const token = jsonwebtoken_1.default.sign({ user_id: user._id }, process.env.ACCESS_JWT_SECRET, { expiresIn: '30d' });
        return {
            email: user.email,
            password: user.password,
            username: user.username,
            token: token,
        };
    }
    catch (error) {
        console.log(error);
        throw new error_1.GraphQLError('SIGN_UP_FAIL', {
            extensions: { code: 'AUTH_FAILED' },
        });
    }
};
exports.signInResolver = signInResolver;
