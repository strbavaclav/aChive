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
  height?: Maybe<Scalars["Float"]["output"]>;
  weight?: Maybe<Scalars["Float"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  _empty?: Maybe<Scalars["String"]["output"]>;
  addStressRecord: StressRecords;
  onboard: OnboardedUser;
  signIn: User;
  signOut: User;
  signUp: User;
  verifyToken: Scalars["Boolean"]["output"];
};

export type Mutation_EmptyArgs = {
  nothing?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationAddStressRecordArgs = {
  stressRecordData: StressRecordDataInput;
};

export type MutationOnboardArgs = {
  onboardData: OnboardData;
};

export type MutationSignInArgs = {
  authData: SignInInput;
};

export type MutationSignOutArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSignUpArgs = {
  authData: SignUpInput;
};

export type MutationVerifyTokenArgs = {
  token: Scalars["String"]["input"];
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

export type OnboardedUser = {
  __typename?: "OnboardedUser";
  body: BodyInfo;
  bornDate: Scalars["String"]["output"];
  eatHabitGoal: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  gender: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  onboarded: Scalars["Boolean"]["output"];
  password: Scalars["String"]["output"];
  plan?: Maybe<Array<PlannedMeal>>;
  token?: Maybe<Scalars["String"]["output"]>;
  username: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]["output"]>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getUser?: Maybe<User>;
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

export type StressRecords = {
  __typename?: "StressRecords";
  stressRecords?: Maybe<Array<StressRecordData>>;
  userEmail: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  onboarded: Scalars["Boolean"]["output"];
  password: Scalars["String"]["output"];
  token?: Maybe<Scalars["String"]["output"]>;
};

export type PlannedMeal = {
  __typename?: "plannedMeal";
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

export type StressRecordData = {
  __typename?: "stressRecordData";
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

export type SignInMutationVariables = Exact<{
  authData: SignInInput;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "User";
    email: string;
    password: string;
    token?: string | null;
    onboarded: boolean;
  };
};

export type OnboardMutationVariables = Exact<{
  onboardData: OnboardData;
}>;

export type OnboardMutation = {
  __typename?: "Mutation";
  onboard: {
    __typename?: "OnboardedUser";
    email: string;
    password: string;
    token?: string | null;
    onboarded: boolean;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    bornDate: string;
    eatHabitGoal: string;
    body: {
      __typename?: "BodyInfo";
      height?: number | null;
      weight?: number | null;
    };
    plan?: Array<{
      __typename?: "plannedMeal";
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
    email: string;
    password: string;
    token?: string | null;
  };
};

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type VerifyTokenMutation = {
  __typename?: "Mutation";
  verifyToken: boolean;
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
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "password" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "onboarded" } },
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
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "password" } },
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
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "password" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const VerifyTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "VerifyToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "token" },
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
            name: { kind: "Name", value: "verifyToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "token" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyTokenMutation, VerifyTokenMutationVariables>;
