import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'
import { User as UserType } from '../../../../types/graphqlTypesGenerated'
import User from '../../../../models/UserModel'

export const getUserDataResolver = async (
    _: unknown,
    __: unknown,
    { authUser }: CustomContext
): Promise<UserType> => {
    if (!authUser) {
        throw new GraphQLError('Unauthorized')
    }
    try {
        const user = await User.findOne({ _id: authUser.userId })
        return { ...(user?.toObject() as UserType) }
    } catch (error) {
        console.log(error)
        throw error
    }
}
