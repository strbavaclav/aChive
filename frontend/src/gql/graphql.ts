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

export type ChangedMealInput = {
  _id?: InputMaybe<Scalars["String"]["input"]>;
  endTime: Scalars["String"]["input"];
  mealName: Scalars["String"]["input"];
  mealSize: Scalars["String"]["input"];
  startTime: Scalars["String"]["input"];
};

export type InputMealRecord = {
  cooked: Scalars["Boolean"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  extraMealName?: InputMaybe<Scalars["String"]["input"]>;
  loggedDateTime: Scalars["String"]["input"];
  mealId?: InputMaybe<Scalars["String"]["input"]>;
  size: Scalars["String"]["input"];
};

export type LanguageType = {
  __typename?: "LanguageType";
  content: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type MealRecord = {
  __typename?: "MealRecord";
  _id: Scalars["String"]["output"];
  cooked: Scalars["Boolean"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  extraMealName?: Maybe<Scalars["String"]["output"]>;
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
  appleSignIn: User;
  appleSignUp: User;
  changeMealPlan: User;
  deleteStressRecord: Scalars["String"]["output"];
  editStressRecord?: Maybe<StressRecordData>;
  onboard: User;
  removeMealRecordById: Scalars["String"]["output"];
  resetUserRecords: Scalars["String"]["output"];
  setShoppingListSettings: User;
  signIn: User;
  signUp: User;
  syncShoppingList: Scalars["String"]["output"];
  updateMealRecordById?: Maybe<MealRecordData>;
  updateUserData: User;
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

export type MutationAppleSignInArgs = {
  token: Scalars["String"]["input"];
};

export type MutationAppleSignUpArgs = {
  token: Scalars["String"]["input"];
};

export type MutationChangeMealPlanArgs = {
  newPlan?: InputMaybe<Array<ChangedMealInput>>;
};

export type MutationDeleteStressRecordArgs = {
  date: Scalars["String"]["input"];
};

export type MutationEditStressRecordArgs = {
  date: Scalars["String"]["input"];
  updatedRecord: StressRecordDataInput;
};

export type MutationOnboardArgs = {
  onboardData: OnboardData;
};

export type MutationRemoveMealRecordByIdArgs = {
  recordId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationSetShoppingListSettingsArgs = {
  ShopListSettings: ShopListSettingsInput;
};

export type MutationSignInArgs = {
  authData: SignInInput;
};

export type MutationSignUpArgs = {
  authData: SignUpInput;
};

export type MutationSyncShoppingListArgs = {
  items?: InputMaybe<Array<ShoppingListItemInput>>;
};

export type MutationUpdateMealRecordByIdArgs = {
  recordId: Scalars["String"]["input"];
  updatedRecord: InputMealRecord;
  userId: Scalars["String"]["input"];
};

export type MutationUpdateUserDataArgs = {
  newUserData: NewUserDataInput;
};

export type NewUserDataInput = {
  booleanValue?: InputMaybe<Scalars["Boolean"]["input"]>;
  floatValue?: InputMaybe<Scalars["Float"]["input"]>;
  name: Scalars["String"]["input"];
  stringValue?: InputMaybe<Scalars["String"]["input"]>;
};

export type Notifications = {
  __typename?: "Notifications";
  listCreationTime?: Maybe<Scalars["Boolean"]["output"]>;
  logMealTime?: Maybe<Scalars["Boolean"]["output"]>;
  logStressTime?: Maybe<Scalars["Boolean"]["output"]>;
  plannerMealTime?: Maybe<Scalars["Boolean"]["output"]>;
  shoppingTime?: Maybe<Scalars["Boolean"]["output"]>;
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
  stress?: InputMaybe<StressRecordDataInput>;
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
  getShoppingList?: Maybe<ShoppingList>;
  getStressRecordsByDate?: Maybe<DateStressRecord>;
  getTips?: Maybe<Array<TipItem>>;
  getUser?: Maybe<User>;
  getUserData?: Maybe<User>;
};

export type QueryGetMealRecordsByDateArgs = {
  date: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type QueryGetStressRecordsByDateArgs = {
  date: Scalars["String"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["ID"]["input"];
};

export type ShopListSettingsInput = {
  prepDays?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  prepEndTime: Scalars["String"]["input"];
  prepStartTime: Scalars["String"]["input"];
  shopDays?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  shopEndTime: Scalars["String"]["input"];
  shopStartTime: Scalars["String"]["input"];
};

export type ShoppingList = {
  __typename?: "ShoppingList";
  items?: Maybe<Array<ShoppingListItem>>;
  userId: Scalars["String"]["output"];
};

export type ShoppingListItem = {
  __typename?: "ShoppingListItem";
  _id: Scalars["String"]["output"];
  checked: Scalars["Boolean"]["output"];
  itemName: Scalars["String"]["output"];
  quantity: Scalars["Float"]["output"];
  unit: Scalars["String"]["output"];
};

export type ShoppingListItemInput = {
  _id: Scalars["String"]["input"];
  checked?: InputMaybe<Scalars["Boolean"]["input"]>;
  itemName: Scalars["String"]["input"];
  quantity: Scalars["Float"]["input"];
  unit: Scalars["String"]["input"];
};

export type ShoppingListSettings = {
  __typename?: "ShoppingListSettings";
  prepDays?: Maybe<Array<Scalars["Int"]["output"]>>;
  prepEndTime?: Maybe<Scalars["String"]["output"]>;
  prepStartTime?: Maybe<Scalars["String"]["output"]>;
  shopDays?: Maybe<Array<Scalars["Int"]["output"]>>;
  shopEndTime?: Maybe<Scalars["String"]["output"]>;
  shopStartTime?: Maybe<Scalars["String"]["output"]>;
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
  value: Scalars["Int"]["input"];
};

export type StressRecords = {
  __typename?: "StressRecords";
  stressRecords?: Maybe<Array<StressRecordData>>;
};

export type TipItem = {
  __typename?: "TipItem";
  cs: LanguageType;
  date: Scalars["String"]["output"];
  en: LanguageType;
  id: Scalars["String"]["output"];
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
  language: Scalars["String"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  notifications?: Maybe<Notifications>;
  onboarded: Scalars["Boolean"]["output"];
  password: Scalars["String"]["output"];
  plan?: Maybe<Array<PlannedMeal>>;
  shopping?: Maybe<ShoppingListSettings>;
  streak?: Maybe<Scalars["Int"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type DateStressRecord = {
  __typename?: "dateStressRecord";
  record?: Maybe<StressRecordData>;
};

export type AppleSignInMutationVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type AppleSignInMutation = {
  __typename?: "Mutation";
  appleSignIn: {
    __typename?: "User";
    _id: string;
    email: string;
    token?: string | null;
    onboarded: boolean;
    language: string;
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
    shopping?: {
      __typename?: "ShoppingListSettings";
      prepDays?: Array<number> | null;
      prepStartTime?: string | null;
      prepEndTime?: string | null;
      shopDays?: Array<number> | null;
      shopStartTime?: string | null;
      shopEndTime?: string | null;
    } | null;
    notifications?: {
      __typename?: "Notifications";
      plannerMealTime?: boolean | null;
      logMealTime?: boolean | null;
      listCreationTime?: boolean | null;
      shoppingTime?: boolean | null;
      logStressTime?: boolean | null;
    } | null;
  };
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
    language: string;
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
    shopping?: {
      __typename?: "ShoppingListSettings";
      prepDays?: Array<number> | null;
      prepStartTime?: string | null;
      prepEndTime?: string | null;
      shopDays?: Array<number> | null;
      shopStartTime?: string | null;
      shopEndTime?: string | null;
    } | null;
    notifications?: {
      __typename?: "Notifications";
      plannerMealTime?: boolean | null;
      logMealTime?: boolean | null;
      listCreationTime?: boolean | null;
      shoppingTime?: boolean | null;
      logStressTime?: boolean | null;
    } | null;
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
    language: string;
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
    shopping?: {
      __typename?: "ShoppingListSettings";
      prepDays?: Array<number> | null;
      prepStartTime?: string | null;
      prepEndTime?: string | null;
      shopDays?: Array<number> | null;
      shopStartTime?: string | null;
      shopEndTime?: string | null;
    } | null;
    notifications?: {
      __typename?: "Notifications";
      plannerMealTime?: boolean | null;
      logMealTime?: boolean | null;
      listCreationTime?: boolean | null;
      shoppingTime?: boolean | null;
      logStressTime?: boolean | null;
    } | null;
  };
};

export type AppleSignUpMutationVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type AppleSignUpMutation = {
  __typename?: "Mutation";
  appleSignUp: {
    __typename?: "User";
    _id: string;
    email: string;
    token?: string | null;
    onboarded: boolean;
    language: string;
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
    shopping?: {
      __typename?: "ShoppingListSettings";
      prepDays?: Array<number> | null;
      prepStartTime?: string | null;
      prepEndTime?: string | null;
      shopDays?: Array<number> | null;
      shopStartTime?: string | null;
      shopEndTime?: string | null;
    } | null;
    notifications?: {
      __typename?: "Notifications";
      plannerMealTime?: boolean | null;
      logMealTime?: boolean | null;
      listCreationTime?: boolean | null;
      shoppingTime?: boolean | null;
      logStressTime?: boolean | null;
    } | null;
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
    language: string;
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
    shopping?: {
      __typename?: "ShoppingListSettings";
      prepDays?: Array<number> | null;
      prepStartTime?: string | null;
      prepEndTime?: string | null;
      shopDays?: Array<number> | null;
      shopStartTime?: string | null;
      shopEndTime?: string | null;
    } | null;
    notifications?: {
      __typename?: "Notifications";
      plannerMealTime?: boolean | null;
      logMealTime?: boolean | null;
      listCreationTime?: boolean | null;
      shoppingTime?: boolean | null;
      logStressTime?: boolean | null;
    } | null;
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
      extraMealName?: string | null;
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
    extraMealName?: string | null;
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
      extraMealName?: string | null;
    }>;
  } | null;
};

export type GetShoppingListQueryVariables = Exact<{ [key: string]: never }>;

export type GetShoppingListQuery = {
  __typename?: "Query";
  getShoppingList?: {
    __typename?: "ShoppingList";
    userId: string;
    items?: Array<{
      __typename?: "ShoppingListItem";
      _id: string;
      itemName: string;
      quantity: number;
      unit: string;
      checked: boolean;
    }> | null;
  } | null;
};

export type SetShoppingListSettingsMutationVariables = Exact<{
  shopListSettings: ShopListSettingsInput;
}>;

export type SetShoppingListSettingsMutation = {
  __typename?: "Mutation";
  setShoppingListSettings: {
    __typename?: "User";
    shopping?: {
      __typename?: "ShoppingListSettings";
      prepDays?: Array<number> | null;
      prepStartTime?: string | null;
      prepEndTime?: string | null;
      shopDays?: Array<number> | null;
      shopStartTime?: string | null;
      shopEndTime?: string | null;
    } | null;
  };
};

export type SyncShoppingListMutationVariables = Exact<{
  items?: InputMaybe<Array<ShoppingListItemInput> | ShoppingListItemInput>;
}>;

export type SyncShoppingListMutation = {
  __typename?: "Mutation";
  syncShoppingList: string;
};

export type AddStressRecordMutationVariables = Exact<{
  stressRecordData: StressRecordDataInput;
}>;

export type AddStressRecordMutation = {
  __typename?: "Mutation";
  addStressRecord: {
    __typename?: "StressRecords";
    stressRecords?: Array<{
      __typename?: "StressRecordData";
      timestamp: string;
      value: number;
      note?: string | null;
    }> | null;
  };
};

export type DeleteStressRecordMutationVariables = Exact<{
  date: Scalars["String"]["input"];
}>;

export type DeleteStressRecordMutation = {
  __typename?: "Mutation";
  deleteStressRecord: string;
};

export type EditStressRecordMutationVariables = Exact<{
  date: Scalars["String"]["input"];
  updatedRecord: StressRecordDataInput;
}>;

export type EditStressRecordMutation = {
  __typename?: "Mutation";
  editStressRecord?: {
    __typename?: "StressRecordData";
    timestamp: string;
    value: number;
    note?: string | null;
  } | null;
};

export type GetStressRecordsByDateQueryVariables = Exact<{
  date: Scalars["String"]["input"];
}>;

export type GetStressRecordsByDateQuery = {
  __typename?: "Query";
  getStressRecordsByDate?: {
    __typename?: "dateStressRecord";
    record?: {
      __typename?: "StressRecordData";
      timestamp: string;
      value: number;
      note?: string | null;
    } | null;
  } | null;
};

export type GetTipsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTipsQuery = {
  __typename?: "Query";
  getTips?: Array<{
    __typename?: "TipItem";
    id: string;
    date: string;
    cs: {
      __typename?: "LanguageType";
      name: string;
      description: string;
      content: string;
    };
    en: {
      __typename?: "LanguageType";
      name: string;
      description: string;
      content: string;
    };
  }> | null;
};

export type ChangeMealPlanMutationMutationVariables = Exact<{
  newPlan?: InputMaybe<Array<ChangedMealInput> | ChangedMealInput>;
}>;

export type ChangeMealPlanMutationMutation = {
  __typename?: "Mutation";
  changeMealPlan: {
    __typename?: "User";
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

export type GetUserDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserDataQuery = {
  __typename?: "Query";
  getUserData?: {
    __typename?: "User";
    _id: string;
    email: string;
    onboarded: boolean;
    language: string;
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
    shopping?: {
      __typename?: "ShoppingListSettings";
      prepDays?: Array<number> | null;
      prepStartTime?: string | null;
      prepEndTime?: string | null;
      shopDays?: Array<number> | null;
      shopStartTime?: string | null;
      shopEndTime?: string | null;
    } | null;
    notifications?: {
      __typename?: "Notifications";
      plannerMealTime?: boolean | null;
      logMealTime?: boolean | null;
      listCreationTime?: boolean | null;
      shoppingTime?: boolean | null;
      logStressTime?: boolean | null;
    } | null;
  } | null;
};

export type ResetUserRecordsMutationVariables = Exact<{ [key: string]: never }>;

export type ResetUserRecordsMutation = {
  __typename?: "Mutation";
  resetUserRecords: string;
};

export type UpdateUserDataMutationVariables = Exact<{
  newUserData: NewUserDataInput;
}>;

export type UpdateUserDataMutation = {
  __typename?: "Mutation";
  updateUserData: {
    __typename?: "User";
    email: string;
    language: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    gender?: string | null;
    bornDate?: string | null;
    eatHabitGoal?: string | null;
    _id: string;
    body?: { __typename?: "BodyInfo"; height: number; weight: number } | null;
    notifications?: {
      __typename?: "Notifications";
      plannerMealTime?: boolean | null;
      logMealTime?: boolean | null;
      listCreationTime?: boolean | null;
      shoppingTime?: boolean | null;
      logStressTime?: boolean | null;
    } | null;
  };
};

export const AppleSignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AppleSignIn" },
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
            name: { kind: "Name", value: "appleSignIn" },
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
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "onboarded" } },
                { kind: "Field", name: { kind: "Name", value: "language" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shopping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepEndTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopEndTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notifications" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "listCreationTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shoppingTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logStressTime" },
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
} as unknown as DocumentNode<AppleSignInMutation, AppleSignInMutationVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "language" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shopping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepEndTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopEndTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notifications" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "listCreationTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shoppingTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logStressTime" },
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
                { kind: "Field", name: { kind: "Name", value: "language" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shopping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepEndTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopEndTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notifications" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "listCreationTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shoppingTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logStressTime" },
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
export const AppleSignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AppleSignUp" },
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
            name: { kind: "Name", value: "appleSignUp" },
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
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "onboarded" } },
                { kind: "Field", name: { kind: "Name", value: "language" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shopping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepEndTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopEndTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notifications" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "listCreationTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shoppingTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logStressTime" },
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
} as unknown as DocumentNode<AppleSignUpMutation, AppleSignUpMutationVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "language" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shopping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepEndTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopEndTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notifications" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "listCreationTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shoppingTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logStressTime" },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "extraMealName" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "extraMealName" },
                },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "extraMealName" },
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
export const GetShoppingListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetShoppingList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getShoppingList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "itemName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "quantity" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "unit" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "checked" },
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
  GetShoppingListQuery,
  GetShoppingListQueryVariables
>;
export const SetShoppingListSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetShoppingListSettings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "shopListSettings" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ShopListSettingsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setShoppingListSettings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ShopListSettings" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "shopListSettings" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shopping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepEndTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopEndTime" },
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
  SetShoppingListSettingsMutation,
  SetShoppingListSettingsMutationVariables
>;
export const SyncShoppingListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SyncShoppingList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "items" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "ShoppingListItemInput" },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "syncShoppingList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "items" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "items" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SyncShoppingListMutation,
  SyncShoppingListMutationVariables
>;
export const AddStressRecordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddStressRecord" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stressRecordData" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StressRecordDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addStressRecord" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "stressRecordData" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stressRecordData" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stressRecords" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timestamp" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                      { kind: "Field", name: { kind: "Name", value: "note" } },
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
  AddStressRecordMutation,
  AddStressRecordMutationVariables
>;
export const DeleteStressRecordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteStressRecord" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "deleteStressRecord" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteStressRecordMutation,
  DeleteStressRecordMutationVariables
>;
export const EditStressRecordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EditStressRecord" },
      variableDefinitions: [
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
              name: { kind: "Name", value: "StressRecordDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "editStressRecord" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
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
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "value" } },
                { kind: "Field", name: { kind: "Name", value: "note" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EditStressRecordMutation,
  EditStressRecordMutationVariables
>;
export const GetStressRecordsByDateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetStressRecordsByDate" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "getStressRecordsByDate" },
            arguments: [
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "record" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timestamp" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                      { kind: "Field", name: { kind: "Name", value: "note" } },
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
  GetStressRecordsByDateQuery,
  GetStressRecordsByDateQueryVariables
>;
export const GetTipsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTips" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTips" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "cs" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "en" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "date" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTipsQuery, GetTipsQueryVariables>;
export const ChangeMealPlanMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeMealPlanMutation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newPlan" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "ChangedMealInput" },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeMealPlan" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "newPlan" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newPlan" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
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
} as unknown as DocumentNode<
  ChangeMealPlanMutationMutation,
  ChangeMealPlanMutationMutationVariables
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
                { kind: "Field", name: { kind: "Name", value: "language" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shopping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prepEndTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopStartTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shopEndTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notifications" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "listCreationTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shoppingTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logStressTime" },
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
export const ResetUserRecordsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetUserRecords" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "resetUserRecords" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetUserRecordsMutation,
  ResetUserRecordsMutationVariables
>;
export const UpdateUserDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUserData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newUserData" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "NewUserDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUserData" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "newUserData" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newUserData" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "language" } },
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
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notifications" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logMealTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "listCreationTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shoppingTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logStressTime" },
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
  UpdateUserDataMutation,
  UpdateUserDataMutationVariables
>;
