"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMealRecordByIdResolver = void 0;
const graphql_1 = require("graphql");
const MealRecordModel_1 = __importDefault(require("../../../../models/MealRecordModel"));
const updateMealRecordByIdResolver = async (_, { userId, recordId, updatedRecord }) => {
    try {
        let mealRecordData = await MealRecordModel_1.default.findOne({ userId });
        if (!mealRecordData) {
            throw new Error('Meal record data not found.');
        }
        const recordIndex = mealRecordData.records.findIndex((record) => String(record._id) === recordId);
        if (recordIndex === -1) {
            throw new Error('Meal record not found.');
        }
        //@ts-ignore
        mealRecordData.records[recordIndex] = Object.assign(Object.assign({}, mealRecordData.records[recordIndex]), updatedRecord);
        await mealRecordData.save();
        return Object.assign(Object.assign({}, mealRecordData.toObject()), { records: mealRecordData.records.map((record) => (Object.assign(Object.assign({}, record), { _id: String(record._id), mealId: String(record.mealId), size: record.size, cooked: record.cooked, loggedDateTime: record.loggedDateTime.toISOString() }))) });
    }
    catch (error) {
        console.log(error);
        throw new graphql_1.GraphQLError('UPDATE_FAIL', {
            extensions: { code: 'UPDATE_FAILED' },
        });
    }
};
exports.updateMealRecordByIdResolver = updateMealRecordByIdResolver;
