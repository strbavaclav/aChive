import { GraphQLError } from 'graphql'
import {
    MutationUpdateUserDataArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import { CustomContext } from '../../../..'
import User from '../../../../models/UserModel'

export const updateUserDataResolver = async (
    _: unknown,
    { newUserData }: MutationUpdateUserDataArgs,
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

        const { name: changeName, stringValue, floatValue } = newUserData

        const updateData = stringValue
            ? { [changeName]: stringValue }
            : { [changeName]: floatValue }

        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $set: updateData },
            {
                new: true, // Return the updated document
                runValidators: true, // Ensure that the update operation follows your schema's validation rules
            }
        )

        if (!updatedUser) {
            console.log('User not found or update failed')
            throw new GraphQLError('Update failed or user not found')
        }

        return { ...(updatedUser.toObject() as UserType) }
    } catch (error) {
        console.error('Error updating user data:', error)
        throw new GraphQLError('Error updating user data')
    }
}
