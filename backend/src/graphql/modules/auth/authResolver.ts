import { GraphQLError } from 'graphql/error'
import {
    MutationSignInArgs,
    MutationSignUpArgs,
    User as UserType,
} from '../../../types/graphqlTypesGenerated'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../../models/UserModel'

export const signUpResolver = async (
    _: unknown,
    { authData }: MutationSignUpArgs
): Promise<UserType> => {
    const { email, password, passwordConfirm } = authData
    try {
        const existingUser = await User.findOne({
            $or: [{ email }],
        })
        if (existingUser) {
            throw new GraphQLError('User already exists with given email', {
                extensions: { code: 'USER_EMAIL_EXISTS' },
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            password: hashedPassword,
        })

        console.log(newUser)

        await newUser.save()

        return newUser
    } catch (error) {
        console.log(error)
        throw new GraphQLError('SIGN_UP_FAIL', {
            extensions: { code: 'AUTH_FAILED' },
        })
    }
}

export const signInResolver = async (
    _: unknown,
    { authData }: MutationSignInArgs
): Promise<UserType> => {
    const { email, password } = authData

    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new GraphQLError('Invalid password', {
                extensions: { code: 'INVALID_PASSWORD' },
            })
        }

        const token = jwt.sign(
            { user_id: user._id },
            process.env.ACCESS_JWT_SECRET!!,
            { expiresIn: '30d' }
        )

        return {
            email: user.email,
            password: user.password,
            username: user.username,
            token: token,
        }
    } catch (error) {
        console.log(error)
        throw new GraphQLError('SIGN_UP_FAIL', {
            extensions: { code: 'AUTH_FAILED' },
        })
    }
}
