"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authResolver_1 = require("./modules/auth/authResolver");
const resolvers = {
    Mutation: {
        signUp: authResolver_1.signUpResolver,
        signIn: authResolver_1.signInResolver,
    },
};
exports.default = resolvers;
