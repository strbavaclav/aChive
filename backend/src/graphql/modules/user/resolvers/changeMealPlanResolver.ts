import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationChangeMealPlanArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import { CustomContext } from '../../../..'
import mongoose from 'mongoose'

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

        if (!newPlan) {
            throw new GraphQLError('User not exist')
        }
        const updatedPlan = newPlan.map((meal) => {
            if (meal._id) {
                return {
                    ...meal,
                    _id: new mongoose.Types.ObjectId(meal._id),
                }
            } else {
                return {
                    ...meal,
                    _id: new mongoose.Types.ObjectId(),
                }
            }
        })

        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            {
                $set: {
                    plan: updatedPlan,
                },
            },
            { new: true, upsert: true }
        )

        if (!updatedUser) {
            throw new GraphQLError('Update failed')
        }

        console.log('Updated Plan:', JSON.stringify(updatedUser.plan, null, 2))

        return updatedUser.toObject()
    } catch (error) {
        console.log(error)
        throw new GraphQLError('CHANGE_PLAN_FAILED', {
            extensions: { code: 'CHANGE_PLAN_FAILED' },
        })
    }
}
