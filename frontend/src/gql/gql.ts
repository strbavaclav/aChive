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
  "\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      email\n      password\n      token\n      onboarded\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      email\n      password\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n":
    types.OnboardDocument,
  "\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      email\n      password\n      token\n    }\n  }\n":
    types.SignUpDocument,
  "\n  mutation VerifyToken($token: String!) {\n    verifyToken(token: $token)\n  }\n":
    types.VerifyTokenDocument,
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
  source: "\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      email\n      password\n      token\n      onboarded\n    }\n  }\n",
): (typeof documents)["\n  mutation SignIn($authData: SignInInput!) {\n    signIn(authData: $authData) {\n      email\n      password\n      token\n      onboarded\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      email\n      password\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Onboard($onboardData: OnboardData!) {\n    onboard(onboardData: $onboardData) {\n      email\n      password\n      token\n      onboarded\n      username\n      firstName\n      lastName\n      gender\n      bornDate\n      body {\n        height\n        weight\n      }\n      eatHabitGoal\n      plan {\n        mealName\n        mealSize\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      email\n      password\n      token\n    }\n  }\n",
): (typeof documents)["\n  mutation SignUp($authData: SignUpInput!) {\n    signUp(authData: $authData) {\n      email\n      password\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation VerifyToken($token: String!) {\n    verifyToken(token: $token)\n  }\n",
): (typeof documents)["\n  mutation VerifyToken($token: String!) {\n    verifyToken(token: $token)\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
