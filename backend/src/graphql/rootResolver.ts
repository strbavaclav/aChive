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
import { getShoppingListResolver } from './modules/shopping/resolvers/getShoppingListResolver'
import { getStressRecordsByDateResolver } from './modules/stress/resolvers/getStressRecordsByDateResolver'
import { deleteStressRecordResolver } from './modules/stress/resolvers/deleteStressRecordResolver'
import { editStressRecordResolver } from './modules/stress/resolvers/editStressRecordResolver'
import { resetUserRecordsResolver } from './modules/user/resolvers/resetUserRecordsResolver'
import { changeMealPlanResolver } from './modules/user/resolvers/changeMealPlanResolver'
import { syncShoppingListResolver } from './modules/shopping/resolvers/syncShoppingListResolver'
import { getTipsResolver } from './modules/tips/resolvers/getTipsResolver'
import { getUserStatiscticsResolver } from './modules/user/resolvers/getUserStatistics'

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
        deleteStressRecord: deleteStressRecordResolver,
        editStressRecord: editStressRecordResolver,

        //mealRecords
        addMealRecord: addMealRecordResolver,
        removeMealRecordById: removeMealRecordByIdResolver,
        updateMealRecordById: updateMealRecordByIdResolver,

        //shoppingList
        setShoppingListSettings: setShoppingListSettingsResolver,
        syncShoppingList: syncShoppingListResolver,

        //user
        updateUserData: updateUserDataResolver,
        resetUserRecords: resetUserRecordsResolver,
        changeMealPlan: changeMealPlanResolver,
    },

    Query: {
        //user
        getUserData: getUserDataResolver,
        getStatistics: getUserStatiscticsResolver,

        //mealRecords
        getMealRecordsByDate: getMealRecordsByDate,

        //shopping
        getShoppingList: getShoppingListResolver,

        //stress
        getStressRecordsByDate: getStressRecordsByDateResolver,

        //tips
        getTips: getTipsResolver,
    },
}

export default resolvers
