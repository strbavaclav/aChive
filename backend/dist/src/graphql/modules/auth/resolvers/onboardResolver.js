"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardResolver = void 0;
const graphql_1 = require("graphql");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const onboardResolver = async (_, { onboardData }) => {
    const { email } = onboardData;
    try {
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            throw new graphql_1.GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            });
        }
        Object.assign(user, onboardData);
        user.onboarded = true;
        const onboardedUser = await user.save();
        return onboardedUser.toObject();
    }
    catch (error) {
        console.log(error);
        throw new graphql_1.GraphQLError('ONBOARD_FAIL', {
            extensions: { code: 'ONBOARD_FAILED' },
        });
    }
};
exports.onboardResolver = onboardResolver;
