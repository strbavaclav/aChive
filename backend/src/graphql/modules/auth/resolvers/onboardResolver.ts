import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationOnboardArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'

export const onboardResolver = async (
    _: unknown,
    { onboardData }: MutationOnboardArgs
): Promise<UserType> => {
    const { email } = onboardData

    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            })
        }
        Object.assign(user, onboardData)

        user.onboarded = true
        const onboardedUser = await user.save()
        return onboardedUser.toObject()
    } catch (error) {
        console.log(error)
        throw new GraphQLError('ONBOARD_FAIL', {
            extensions: { code: 'ONBOARD_FAILED' },
        })
    }
}
