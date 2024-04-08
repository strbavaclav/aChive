import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'
import User from '../../../../models/UserModel'
import StressData from '../../../../models/StressDataModel'
import MealRecordData from '../../../../models/MealRecordModel'

export const resetUserRecordsResolver = async (
    _: unknown,
    __: unknown,
    { authUser }: CustomContext
): Promise<string> => {
    if (!authUser) {
        throw new GraphQLError('Unauthorized')
    }
    try {
        const user = await User.findOne({ _id: authUser.userId })
        if (!user) {
            throw new GraphQLError('User not exist')
        }

        await StressData.deleteOne({ _id: user._id })

        await MealRecordData.deleteOne({ userId: user._id })

        return 'User records reset successfully.'
    } catch (error) {
        console.error('Error reseting user records:', error)
        throw new GraphQLError('Error reseting user records')
    }
}
