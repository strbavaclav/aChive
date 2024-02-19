import {
    onboardResolver,
    signInResolver,
    signUpResolver,
} from './modules/auth/resolvers'
import { type Resolvers } from '../types/graphqlTypesGenerated'
import { addStressRecordResolver } from './modules/stress/resolvers/addStressRecordResolver'
import { getUserDataResolver } from './modules/user/resolvers/getUserDataResolver'

const resolvers: Resolvers = {
    Mutation: {
        //auth
        signUp: signUpResolver,
        signIn: signInResolver,
        onboard: onboardResolver,

        //stress
        addStressRecord: addStressRecordResolver,
    },

    Query: {
        //user
        getUserData: getUserDataResolver,
    },
}

export default resolvers
