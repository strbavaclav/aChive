import { MutationDeleteStressRecordArgs } from '../../../../types/graphqlTypesGenerated'
import { CustomContext } from '../../../..'
import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import StressData from '../../../../models/StressDataModel'

export const deleteStressRecordResolver = async (
    _: unknown,
    { date }: MutationDeleteStressRecordArgs,
    { authUser }: CustomContext
): Promise<string> => {
    console.log(date)
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

        const filtered = document?.records.filter((record) => {
            return record.timestamp?.getTime() !== new Date(date).getTime()
        })

        //@ts-ignore
        document.records = filtered

        await document.save()

        return 'success'
    } catch (error) {
        console.log(error)
        throw new GraphQLError('Stress record deleting fail', {
            extensions: { code: 'STRESS_RECORD_DELETE_FAIL' },
        })
    }
}
