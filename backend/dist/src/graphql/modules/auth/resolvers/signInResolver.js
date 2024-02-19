"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInResolver = void 0;
const graphql_1 = require("graphql");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signInResolver = async (_, { authData }) => {
    const { email, password } = authData;
    try {
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            throw new graphql_1.GraphQLError('User with this email doesnt exist!', {
                extensions: {
                    formInput: 'email',
                    code: 'USER_NOT_FOUND',
                    message: 'User with this email doesnt exist!',
                },
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new graphql_1.GraphQLError('Invalid password!', {
                extensions: {
                    formInput: 'password',
                    code: 'INVALID_PASSWORD',
                    message: 'Invalid password!',
                },
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.ACCESS_JWT_SECRET, { expiresIn: '30d' });
        return Object.assign(Object.assign({}, user.toObject()), { token });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.signInResolver = signInResolver;
