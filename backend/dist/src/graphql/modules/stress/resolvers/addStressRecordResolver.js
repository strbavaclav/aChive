"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStressRecordResolver = void 0;
const graphql_1 = require("graphql");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const StressDataModel_1 = __importDefault(require("../../../../models/StressDataModel"));
const addStressRecordResolver = async (_, { stressRecordData }, { authUser }) => {
    if (!authUser) {
        throw new graphql_1.GraphQLError('Unauthorized');
    }
    const { userEmail, timestamp, value, note } = stressRecordData;
    try {
        const user = await UserModel_1.default.findOne({ email: userEmail });
        if (!user) {
            throw new graphql_1.GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            });
        }
        const updatedStressData = await StressDataModel_1.default.findOneAndUpdate({ _id: user._id }, {
            $push: { stressJournal: { timestamp, value, note } },
        }, { new: true, upsert: true });
        const stressRecordsFormatted = updatedStressData.stressJournal.map((record) => (Object.assign(Object.assign({}, record), { timestamp: record.timestamp
                ? record.timestamp.toISOString()
                : new Date().toISOString(), value: record.value, note: record.note })));
        return {
            userEmail: userEmail,
            stressRecords: stressRecordsFormatted,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.addStressRecordResolver = addStressRecordResolver;
