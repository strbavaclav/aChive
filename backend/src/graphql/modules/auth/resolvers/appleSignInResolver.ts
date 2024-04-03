import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationAppleSignInArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import jwt from 'jsonwebtoken'

interface DecodedToken {
    email?: string
}

export const appleSignInResolver = async (
    _: unknown,
    { token }: MutationAppleSignInArgs
): Promise<UserType> => {
    const decodedToken = jwt.decode(token) as DecodedToken
    const email = decodedToken?.email

    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new GraphQLError('User with this email doesnt exist!', {
                extensions: {
                    formInput: 'email',
                    code: 'USER_NOT_FOUND',
                    message: 'User with this email doesnt exist!',
                },
            })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_JWT_SECRET!!,
            { expiresIn: '30d' }
        )

        return { ...user.toObject(), token }
    } catch (error) {
        console.log(error)
        throw error
    }
}
