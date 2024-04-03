import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
import {
    MutationSignUpArgs,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createToken } from '../../../../libs/jwt'

export const signUpResolver = async (
    _: unknown,
    { authData }: MutationSignUpArgs
): Promise<UserType> => {
    const { email, password, passwordConfirm } = authData
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

        if (password.length < 8) {
            throw new GraphQLError('Password is too short!', {
                extensions: {
                    code: 'USER_PASSWORD_SHORT',
                    formInput: 'password',
                    message: 'Password is too short!',
                },
            })
        }

        if (password !== passwordConfirm) {
            throw new GraphQLError('Passwords do not match!', {
                extensions: {
                    code: 'USER_PASSWORDS_NOT_MATCH',
                    formInput: 'passwordConfirm',
                    message: 'Passwords do not match!',
                },
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            method: 'classic',
            password: hashedPassword,
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
