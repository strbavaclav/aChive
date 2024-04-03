import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationAppleSignUpArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import jwt from 'jsonwebtoken'
import { createToken } from '../../../../libs/jwt'

interface DecodedToken {
    email?: string
}

export const appleSignUpResolver = async (
    _: unknown,
    { token }: MutationAppleSignUpArgs
): Promise<UserType> => {
    const decodedToken = jwt.decode(token) as DecodedToken
    const email = decodedToken?.email
    console.log(email)
    try {
        const existingUser = await User.findOne({
            email,
        })
        if (existingUser) {
            throw new GraphQLError('User already exists with given email', {
                extensions: {
                    code: 'USER_EMAIL_EXISTS',
                    formInput: 'email',
                    message: 'User already exists with given email!',
                },
            })
        }

        const newUser = new User({
            email,
            method: 'oAuth',
            onboarded: false,
        })

        const token = createToken({ userId: newUser._id })

        await newUser.save()

        return { ...newUser.toObject(), token }
    } catch (error) {
        console.log(error)
        throw error
    }
}
