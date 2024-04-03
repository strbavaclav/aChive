import {
    appleSignInResolver,
    appleSignUpResolver,
    onboardResolver,
    signInResolver,
    signUpResolver,
} from './modules/auth/resolvers'
import { type Resolvers } from '../types/graphqlTypesGenerated'
import { addStressRecordResolver } from './modules/stress/resolvers/addStressRecordResolver'
import { getUserDataResolver } from './modules/user/resolvers/getUserDataResolver'
import { addMealRecordResolver } from './modules/planner/resolvers/addMealRecordResolver'
import { getMealRecordsByDate } from './modules/planner/resolvers/getMealRecordsByDate'
import { removeMealRecordByIdResolver } from './modules/planner/resolvers/removeMealRecordById'
import { updateMealRecordByIdResolver } from './modules/planner/resolvers/updateMealRecordResolver'
import { setShoppingListSettingsResolver } from './modules/shopping/resolvers/setShoppingListSettingsResolver'
import { updateUserDataResolver } from './modules/user/resolvers/updateUserDataResolver'
import { addShoppingListItemResolver } from './modules/shopping/resolvers/addShoppingListItemResolver'
import { getShoppingListResolver } from './modules/shopping/resolvers/getShoppingListResolver'

const resolvers: Resolvers = {
    Mutation: {
        //auth
        signUp: signUpResolver,
        signIn: signInResolver,
        appleSignUp: appleSignUpResolver,
        appleSignIn: appleSignInResolver,
        onboard: onboardResolver,

        //stress
        addStressRecord: addStressRecordResolver,

        //mealRecords
        addMealRecord: addMealRecordResolver,
        removeMealRecordById: removeMealRecordByIdResolver,
        updateMealRecordById: updateMealRecordByIdResolver,

        //shoppingList
        setShoppingListSettings: setShoppingListSettingsResolver,
        addShoppingListItem: addShoppingListItemResolver,

        //user
        updateUserData: updateUserDataResolver,
    },

    Query: {
        //user
        getUserData: getUserDataResolver,

        //mealRecords
        getMealRecordsByDate: getMealRecordsByDate,

        //shopping
        getShoppingList: getShoppingListResolver,
    },
}

export default resolvers
