"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMealRecordByIdResolver = void 0;
const MealRecordModel_1 = __importDefault(require("../../../../models/MealRecordModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const removeMealRecordByIdResolver = async (_, { userId, recordId }) => {
    const userIdObjectId = new mongoose_1.default.Types.ObjectId(userId);
    const recordIdObject = new mongoose_1.default.Types.ObjectId(recordId);
    try {
        const user = await MealRecordModel_1.default.findOne({
            userId,
        });
        if (!user) {
            throw new Error('User not found');
        }
        const filtered = user.records.filter((record) => { var _a; return ((_a = record._id) === null || _a === void 0 ? void 0 : _a.toString()) !== recordId; });
        console.log(filtered);
        //@ts-ignore
        user.records = filtered;
        await user.save();
        return 'success';
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.removeMealRecordByIdResolver = removeMealRecordByIdResolver;
