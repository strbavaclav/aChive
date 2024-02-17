"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = require("./modules/auth/resolvers");
const addStressRecordResolver_1 = require("./modules/stress/resolvers/addStressRecordResolver");
const getUserDataResolver_1 = require("./modules/user/resolvers/getUserDataResolver");
const resolvers = {
    Mutation: {
        //auth
        signUp: resolvers_1.signUpResolver,
        signIn: resolvers_1.signInResolver,
        onboard: resolvers_1.onboardResolver,
        //stress
        addStressRecord: addStressRecordResolver_1.addStressRecordResolver,
    },
    Query: {
        //user
        getUserData: getUserDataResolver_1.getUserDataResolver,
    },
};
exports.default = resolvers;
