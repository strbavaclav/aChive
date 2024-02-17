import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationSignInArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signInResolver = async (
    _: unknown,
    { authData }: MutationSignInArgs
): Promise<UserType> => {
    const { email, password } = authData

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

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new GraphQLError('Invalid password!', {
                extensions: {
                    formInput: 'password',
                    code: 'INVALID_PASSWORD',
                    message: 'Invalid password!',
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
