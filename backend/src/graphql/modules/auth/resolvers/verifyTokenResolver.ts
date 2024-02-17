import { GraphQLError } from 'graphql'
import { MutationVerifyTokenArgs } from '../../../../types/graphqlTypesGenerated'
import jwt from 'jsonwebtoken'

export const verifyTokenResolver = async (
    _: unknown,
    { token }: MutationVerifyTokenArgs
): Promise<boolean> => {
    try {
        jwt.verify(token, process.env.ACCESS_JWT_SECRET!!)
        return true
    } catch (error) {
        console.log(error)
        throw new GraphQLError('ONBOARD_FAIL', {
            extensions: { code: 'ONBOARD_FAILED' },
        })
    }
}
