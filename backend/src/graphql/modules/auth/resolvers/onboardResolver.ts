import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationOnboardArgs,
    OnboardedUser,
} from '../../../../types/graphqlTypesGenerated'
import jwt from 'jsonwebtoken'

export const onboardResolver = async (
    _: unknown,
    { onboardData }: MutationOnboardArgs
): Promise<OnboardedUser> => {
    const { email } = onboardData

    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            })
        }
        Object.assign(user, onboardData)

        const token = jwt.sign(
            { user_id: user._id },
            process.env.ACCESS_JWT_SECRET!!,
            { expiresIn: '30d' }
        )

        user.onboarded = true
        const onboardedUser = await user.save()
        return { ...onboardedUser.toObject(), token }
    } catch (error) {
        console.log(error)
        throw new GraphQLError('ONBOARD_FAIL', {
            extensions: { code: 'ONBOARD_FAILED' },
        })
    }
}
