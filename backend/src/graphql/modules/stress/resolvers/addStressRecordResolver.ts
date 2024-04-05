import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'
import {
    MutationAddStressRecordArgs,
    StressRecordData,
    StressRecords,
} from '../../../../types/graphqlTypesGenerated'
import User from '../../../../models/UserModel'
import StressData from '../../../../models/StressDataModel'

export const addStressRecordResolver = async (
    _: unknown,
    { stressRecordData }: MutationAddStressRecordArgs,
    { authUser }: CustomContext
): Promise<StressRecords> => {
    if (!authUser) {
        throw new GraphQLError('Unauthorized')
    }

    const { timestamp, value, note } = stressRecordData

    try {
        const user = await User.findOne({ email: authUser })
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            })
        }

        const updatedStressData = await StressData.findOneAndUpdate(
            { _id: user._id },
            {
                $push: { stressJournal: { timestamp, value, note } },
            },
            { new: true, upsert: true }
        )

        const stressRecordsFormatted = updatedStressData.records.map(
            (record) => ({
                ...record,
                timestamp: record.timestamp
                    ? record.timestamp.toISOString()
                    : new Date().toISOString(),
                value: record.value,
                note: record.note,
            })
        )

        return {
            stressRecords: stressRecordsFormatted as StressRecordData[],
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
