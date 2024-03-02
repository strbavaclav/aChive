/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type BodyDataInput = {
  height?: InputMaybe<Scalars["Float"]["input"]>;
  weight?: InputMaybe<Scalars["Float"]["input"]>;
};

export type BodyInfo = {
  __typename?: "BodyInfo";
  height: Scalars["Float"]["output"];
  weight: Scalars["Float"]["output"];
};

export type InputMealRecord = {
  cooked: Scalars["Boolean"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  loggedDateTime: Scalars["String"]["input"];
  mealId?: InputMaybe<Scalars["String"]["input"]>;
  size: Scalars["String"]["input"];
};

export type MealRecord = {
  __typename?: "MealRecord";
  _id: Scalars["String"]["output"];
  cooked: Scalars["Boolean"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  loggedDateTime: Scalars["String"]["output"];
  mealId?: Maybe<Scalars["String"]["output"]>;
  size: Scalars["String"]["output"];
};

export type MealRecordData = {
  __typename?: "MealRecordData";
  records: Array<MealRecord>;
  userId: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  _empty?: Maybe<Scalars["String"]["output"]>;
  addMealRecord?: Maybe<MealRecordData>;
  addStressRecord: StressRecords;
  onboard: User;
  removeMealRecordById: Scalars["String"]["output"];
  signIn: User;
  signUp: User;
  updateMealRecordById?: Maybe<MealRecordData>;
};

export type Mutation_EmptyArgs = {
  nothing?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationAddMealRecordArgs = {
  mealRecord: InputMealRecord;
  userId: Scalars["String"]["input"];
};

export type MutationAddStressRecordArgs = {
  stressRecordData: StressRecordDataInput;
};

export type MutationOnboardArgs = {
  onboardData: OnboardData;
};

export type MutationRemoveMealRecordByIdArgs = {
  recordId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationSignInArgs = {
  authData: SignInInput;
};

export type MutationSignUpArgs = {
  authData: SignUpInput;
};

export type MutationUpdateMealRecordByIdArgs = {
  recordId: Scalars["String"]["input"];
  updatedRecord: InputMealRecord;
  userId: Scalars["String"]["input"];
};

export type OnboardData = {
  body: BodyDataInput;
  bornDate: Scalars["String"]["input"];
  eatHabitGoal: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  plan?: InputMaybe<Array<PlannedMealInput>>;
  username: Scalars["String"]["input"];
};

export type PlannedMeal = {
  __typename?: "PlannedMeal";
  _id: Scalars["String"]["output"];
  endTime: Scalars["String"]["output"];
  mealName: Scalars["String"]["output"];
  mealSize: Scalars["String"]["output"];
  startTime: Scalars["String"]["output"];
};

export type PlannedMealInput = {
  endTime: Scalars["String"]["input"];
  mealName: Scalars["String"]["input"];
  mealSize: Scalars["String"]["input"];
  startTime: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]["output"]>;
  getMealRecordsByDate?: Maybe<Array<Maybe<MealRecord>>>;
  getUser?: Maybe<User>;
  getUserData?: Maybe<User>;
};

export type QueryGetMealRecordsByDateArgs = {
  date: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["ID"]["input"];
};

export type SignInInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignUpInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  passwordConfirm: Scalars["String"]["input"];
};

export type StressRecordData = {
  __typename?: "StressRecordData";
  note?: Maybe<Scalars["String"]["output"]>;
  timestamp: Scalars["String"]["output"];
  value: Scalars["Int"]["output"];
};

export type StressRecordDataInput = {
  note?: InputMaybe<Scalars["String"]["input"]>;
  timestamp: Scalars["String"]["input"];
  userEmail: Scalars["String"]["input"];
  value: Scalars["Int"]["input"];
};

export type StressRecords = {
  __typename?: "StressRecords";
  stressRecords?: Maybe<Array<StressRecordData>>;
  userEmail: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["String"]["output"];
  body?: Maybe<BodyInfo>;
  bornDate?: Maybe<Scalars["String"]["output"]>;
  eatHabitGoal?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender?: Maybe<Scalars["String"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  onboarded: Scalars["Boolean"]["output"];
  password: Scalars["String"]["output"];
  plan?: Maybe<Array<PlannedMeal>>;
  streak?: Maybe<Scalars["Int"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type SignInMutationVariables = Exact<{
  authData: SignInInput;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "User";
    _id: string;
    email: string;
    token?: string | null;
    onboarded: boolean;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    gender?: string | null;
    bornDate?: string | null;
    eatHabitGoal?: string | null;
    body?: { __typename?: "BodyInfo"; height: number; weight: number } | null;
    plan?: Array<{
      __typename?: "PlannedMeal";
      _id: string;
      mealName: string;
      mealSize: string;
      startTime: string;
      endTime: string;
    }> | null;
  };
};

export type OnboardMutationVariables = Exact<{
  onboardData: OnboardData;
}>;

export type OnboardMutation = {
  __typename?: "Mutation";
  onboard: {
    __typename?: "User";
    _id: string;
    email: string;
    onboarded: boolean;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    gender?: string | null;
    bornDate?: string | null;
    eatHabitGoal?: string | null;
    body?: { __typename?: "BodyInfo"; height: number; weight: number } | null;
    plan?: Array<{
      __typename?: "PlannedMeal";
      _id: string;
      mealName: string;
      mealSize: string;
      startTime: string;
      endTime: string;
    }> | null;
  };
};

export type SignUpMutationVariables = Exact<{
  authData: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "User";
    _id: string;
    email: string;
    token?: string | null;
    onboarded: boolean;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    gender?: string | null;
    bornDate?: string | null;
    eatHabitGoal?: string | null;
    body?: { __typename?: "BodyInfo"; height: number; weight: number } | null;
    plan?: Array<{
      __typename?: "PlannedMeal";
      _id: string;
      mealName: string;
      mealSize: string;
      startTime: string;
      endTime: string;
    }> | null;
  };
};

export type MutationMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  mealRecord: InputMealRecord;
}>;

export type MutationMutation = {
  __typename?: "Mutation";
  addMealRecord?: {
    __typename?: "MealRecordData";
    userId: string;
    records: Array<{
      __typename?: "MealRecord";
      mealId?: string | null;
      loggedDateTime: string;
      size: string;
      description?: string | null;
      cooked: boolean;
    }>;
  } | null;
};

export type GetMealRecordsByDateQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
  date: Scalars["String"]["input"];
}>;

export type GetMealRecordsByDateQuery = {
  __typename?: "Query";
  getMealRecordsByDate?: Array<{
    __typename?: "MealRecord";
    _id: string;
    mealId?: string | null;
    loggedDateTime: string;
    size: string;
    description?: string | null;
    cooked: boolean;
  } | null> | null;
};

export type RemoveMealRecordByIdMutationVariables = Exact<{
  recordId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
}>;

export type RemoveMealRecordByIdMutation = {
  __typename?: "Mutation";
  removeMealRecordById: string;
};

export type UpdateMealRecordByIdMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  recordId: Scalars["String"]["input"];
  updatedRecord: InputMealRecord;
}>;

export type UpdateMealRecordByIdMutation = {
  __typename?: "Mutation";
  updateMealRecordById?: {
    __typename?: "MealRecordData";
    userId: string;
    records: Array<{
      __typename?: "MealRecord";
      _id: string;
      mealId?: string | null;
      loggedDateTime: string;
      size: string;
      description?: string | null;
      cooked: boolean;
    }>;
  } | null;
};

export type GetUserDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserDataQuery = {
  __typename?: "Query";
  getUserData?: {
    __typename?: "User";
    _id: string;
    email: string;
    onboarded: boolean;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    gender?: string | null;
    bornDate?: string | null;
    eatHabitGoal?: string | null;
    body?: { __typename?: "BodyInfo"; height: number; weight: number } | null;
    plan?: Array<{
      __typename?: "PlannedMeal";
      _id: string;
      mealName: string;
      mealSize: string;
      startTime: string;
      endTime: string;
    }> | null;
  } | null;
};

export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authData" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SignInInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authData" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authData" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "onboarded" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "bornDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "body" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "weight" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "eatHabitGoal" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealSize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const OnboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Onboard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "onboardData" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "OnboardData" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "onboard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "onboardData" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "onboardData" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "onboarded" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "bornDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "body" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "weight" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "eatHabitGoal" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealSize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OnboardMutation, OnboardMutationVariables>;
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authData" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SignUpInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authData" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authData" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "onboarded" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "bornDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "body" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "weight" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "eatHabitGoal" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealSize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const MutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Mutation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "mealRecord" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "InputMealRecord" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addMealRecord" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "mealRecord" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "mealRecord" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "loggedDateTime" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "size" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cooked" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GetMealRecordsByDateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMealRecordsByDate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getMealRecordsByDate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "mealId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loggedDateTime" },
                },
                { kind: "Field", name: { kind: "Name", value: "size" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "cooked" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMealRecordsByDateQuery,
  GetMealRecordsByDateQueryVariables
>;
export const RemoveMealRecordByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveMealRecordById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "recordId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeMealRecordById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "recordId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "recordId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveMealRecordByIdMutation,
  RemoveMealRecordByIdMutationVariables
>;
export const UpdateMealRecordByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateMealRecordById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "recordId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updatedRecord" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "InputMealRecord" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMealRecordById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "recordId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "recordId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "updatedRecord" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updatedRecord" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "loggedDateTime" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "size" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cooked" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateMealRecordByIdMutation,
  UpdateMealRecordByIdMutationVariables
>;
export const GetUserDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUserData" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "onboarded" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "bornDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "body" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "weight" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "eatHabitGoal" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mealSize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserDataQuery, GetUserDataQueryVariables>;
