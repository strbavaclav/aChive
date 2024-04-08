import {
    DateStressRecord,
    QueryGetStressRecordsByDateArgs,
} from '../../../../types/graphqlTypesGenerated'
import { CustomContext } from '../../../..'
import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import StressData from '../../../../models/StressDataModel'

export const getStressRecordsByDateResolver = async (
    _: unknown,
    { date }: QueryGetStressRecordsByDateArgs,
    { authUser }: CustomContext
): Promise<DateStressRecord> => {
    if (!authUser) {
        throw new GraphQLError('Unauthorized')
    }
    try {
        const user = await User.findOne({ _id: authUser.userId })
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            })
        }

        const dayStart = new Date(date)
        dayStart.setHours(0, 0, 0, 0)

        const dayEnd = new Date(date)
        dayEnd.setHours(23, 59, 59, 999)
        const timezoneOffset = dayEnd.getTimezoneOffset() * 60000
        const adjustedDayEnd = new Date(dayEnd.getTime() - timezoneOffset)

        const document = await StressData.findOne({
            _id: user._id,
        })

        const dateRecord = document?.records.find(
            (record) =>
                record.timestamp! >= dayStart &&
                record.timestamp! <= adjustedDayEnd
        )

        if (dateRecord) {
            const data = {
                timestamp: dateRecord.timestamp?.toISOString()!,
                note: dateRecord.note,
                value: dateRecord.value!,
            }

            return { record: data }
        } else {
            return { record: undefined }
        }
    } catch (error) {
        console.log(error)
        throw new GraphQLError('Get Stress record data fail', {
            extensions: { code: 'STRESS_RECORD_GET_FAIL' },
        })
    }
}
