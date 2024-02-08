import { signInResolver, signUpResolver } from './modules/auth/authResolver'
import { type Resolvers } from '../types/graphqlTypesGenerated'

const resolvers: Resolvers = {
    Mutation: {
        signUp: signUpResolver,
        signIn: signInResolver,
    },
}

export default resolvers
