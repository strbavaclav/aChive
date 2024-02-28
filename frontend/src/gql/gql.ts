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
  "\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      _id\n      email\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n":
    types.OnboardDocument,
  "\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n":
    types.SignUpDocument,
  "\nmutation Mutation($userId: String!, $mealRecord: InputMealRecord!) {\n  addMealRecord(userId: $userId, mealRecord: $mealRecord) {\n    userId\n    records {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n    }\n  }\n}\n":
    types.MutationDocument,
  "\n  query GetMealRecordsByDate($userId: String!, $date: String!) {\n    getMealRecordsByDate(userId: $userId, date: $date) {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n    }\n  }\n":
    types.GetMealRecordsByDateDocument,
  "\n  query GetUserData {\n    getUserData {\n      _id\n      email\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n":
    types.GetUserDataDocument,
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
  source: "\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      _id\n      email\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      _id\n      email\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      _id\n      email\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation Mutation($userId: String!, $mealRecord: InputMealRecord!) {\n  addMealRecord(userId: $userId, mealRecord: $mealRecord) {\n    userId\n    records {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n    }\n  }\n}\n",
): (typeof documents)["\nmutation Mutation($userId: String!, $mealRecord: InputMealRecord!) {\n  addMealRecord(userId: $userId, mealRecord: $mealRecord) {\n    userId\n    records {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetMealRecordsByDate($userId: String!, $date: String!) {\n    getMealRecordsByDate(userId: $userId, date: $date) {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n    }\n  }\n",
): (typeof documents)["\n  query GetMealRecordsByDate($userId: String!, $date: String!) {\n    getMealRecordsByDate(userId: $userId, date: $date) {\n      mealId\n      loggedDateTime\n      size\n      description\n      cooked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserData {\n    getUserData {\n      _id\n      email\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetUserData {\n    getUserData {\n      _id\n      email\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        _id\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
