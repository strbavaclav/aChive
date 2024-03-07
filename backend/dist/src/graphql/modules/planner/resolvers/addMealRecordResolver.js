"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMealRecordResolver = void 0;
const graphql_1 = require("graphql");
const MealRecordModel_1 = __importDefault(require("../../../../models/MealRecordModel"));
const addMealRecordResolver = async (_, { userId, mealRecord }) => {
    try {
        let mealRecordData = await MealRecordModel_1.default.findOne({ userId });
        if (mealRecordData) {
            if (mealRecordData.records.some((meal) => String(meal.mealId) !== mealRecord.mealId)) {
                mealRecordData.records.push(mealRecord);
            }
            else {
                throw new Error();
            }
        }
        else {
            mealRecordData = new MealRecordModel_1.default({
                userId,
                records: [mealRecord],
            });
        }
        await mealRecordData.save();
        return Object.assign(Object.assign({}, mealRecordData.toObject()), { records: mealRecordData.records.map((record) => (Object.assign(Object.assign({}, record), { _id: String(record._id), mealId: String(record.mealId), size: record.size, cooked: record.cooked, loggedDateTime: record.loggedDateTime.toISOString() }))) });
    }
    catch (error) {
        console.log(error);
        throw new graphql_1.GraphQLError('ONBOARD_FAIL', {
            extensions: { code: 'ONBOARD_FAILED' },
        });
    }
};
exports.addMealRecordResolver = addMealRecordResolver;
