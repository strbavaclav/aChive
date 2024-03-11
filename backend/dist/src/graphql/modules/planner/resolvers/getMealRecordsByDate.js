"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMealRecordsByDate = void 0;
const MealRecordModel_1 = __importDefault(require("../../../../models/MealRecordModel"));
const getMealRecordsByDate = async (_, { userId, date }) => {
    try {
        const dayStart = new Date(date);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        const timezoneOffset = dayEnd.getTimezoneOffset() * 60000;
        const adjustedDayEnd = new Date(dayEnd.getTime() - timezoneOffset);
        const document = await MealRecordModel_1.default.findOne({
            userId,
        });
        if (!document) {
            return [];
        }
        console.log(dayStart, adjustedDayEnd);
        const filteredRecords = document.records
            .filter((record) => {
            const recordDate = record.loggedDateTime;
            return recordDate >= dayStart && recordDate <= adjustedDayEnd;
        })
            .map((record) => (Object.assign(Object.assign({}, record), { _id: String(record._id), mealId: String(record.mealId), loggedDateTime: record.loggedDateTime.toISOString(), description: record.description, size: record.size, cooked: record.cooked })));
        return filteredRecords;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getMealRecordsByDate = getMealRecordsByDate;
