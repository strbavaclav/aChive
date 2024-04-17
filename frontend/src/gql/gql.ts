/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation AppleSignIn($token: String!) {\n    appleSignIn(token: $token) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n":
    types.AppleSignInDocument,
  "\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      _id\n      email\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n":
    types.OnboardDocument,
  "\n  mutation AppleSignUp($token: String!) {\n    appleSignUp(token: $token) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n":
    types.AppleSignUpDocument,
  "\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n":
    types.SignUpDocument,
  "\nmutation Mutation($userId: String!, $mealRecord: InputMealRecord!) {\n  addMealRecord(userId: $userId, mealRecord: $mealRecord) {\n    userId\n    records {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n}\n":
    types.MutationDocument,
  "\n  query GetMealRecordsByDate($userId: String!, $date: String!) {\n    getMealRecordsByDate(userId: $userId, date: $date) {\n      _id\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n":
    types.GetMealRecordsByDateDocument,
  "\nmutation RemoveMealRecordById($recordId: String!, $userId: String!) {\n  removeMealRecordById(recordId: $recordId, userId: $userId)\n}\n":
    types.RemoveMealRecordByIdDocument,
  "\nmutation UpdateMealRecordById($userId: String!, $recordId: String!, $updatedRecord: InputMealRecord!) {\n  updateMealRecordById(userId: $userId, recordId: $recordId, updatedRecord: $updatedRecord) {\n    userId\n    records {\n      _id\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n}\n":
    types.UpdateMealRecordByIdDocument,
  "\n  query GetShoppingList {\n    getShoppingList {\n      userId\n      items {\n        _id\n        itemName\n        quantity\n        unit\n        checked\n      }\n    }\n  }\n":
    types.GetShoppingListDocument,
  "\nmutation SetShoppingListSettings($shopListSettings: ShopListSettingsInput!) {\n  setShoppingListSettings(ShopListSettings: $shopListSettings) {\n    shopping {\n      prepDays\n      prepStartTime\n      prepEndTime\n      shopDays\n      shopStartTime\n      shopEndTime\n    }\n  }\n}\n":
    types.SetShoppingListSettingsDocument,
  "\nmutation SyncShoppingList($items: [ShoppingListItemInput!]) {\n    syncShoppingList(items: $items)\n  }\n":
    types.SyncShoppingListDocument,
  "\nmutation AddStressRecord($stressRecordData: StressRecordDataInput!) {\n  addStressRecord(stressRecordData: $stressRecordData) {\n    stressRecords {\n      timestamp\n      value\n      note\n    }\n  }\n}\n":
    types.AddStressRecordDocument,
  "\n\nmutation DeleteStressRecord($date: String!) {\n    deleteStressRecord(date: $date)\n  }\n":
    types.DeleteStressRecordDocument,
  "\n\nmutation EditStressRecord($date: String!, $updatedRecord: StressRecordDataInput!) {\n  editStressRecord(date: $date, updatedRecord: $updatedRecord) {\n    timestamp\n    value\n    note\n  }\n}\n":
    types.EditStressRecordDocument,
  "\n  query GetStressRecordsByDate($date: String!) {\n    getStressRecordsByDate(date: $date) {\n      record {\n        timestamp\n        value\n        note\n      }\n    }\n  }\n":
    types.GetStressRecordsByDateDocument,
  "\n  query GetTips {\n    getTips {\n      id\n      cs {\n        name\n        description\n        content\n      }\n      en {\n        name\n        description\n        content\n      }\n      date\n    }\n  }\n":
    types.GetTipsDocument,
  "\nmutation ChangeMealPlanMutation($newPlan: [ChangedMealInput!]) {\n  changeMealPlan(newPlan: $newPlan) {\n    plan {\n      _id\n      mealName\n      mealSize\n      startTime\n      endTime\n    }\n  }\n}\n":
    types.ChangeMealPlanMutationDocument,
  "\n  query GetUserData {\n    getUserData {\n      _id\n      email\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n":
    types.GetUserDataDocument,
  "\n  query Records {\n    getStatistics {\n      records {\n        stress\n        meal\n      }\n      chart {\n        commit {\n          date\n          count\n        }\n        line {\n          labels\n          counts\n        }\n      }\n      stressAvg\n      streak\n    }\n  }\n":
    types.RecordsDocument,
  "\n  mutation ResetUserRecords {\n    resetUserRecords\n  }\n":
    types.ResetUserRecordsDocument,
  "\nmutation UpdateUserData($newUserData: NewUserDataInput!) {\n  updateUserData(newUserData: $newUserData) {\n    email\n    language\n    username\n    firstName\n    lastName\n    gender\n    bornDate\n    body {\n      height\n      weight\n    }\n    eatHabitGoal\n    _id\n    notifications {\n      plannerMealTime\n      logMealTime\n      listCreationTime\n      shoppingTime\n      logStressTime\n    }\n  }\n}\n":
    types.UpdateUserDataDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AppleSignIn($token: String!) {\n    appleSignIn(token: $token) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation AppleSignIn($token: String!) {\n    appleSignIn(token: $token) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      _id\n      email\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      _id\n      email\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AppleSignUp($token: String!) {\n    appleSignUp(token: $token) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation AppleSignUp($token: String!) {\n    appleSignUp(token: $token) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation Mutation($userId: String!, $mealRecord: InputMealRecord!) {\n  addMealRecord(userId: $userId, mealRecord: $mealRecord) {\n    userId\n    records {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n}\n",
): (typeof documents)["\nmutation Mutation($userId: String!, $mealRecord: InputMealRecord!) {\n  addMealRecord(userId: $userId, mealRecord: $mealRecord) {\n    userId\n    records {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetMealRecordsByDate($userId: String!, $date: String!) {\n    getMealRecordsByDate(userId: $userId, date: $date) {\n      _id\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n",
): (typeof documents)["\n  query GetMealRecordsByDate($userId: String!, $date: String!) {\n    getMealRecordsByDate(userId: $userId, date: $date) {\n      _id\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation RemoveMealRecordById($recordId: String!, $userId: String!) {\n  removeMealRecordById(recordId: $recordId, userId: $userId)\n}\n",
): (typeof documents)["\nmutation RemoveMealRecordById($recordId: String!, $userId: String!) {\n  removeMealRecordById(recordId: $recordId, userId: $userId)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation UpdateMealRecordById($userId: String!, $recordId: String!, $updatedRecord: InputMealRecord!) {\n  updateMealRecordById(userId: $userId, recordId: $recordId, updatedRecord: $updatedRecord) {\n    userId\n    records {\n      _id\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n}\n",
): (typeof documents)["\nmutation UpdateMealRecordById($userId: String!, $recordId: String!, $updatedRecord: InputMealRecord!) {\n  updateMealRecordById(userId: $userId, recordId: $recordId, updatedRecord: $updatedRecord) {\n    userId\n    records {\n      _id\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n      extraMealName\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetShoppingList {\n    getShoppingList {\n      userId\n      items {\n        _id\n        itemName\n        quantity\n        unit\n        checked\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetShoppingList {\n    getShoppingList {\n      userId\n      items {\n        _id\n        itemName\n        quantity\n        unit\n        checked\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation SetShoppingListSettings($shopListSettings: ShopListSettingsInput!) {\n  setShoppingListSettings(ShopListSettings: $shopListSettings) {\n    shopping {\n      prepDays\n      prepStartTime\n      prepEndTime\n      shopDays\n      shopStartTime\n      shopEndTime\n    }\n  }\n}\n",
): (typeof documents)["\nmutation SetShoppingListSettings($shopListSettings: ShopListSettingsInput!) {\n  setShoppingListSettings(ShopListSettings: $shopListSettings) {\n    shopping {\n      prepDays\n      prepStartTime\n      prepEndTime\n      shopDays\n      shopStartTime\n      shopEndTime\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation SyncShoppingList($items: [ShoppingListItemInput!]) {\n    syncShoppingList(items: $items)\n  }\n",
): (typeof documents)["\nmutation SyncShoppingList($items: [ShoppingListItemInput!]) {\n    syncShoppingList(items: $items)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation AddStressRecord($stressRecordData: StressRecordDataInput!) {\n  addStressRecord(stressRecordData: $stressRecordData) {\n    stressRecords {\n      timestamp\n      value\n      note\n    }\n  }\n}\n",
): (typeof documents)["\nmutation AddStressRecord($stressRecordData: StressRecordDataInput!) {\n  addStressRecord(stressRecordData: $stressRecordData) {\n    stressRecords {\n      timestamp\n      value\n      note\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\nmutation DeleteStressRecord($date: String!) {\n    deleteStressRecord(date: $date)\n  }\n",
): (typeof documents)["\n\nmutation DeleteStressRecord($date: String!) {\n    deleteStressRecord(date: $date)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\nmutation EditStressRecord($date: String!, $updatedRecord: StressRecordDataInput!) {\n  editStressRecord(date: $date, updatedRecord: $updatedRecord) {\n    timestamp\n    value\n    note\n  }\n}\n",
): (typeof documents)["\n\nmutation EditStressRecord($date: String!, $updatedRecord: StressRecordDataInput!) {\n  editStressRecord(date: $date, updatedRecord: $updatedRecord) {\n    timestamp\n    value\n    note\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetStressRecordsByDate($date: String!) {\n    getStressRecordsByDate(date: $date) {\n      record {\n        timestamp\n        value\n        note\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetStressRecordsByDate($date: String!) {\n    getStressRecordsByDate(date: $date) {\n      record {\n        timestamp\n        value\n        note\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetTips {\n    getTips {\n      id\n      cs {\n        name\n        description\n        content\n      }\n      en {\n        name\n        description\n        content\n      }\n      date\n    }\n  }\n",
): (typeof documents)["\n  query GetTips {\n    getTips {\n      id\n      cs {\n        name\n        description\n        content\n      }\n      en {\n        name\n        description\n        content\n      }\n      date\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation ChangeMealPlanMutation($newPlan: [ChangedMealInput!]) {\n  changeMealPlan(newPlan: $newPlan) {\n    plan {\n      _id\n      mealName\n      mealSize\n      startTime\n      endTime\n    }\n  }\n}\n",
): (typeof documents)["\nmutation ChangeMealPlanMutation($newPlan: [ChangedMealInput!]) {\n  changeMealPlan(newPlan: $newPlan) {\n    plan {\n      _id\n      mealName\n      mealSize\n      startTime\n      endTime\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserData {\n    getUserData {\n      _id\n      email\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetUserData {\n    getUserData {\n      _id\n      email\n      onboarded\n      language\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n      shopping {\n        prepDays\n        prepStartTime\n        prepEndTime\n        shopDays\n        shopStartTime\n        shopEndTime\n      }\n      notifications {\n        plannerMealTime\n        logMealTime\n        listCreationTime\n        shoppingTime\n        logStressTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Records {\n    getStatistics {\n      records {\n        stress\n        meal\n      }\n      chart {\n        commit {\n          date\n          count\n        }\n        line {\n          labels\n          counts\n        }\n      }\n      stressAvg\n      streak\n    }\n  }\n",
): (typeof documents)["\n  query Records {\n    getStatistics {\n      records {\n        stress\n        meal\n      }\n      chart {\n        commit {\n          date\n          count\n        }\n        line {\n          labels\n          counts\n        }\n      }\n      stressAvg\n      streak\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation ResetUserRecords {\n    resetUserRecords\n  }\n",
): (typeof documents)["\n  mutation ResetUserRecords {\n    resetUserRecords\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation UpdateUserData($newUserData: NewUserDataInput!) {\n  updateUserData(newUserData: $newUserData) {\n    email\n    language\n    username\n    firstName\n    lastName\n    gender\n    bornDate\n    body {\n      height\n      weight\n    }\n    eatHabitGoal\n    _id\n    notifications {\n      plannerMealTime\n      logMealTime\n      listCreationTime\n      shoppingTime\n      logStressTime\n    }\n  }\n}\n",
): (typeof documents)["\nmutation UpdateUserData($newUserData: NewUserDataInput!) {\n  updateUserData(newUserData: $newUserData) {\n    email\n    language\n    username\n    firstName\n    lastName\n    gender\n    bornDate\n    body {\n      height\n      weight\n    }\n    eatHabitGoal\n    _id\n    notifications {\n      plannerMealTime\n      logMealTime\n      listCreationTime\n      shoppingTime\n      logStressTime\n    }\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
