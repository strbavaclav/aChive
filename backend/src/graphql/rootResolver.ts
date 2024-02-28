import {
    onboardResolver,
    signInResolver,
    signUpResolver,
} from './modules/auth/resolvers'
import { type Resolvers } from '../types/graphqlTypesGenerated'
import { addStressRecordResolver } from './modules/stress/resolvers/addStressRecordResolver'
import { getUserDataResolver } from './modules/user/resolvers/getUserDataResolver'
import { addMealRecordResolver } from './modules/planner/resolvers/addMealRecordResolver'
import { getMealRecordsByDate } from './modules/planner/resolvers/getMealRecordsByDate'

const resolvers: Resolvers = {
    Mutation: {
        //auth
        signUp: signUpResolver,
        signIn: signInResolver,
        onboard: onboardResolver,

        //stress
        addStressRecord: addStressRecordResolver,

        //mealRecords
        addMealRecord: addMealRecordResolver,
    },

    Query: {
        //user
        getUserData: getUserDataResolver,

        //mealRecords
        getMealRecordsByDate: getMealRecordsByDate,
    },
}

export default resolvers
