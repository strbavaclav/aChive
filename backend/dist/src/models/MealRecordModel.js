"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mealRecordSchema = new mongoose_1.default.Schema({
    mealId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    loggedDateTime: {
        type: Date,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    cooked: {
        type: Boolean,
        required: true,
    },
});
const mealRecordDataSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    records: [mealRecordSchema],
});
const MealRecordData = mongoose_1.default.model('MealRecordData', mealRecordDataSchema);
exports.default = MealRecordData;
