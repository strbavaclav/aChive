import {
    onboardResolver,
    signInResolver,
    signUpResolver,
    verifyTokenResolver,
} from './modules/auth/resolvers'
import { type Resolvers } from '../types/graphqlTypesGenerated'

const resolvers: Resolvers = {
    Mutation: {
        //auth
        signUp: signUpResolver,
        signIn: signInResolver,
        onboard: onboardResolver,
        verifyToken: verifyTokenResolver,
    },
}

export default resolvers
