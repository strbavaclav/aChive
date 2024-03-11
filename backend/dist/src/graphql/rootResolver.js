"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = require("./modules/auth/resolvers");
const addStressRecordResolver_1 = require("./modules/stress/resolvers/addStressRecordResolver");
const getUserDataResolver_1 = require("./modules/user/resolvers/getUserDataResolver");
const addMealRecordResolver_1 = require("./modules/planner/resolvers/addMealRecordResolver");
const getMealRecordsByDate_1 = require("./modules/planner/resolvers/getMealRecordsByDate");
const removeMealRecordById_1 = require("./modules/planner/resolvers/removeMealRecordById");
const updateMealRecordResolver_1 = require("./modules/planner/resolvers/updateMealRecordResolver");
const setShoppingListSettingsResolver_1 = require("./modules/shopping/resolvers/setShoppingListSettingsResolver");
const resolvers = {
    Mutation: {
        //auth
        signUp: resolvers_1.signUpResolver,
        signIn: resolvers_1.signInResolver,
        onboard: resolvers_1.onboardResolver,
        //stress
        addStressRecord: addStressRecordResolver_1.addStressRecordResolver,
        //mealRecords
        addMealRecord: addMealRecordResolver_1.addMealRecordResolver,
        removeMealRecordById: removeMealRecordById_1.removeMealRecordByIdResolver,
        updateMealRecordById: updateMealRecordResolver_1.updateMealRecordByIdResolver,
        //shoppingList
        setShoppingListSettings: setShoppingListSettingsResolver_1.setShoppingListSettingsResolver,
    },
    Query: {
        //user
        getUserData: getUserDataResolver_1.getUserDataResolver,
        //mealRecords
        getMealRecordsByDate: getMealRecordsByDate_1.getMealRecordsByDate,
    },
};
exports.default = resolvers;
