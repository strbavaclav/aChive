import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationChangeMealPlanArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import { CustomContext } from '../../../..'

export const changeMealPlanResolver = async (
    _: unknown,
    { newPlan }: MutationChangeMealPlanArgs,
    { authUser }: CustomContext
): Promise<UserType> => {
    if (!authUser) {
        throw new GraphQLError('Unauthorized')
    }
    try {
        const user = await User.findOne({ _id: authUser.userId })
        if (!user) {
            throw new GraphQLError('User not exist')
        }

        await User.findOneAndUpdate(
            { _id: user._id },
            {
                $set: {
                    plan: newPlan,
                },
            },
            { new: true, upsert: true }
        )

        return user.toObject()
    } catch (error) {
        console.log(error)
        throw new GraphQLError('CHANGE_PLAN_FAILED', {
            extensions: { code: 'CHANGE_PLAN_FAILED' },
        })
    }
}
