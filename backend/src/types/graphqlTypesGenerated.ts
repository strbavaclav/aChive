import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never
      }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
}

export type BodyDataInput = {
    height?: InputMaybe<Scalars['Float']['input']>
    weight?: InputMaybe<Scalars['Float']['input']>
}

export type BodyInfo = {
    __typename?: 'BodyInfo'
    height: Scalars['Float']['output']
    weight: Scalars['Float']['output']
}

export type InputMealRecord = {
    cooked: Scalars['Boolean']['input']
    description?: InputMaybe<Scalars['String']['input']>
    loggedDateTime: Scalars['String']['input']
    mealId?: InputMaybe<Scalars['String']['input']>
    size: Scalars['String']['input']
}

export type MealRecord = {
    __typename?: 'MealRecord'
    _id: Scalars['String']['output']
    cooked: Scalars['Boolean']['output']
    description?: Maybe<Scalars['String']['output']>
    loggedDateTime: Scalars['String']['output']
    mealId?: Maybe<Scalars['String']['output']>
    size: Scalars['String']['output']
}

export type MealRecordData = {
    __typename?: 'MealRecordData'
    records: Array<MealRecord>
    userId: Scalars['String']['output']
}

export type Mutation = {
    __typename?: 'Mutation'
    _empty?: Maybe<Scalars['String']['output']>
    addMealRecord?: Maybe<MealRecordData>
    addShoppingListItem: ShoppingList
    addStressRecord: StressRecords
    appleSignIn: User
    appleSignUp: User
    onboard: User
    removeMealRecordById: Scalars['String']['output']
    resetUserRecords: User
    setShoppingListSettings: User
    signIn: User
    signUp: User
    updateMealRecordById?: Maybe<MealRecordData>
    updateUserData: User
}

export type Mutation_EmptyArgs = {
    nothing?: InputMaybe<Scalars['String']['input']>
}

export type MutationAddMealRecordArgs = {
    mealRecord: InputMealRecord
    userId: Scalars['String']['input']
}

export type MutationAddShoppingListItemArgs = {
    item: ShoppingListItemInput
}

export type MutationAddStressRecordArgs = {
    stressRecordData: StressRecordDataInput
}

export type MutationAppleSignInArgs = {
    token: Scalars['String']['input']
}

export type MutationAppleSignUpArgs = {
    token: Scalars['String']['input']
}

export type MutationOnboardArgs = {
    onboardData: OnboardData
}

export type MutationRemoveMealRecordByIdArgs = {
    recordId: Scalars['String']['input']
    userId: Scalars['String']['input']
}

export type MutationSetShoppingListSettingsArgs = {
    ShopListSettings: ShopListSettingsInput
}

export type MutationSignInArgs = {
    authData: SignInInput
}

export type MutationSignUpArgs = {
    authData: SignUpInput
}

export type MutationUpdateMealRecordByIdArgs = {
    recordId: Scalars['String']['input']
    updatedRecord: InputMealRecord
    userId: Scalars['String']['input']
}

export type MutationUpdateUserDataArgs = {
    newUserData: NewUserDataInput
}

export type NewUserDataInput = {
    floatValue?: InputMaybe<Scalars['Float']['input']>
    name: Scalars['String']['input']
    stringValue?: InputMaybe<Scalars['String']['input']>
}

export type OnboardData = {
    body: BodyDataInput
    bornDate: Scalars['String']['input']
    eatHabitGoal: Scalars['String']['input']
    email: Scalars['String']['input']
    firstName: Scalars['String']['input']
    gender: Scalars['String']['input']
    lastName: Scalars['String']['input']
    plan?: InputMaybe<Array<PlannedMealInput>>
    username: Scalars['String']['input']
}

export type PlannedMeal = {
    __typename?: 'PlannedMeal'
    _id: Scalars['String']['output']
    endTime: Scalars['String']['output']
    mealName: Scalars['String']['output']
    mealSize: Scalars['String']['output']
    startTime: Scalars['String']['output']
}

export type PlannedMealInput = {
    endTime: Scalars['String']['input']
    mealName: Scalars['String']['input']
    mealSize: Scalars['String']['input']
    startTime: Scalars['String']['input']
}

export type Query = {
    __typename?: 'Query'
    _empty?: Maybe<Scalars['String']['output']>
    getMealRecordsByDate?: Maybe<Array<Maybe<MealRecord>>>
    getShoppingList?: Maybe<ShoppingList>
    getUser?: Maybe<User>
    getUserData?: Maybe<User>
}

export type QueryGetMealRecordsByDateArgs = {
    date: Scalars['String']['input']
    userId: Scalars['String']['input']
}

export type QueryGetUserArgs = {
    id: Scalars['ID']['input']
}

export type ShopListSettingsInput = {
    prepDays?: InputMaybe<Array<Scalars['Int']['input']>>
    prepEndTime: Scalars['String']['input']
    prepStartTime: Scalars['String']['input']
    shopDays?: InputMaybe<Array<Scalars['Int']['input']>>
    shopEndTime: Scalars['String']['input']
    shopStartTime: Scalars['String']['input']
}

export type ShoppingList = {
    __typename?: 'ShoppingList'
    items?: Maybe<Array<ShoppingListItem>>
    userId: Scalars['String']['output']
}

export type ShoppingListItem = {
    __typename?: 'ShoppingListItem'
    checked: Scalars['Boolean']['output']
    itemName: Scalars['String']['output']
    quantity: Scalars['Float']['output']
    unit: Scalars['String']['output']
}

export type ShoppingListItemInput = {
    checked?: InputMaybe<Scalars['Boolean']['input']>
    itemName: Scalars['String']['input']
    quantity: Scalars['Float']['input']
    unit: Scalars['String']['input']
}

export type ShoppingListSettings = {
    __typename?: 'ShoppingListSettings'
    prepDays?: Maybe<Array<Scalars['Int']['output']>>
    prepEndTime?: Maybe<Scalars['String']['output']>
    prepStartTime?: Maybe<Scalars['String']['output']>
    shopDays?: Maybe<Array<Scalars['Int']['output']>>
    shopEndTime?: Maybe<Scalars['String']['output']>
    shopStartTime?: Maybe<Scalars['String']['output']>
}

export type SignInInput = {
    email: Scalars['String']['input']
    password: Scalars['String']['input']
}

export type SignUpInput = {
    email: Scalars['String']['input']
    password: Scalars['String']['input']
    passwordConfirm: Scalars['String']['input']
}

export type StressRecordData = {
    __typename?: 'StressRecordData'
    note?: Maybe<Scalars['String']['output']>
    timestamp: Scalars['String']['output']
    value: Scalars['Int']['output']
}

export type StressRecordDataInput = {
    note?: InputMaybe<Scalars['String']['input']>
    timestamp: Scalars['String']['input']
    userEmail: Scalars['String']['input']
    value: Scalars['Int']['input']
}

export type StressRecords = {
    __typename?: 'StressRecords'
    stressRecords?: Maybe<Array<StressRecordData>>
    userEmail: Scalars['String']['output']
}

export type User = {
    __typename?: 'User'
    _id: Scalars['String']['output']
    body?: Maybe<BodyInfo>
    bornDate?: Maybe<Scalars['String']['output']>
    eatHabitGoal?: Maybe<Scalars['String']['output']>
    email: Scalars['String']['output']
    firstName?: Maybe<Scalars['String']['output']>
    gender?: Maybe<Scalars['String']['output']>
    language: Scalars['String']['output']
    lastName?: Maybe<Scalars['String']['output']>
    onboarded: Scalars['Boolean']['output']
    password: Scalars['String']['output']
    plan?: Maybe<Array<PlannedMeal>>
    shopping?: Maybe<ShoppingListSettings>
    streak?: Maybe<Scalars['Int']['output']>
    token?: Maybe<Scalars['String']['output']>
    username?: Maybe<Scalars['String']['output']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    BodyDataInput: BodyDataInput
    BodyInfo: ResolverTypeWrapper<BodyInfo>
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
    Float: ResolverTypeWrapper<Scalars['Float']['output']>
    ID: ResolverTypeWrapper<Scalars['ID']['output']>
    InputMealRecord: InputMealRecord
    Int: ResolverTypeWrapper<Scalars['Int']['output']>
    MealRecord: ResolverTypeWrapper<MealRecord>
    MealRecordData: ResolverTypeWrapper<MealRecordData>
    Mutation: ResolverTypeWrapper<{}>
    NewUserDataInput: NewUserDataInput
    OnboardData: OnboardData
    PlannedMeal: ResolverTypeWrapper<PlannedMeal>
    PlannedMealInput: PlannedMealInput
    Query: ResolverTypeWrapper<{}>
    ShopListSettingsInput: ShopListSettingsInput
    ShoppingList: ResolverTypeWrapper<ShoppingList>
    ShoppingListItem: ResolverTypeWrapper<ShoppingListItem>
    ShoppingListItemInput: ShoppingListItemInput
    ShoppingListSettings: ResolverTypeWrapper<ShoppingListSettings>
    SignInInput: SignInInput
    SignUpInput: SignUpInput
    StressRecordData: ResolverTypeWrapper<StressRecordData>
    StressRecordDataInput: StressRecordDataInput
    StressRecords: ResolverTypeWrapper<StressRecords>
    String: ResolverTypeWrapper<Scalars['String']['output']>
    User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    BodyDataInput: BodyDataInput
    BodyInfo: BodyInfo
    Boolean: Scalars['Boolean']['output']
    Float: Scalars['Float']['output']
    ID: Scalars['ID']['output']
    InputMealRecord: InputMealRecord
    Int: Scalars['Int']['output']
    MealRecord: MealRecord
    MealRecordData: MealRecordData
    Mutation: {}
    NewUserDataInput: NewUserDataInput
    OnboardData: OnboardData
    PlannedMeal: PlannedMeal
    PlannedMealInput: PlannedMealInput
    Query: {}
    ShopListSettingsInput: ShopListSettingsInput
    ShoppingList: ShoppingList
    ShoppingListItem: ShoppingListItem
    ShoppingListItemInput: ShoppingListItemInput
    ShoppingListSettings: ShoppingListSettings
    SignInInput: SignInInput
    SignUpInput: SignUpInput
    StressRecordData: StressRecordData
    StressRecordDataInput: StressRecordDataInput
    StressRecords: StressRecords
    String: Scalars['String']['output']
    User: User
}

export type BodyInfoResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['BodyInfo'] = ResolversParentTypes['BodyInfo']
> = {
    height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
    weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MealRecordResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['MealRecord'] = ResolversParentTypes['MealRecord']
> = {
    _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    cooked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    description?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    loggedDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    mealId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    size?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MealRecordDataResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['MealRecordData'] = ResolversParentTypes['MealRecordData']
> = {
    records?: Resolver<
        Array<ResolversTypes['MealRecord']>,
        ParentType,
        ContextType
    >
    userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
    _empty?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<Mutation_EmptyArgs>
    >
    addMealRecord?: Resolver<
        Maybe<ResolversTypes['MealRecordData']>,
        ParentType,
        ContextType,
        RequireFields<MutationAddMealRecordArgs, 'mealRecord' | 'userId'>
    >
    addShoppingListItem?: Resolver<
        ResolversTypes['ShoppingList'],
        ParentType,
        ContextType,
        RequireFields<MutationAddShoppingListItemArgs, 'item'>
    >
    addStressRecord?: Resolver<
        ResolversTypes['StressRecords'],
        ParentType,
        ContextType,
        RequireFields<MutationAddStressRecordArgs, 'stressRecordData'>
    >
    appleSignIn?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationAppleSignInArgs, 'token'>
    >
    appleSignUp?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationAppleSignUpArgs, 'token'>
    >
    onboard?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationOnboardArgs, 'onboardData'>
    >
    removeMealRecordById?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        RequireFields<MutationRemoveMealRecordByIdArgs, 'recordId' | 'userId'>
    >
    resetUserRecords?: Resolver<ResolversTypes['User'], ParentType, ContextType>
    setShoppingListSettings?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationSetShoppingListSettingsArgs, 'ShopListSettings'>
    >
    signIn?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationSignInArgs, 'authData'>
    >
    signUp?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationSignUpArgs, 'authData'>
    >
    updateMealRecordById?: Resolver<
        Maybe<ResolversTypes['MealRecordData']>,
        ParentType,
        ContextType,
        RequireFields<
            MutationUpdateMealRecordByIdArgs,
            'recordId' | 'updatedRecord' | 'userId'
        >
    >
    updateUserData?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationUpdateUserDataArgs, 'newUserData'>
    >
}

export type PlannedMealResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['PlannedMeal'] = ResolversParentTypes['PlannedMeal']
> = {
    _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    mealName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    mealSize?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
    _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    getMealRecordsByDate?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['MealRecord']>>>,
        ParentType,
        ContextType,
        RequireFields<QueryGetMealRecordsByDateArgs, 'date' | 'userId'>
    >
    getShoppingList?: Resolver<
        Maybe<ResolversTypes['ShoppingList']>,
        ParentType,
        ContextType
    >
    getUser?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetUserArgs, 'id'>
    >
    getUserData?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType
    >
}

export type ShoppingListResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['ShoppingList'] = ResolversParentTypes['ShoppingList']
> = {
    items?: Resolver<
        Maybe<Array<ResolversTypes['ShoppingListItem']>>,
        ParentType,
        ContextType
    >
    userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ShoppingListItemResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['ShoppingListItem'] = ResolversParentTypes['ShoppingListItem']
> = {
    checked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    itemName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
    unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ShoppingListSettingsResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['ShoppingListSettings'] = ResolversParentTypes['ShoppingListSettings']
> = {
    prepDays?: Resolver<
        Maybe<Array<ResolversTypes['Int']>>,
        ParentType,
        ContextType
    >
    prepEndTime?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    prepStartTime?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    shopDays?: Resolver<
        Maybe<Array<ResolversTypes['Int']>>,
        ParentType,
        ContextType
    >
    shopEndTime?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    shopStartTime?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type StressRecordDataResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['StressRecordData'] = ResolversParentTypes['StressRecordData']
> = {
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type StressRecordsResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['StressRecords'] = ResolversParentTypes['StressRecords']
> = {
    stressRecords?: Resolver<
        Maybe<Array<ResolversTypes['StressRecordData']>>,
        ParentType,
        ContextType
    >
    userEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
    _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    body?: Resolver<Maybe<ResolversTypes['BodyInfo']>, ParentType, ContextType>
    bornDate?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    eatHabitGoal?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    firstName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    language?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    lastName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    onboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    plan?: Resolver<
        Maybe<Array<ResolversTypes['PlannedMeal']>>,
        ParentType,
        ContextType
    >
    shopping?: Resolver<
        Maybe<ResolversTypes['ShoppingListSettings']>,
        ParentType,
        ContextType
    >
    streak?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
    token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    username?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
    BodyInfo?: BodyInfoResolvers<ContextType>
    MealRecord?: MealRecordResolvers<ContextType>
    MealRecordData?: MealRecordDataResolvers<ContextType>
    Mutation?: MutationResolvers<ContextType>
    PlannedMeal?: PlannedMealResolvers<ContextType>
    Query?: QueryResolvers<ContextType>
    ShoppingList?: ShoppingListResolvers<ContextType>
    ShoppingListItem?: ShoppingListItemResolvers<ContextType>
    ShoppingListSettings?: ShoppingListSettingsResolvers<ContextType>
    StressRecordData?: StressRecordDataResolvers<ContextType>
    StressRecords?: StressRecordsResolvers<ContextType>
    User?: UserResolvers<ContextType>
}
