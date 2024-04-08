import {
    MutationDeleteStressRecordArgs,
    MutationEditStressRecordArgs,
    StressRecordData,
} from '../../../../types/graphqlTypesGenerated'
import { CustomContext } from '../../../..'
import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import StressData from '../../../../models/StressDataModel'

export const editStressRecordResolver = async (
    _: unknown,
    { date, updatedRecord }: MutationEditStressRecordArgs,
    { authUser }: CustomContext
): Promise<StressRecordData> => {
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

        const document = await StressData.findOne({
            _id: user._id,
        })

        if (!document) {
            throw new Error('User not found')
        }

        const recordIndex = document.records.findIndex(
            (record) => record.timestamp?.getTime() === new Date(date).getTime()
        )

        if (recordIndex === -1) {
            throw new Error('Meal record not found.')
        }

        //@ts-ignore
        document.records[recordIndex] = {
            ...document.records[recordIndex],
            ...updatedRecord,
        }

        await document.save()
        console.log('Updated')

        return {
            timestamp: document.records[recordIndex].timestamp?.toISOString()!,
            value: document.records[recordIndex].value!,
            note: String(document.records[recordIndex].note),
        }
    } catch (error) {
        console.log(error)
        throw new GraphQLError('Stress record update failed', {
            extensions: { code: 'STRESS_UPDATE_FAIL' },
        })
    }
}
