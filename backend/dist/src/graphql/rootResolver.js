"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = require("./modules/auth/resolvers");
const resolvers = {
    Mutation: {
        //auth
        signUp: resolvers_1.signUpResolver,
        signIn: resolvers_1.signInResolver,
        onboard: resolvers_1.onboardResolver,
        verifyToken: resolvers_1.verifyTokenResolver,
    },
};
exports.default = resolvers;
