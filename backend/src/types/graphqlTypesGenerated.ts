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

export type ChangedMealInput = {
    _id?: InputMaybe<Scalars['String']['input']>
    endTime: Scalars['String']['input']
    mealName: Scalars['String']['input']
    mealSize: Scalars['String']['input']
    startTime: Scalars['String']['input']
}

export type Charts = {
    __typename?: 'Charts'
    commit?: Maybe<Array<MealCommit>>
    line?: Maybe<MealLine>
}

export type InputMealRecord = {
    cooked: Scalars['Boolean']['input']
    description?: InputMaybe<Scalars['String']['input']>
    extraMealName?: InputMaybe<Scalars['String']['input']>
    loggedDateTime: Scalars['String']['input']
    mealId?: InputMaybe<Scalars['String']['input']>
    size: Scalars['String']['input']
}

export type LanguageType = {
    __typename?: 'LanguageType'
    content: Scalars['String']['output']
    description: Scalars['String']['output']
    name: Scalars['String']['output']
}

export type MealCommit = {
    __typename?: 'MealCommit'
    count: Scalars['Int']['output']
    date: Scalars['String']['output']
}

export type MealLine = {
    __typename?: 'MealLine'
    counts?: Maybe<Array<Scalars['Int']['output']>>
    labels?: Maybe<Array<Scalars['String']['output']>>
}

export type MealRecord = {
    __typename?: 'MealRecord'
    _id: Scalars['String']['output']
    cooked: Scalars['Boolean']['output']
    description?: Maybe<Scalars['String']['output']>
    extraMealName?: Maybe<Scalars['String']['output']>
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
    addStressRecord: StressRecords
    appleSignIn: User
    appleSignUp: User
    changeMealPlan: User
    deleteStressRecord: Scalars['String']['output']
    editStressRecord?: Maybe<StressRecordData>
    onboard: User
    removeMealRecordById: Scalars['String']['output']
    resetUserRecords: Scalars['String']['output']
    setShoppingListSettings: User
    signIn: User
    signUp: User
    syncShoppingList: Scalars['String']['output']
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

export type MutationAddStressRecordArgs = {
    stressRecordData: StressRecordDataInput
}

export type MutationAppleSignInArgs = {
    token: Scalars['String']['input']
}

export type MutationAppleSignUpArgs = {
    token: Scalars['String']['input']
}

export type MutationChangeMealPlanArgs = {
    newPlan?: InputMaybe<Array<ChangedMealInput>>
}

export type MutationDeleteStressRecordArgs = {
    date: Scalars['String']['input']
}

export type MutationEditStressRecordArgs = {
    date: Scalars['String']['input']
    updatedRecord: StressRecordDataInput
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

export type MutationSyncShoppingListArgs = {
    items?: InputMaybe<Array<ShoppingListItemInput>>
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
    booleanValue?: InputMaybe<Scalars['Boolean']['input']>
    floatValue?: InputMaybe<Scalars['Float']['input']>
    name: Scalars['String']['input']
    stringValue?: InputMaybe<Scalars['String']['input']>
}

export type Notifications = {
    __typename?: 'Notifications'
    listCreationTime?: Maybe<Scalars['Boolean']['output']>
    logMealTime?: Maybe<Scalars['Boolean']['output']>
    logStressTime?: Maybe<Scalars['Boolean']['output']>
    plannerMealTime?: Maybe<Scalars['Boolean']['output']>
    shoppingTime?: Maybe<Scalars['Boolean']['output']>
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
    stress?: InputMaybe<StressRecordDataInput>
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
    getStatistics: UserStatistics
    getStressRecordsByDate?: Maybe<DateStressRecord>
    getTips?: Maybe<Array<TipItem>>
    getUser?: Maybe<User>
    getUserData?: Maybe<User>
}

export type QueryGetMealRecordsByDateArgs = {
    date: Scalars['String']['input']
    userId: Scalars['String']['input']
}

export type QueryGetStressRecordsByDateArgs = {
    date: Scalars['String']['input']
}

export type QueryGetUserArgs = {
    id: Scalars['ID']['input']
}

export type Records = {
    __typename?: 'Records'
    meal: Scalars['Int']['output']
    stress: Scalars['Int']['output']
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
    _id: Scalars['String']['output']
    checked: Scalars['Boolean']['output']
    itemName: Scalars['String']['output']
    quantity: Scalars['Float']['output']
    unit: Scalars['String']['output']
}

export type ShoppingListItemInput = {
    _id: Scalars['String']['input']
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
    value: Scalars['Int']['input']
}

export type StressRecords = {
    __typename?: 'StressRecords'
    stressRecords?: Maybe<Array<StressRecordData>>
}

export type TipItem = {
    __typename?: 'TipItem'
    cs: LanguageType
    date: Scalars['String']['output']
    en: LanguageType
    id: Scalars['String']['output']
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
    notifications?: Maybe<Notifications>
    onboarded: Scalars['Boolean']['output']
    password: Scalars['String']['output']
    plan?: Maybe<Array<PlannedMeal>>
    shopping?: Maybe<ShoppingListSettings>
    streak?: Maybe<Scalars['Int']['output']>
    token?: Maybe<Scalars['String']['output']>
    username?: Maybe<Scalars['String']['output']>
}

export type UserStatistics = {
    __typename?: 'UserStatistics'
    chart: Charts
    records: Records
    streak: Scalars['Int']['output']
    stressAvg: Scalars['Float']['output']
}

export type DateStressRecord = {
    __typename?: 'dateStressRecord'
    record?: Maybe<StressRecordData>
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
    ChangedMealInput: ChangedMealInput
    Charts: ResolverTypeWrapper<Charts>
    Float: ResolverTypeWrapper<Scalars['Float']['output']>
    ID: ResolverTypeWrapper<Scalars['ID']['output']>
    InputMealRecord: InputMealRecord
    Int: ResolverTypeWrapper<Scalars['Int']['output']>
    LanguageType: ResolverTypeWrapper<LanguageType>
    MealCommit: ResolverTypeWrapper<MealCommit>
    MealLine: ResolverTypeWrapper<MealLine>
    MealRecord: ResolverTypeWrapper<MealRecord>
    MealRecordData: ResolverTypeWrapper<MealRecordData>
    Mutation: ResolverTypeWrapper<{}>
    NewUserDataInput: NewUserDataInput
    Notifications: ResolverTypeWrapper<Notifications>
    OnboardData: OnboardData
    PlannedMeal: ResolverTypeWrapper<PlannedMeal>
    PlannedMealInput: PlannedMealInput
    Query: ResolverTypeWrapper<{}>
    Records: ResolverTypeWrapper<Records>
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
    TipItem: ResolverTypeWrapper<TipItem>
    User: ResolverTypeWrapper<User>
    UserStatistics: ResolverTypeWrapper<UserStatistics>
    dateStressRecord: ResolverTypeWrapper<DateStressRecord>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    BodyDataInput: BodyDataInput
    BodyInfo: BodyInfo
    Boolean: Scalars['Boolean']['output']
    ChangedMealInput: ChangedMealInput
    Charts: Charts
    Float: Scalars['Float']['output']
    ID: Scalars['ID']['output']
    InputMealRecord: InputMealRecord
    Int: Scalars['Int']['output']
    LanguageType: LanguageType
    MealCommit: MealCommit
    MealLine: MealLine
    MealRecord: MealRecord
    MealRecordData: MealRecordData
    Mutation: {}
    NewUserDataInput: NewUserDataInput
    Notifications: Notifications
    OnboardData: OnboardData
    PlannedMeal: PlannedMeal
    PlannedMealInput: PlannedMealInput
    Query: {}
    Records: Records
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
    TipItem: TipItem
    User: User
    UserStatistics: UserStatistics
    dateStressRecord: DateStressRecord
}

export type BodyInfoResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['BodyInfo'] = ResolversParentTypes['BodyInfo']
> = {
    height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
    weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ChartsResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Charts'] = ResolversParentTypes['Charts']
> = {
    commit?: Resolver<
        Maybe<Array<ResolversTypes['MealCommit']>>,
        ParentType,
        ContextType
    >
    line?: Resolver<Maybe<ResolversTypes['MealLine']>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LanguageTypeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['LanguageType'] = ResolversParentTypes['LanguageType']
> = {
    content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MealCommitResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['MealCommit'] = ResolversParentTypes['MealCommit']
> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
    date?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MealLineResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['MealLine'] = ResolversParentTypes['MealLine']
> = {
    counts?: Resolver<
        Maybe<Array<ResolversTypes['Int']>>,
        ParentType,
        ContextType
    >
    labels?: Resolver<
        Maybe<Array<ResolversTypes['String']>>,
        ParentType,
        ContextType
    >
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
    extraMealName?: Resolver<
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
    changeMealPlan?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        Partial<MutationChangeMealPlanArgs>
    >
    deleteStressRecord?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        RequireFields<MutationDeleteStressRecordArgs, 'date'>
    >
    editStressRecord?: Resolver<
        Maybe<ResolversTypes['StressRecordData']>,
        ParentType,
        ContextType,
        RequireFields<MutationEditStressRecordArgs, 'date' | 'updatedRecord'>
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
    resetUserRecords?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType
    >
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
    syncShoppingList?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        Partial<MutationSyncShoppingListArgs>
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

export type NotificationsResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Notifications'] = ResolversParentTypes['Notifications']
> = {
    listCreationTime?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >
    logMealTime?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >
    logStressTime?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >
    plannerMealTime?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >
    shoppingTime?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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
    getStatistics?: Resolver<
        ResolversTypes['UserStatistics'],
        ParentType,
        ContextType
    >
    getStressRecordsByDate?: Resolver<
        Maybe<ResolversTypes['dateStressRecord']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetStressRecordsByDateArgs, 'date'>
    >
    getTips?: Resolver<
        Maybe<Array<ResolversTypes['TipItem']>>,
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

export type RecordsResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Records'] = ResolversParentTypes['Records']
> = {
    meal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
    stress?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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
    _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TipItemResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['TipItem'] = ResolversParentTypes['TipItem']
> = {
    cs?: Resolver<ResolversTypes['LanguageType'], ParentType, ContextType>
    date?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    en?: Resolver<ResolversTypes['LanguageType'], ParentType, ContextType>
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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
    notifications?: Resolver<
        Maybe<ResolversTypes['Notifications']>,
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

export type UserStatisticsResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['UserStatistics'] = ResolversParentTypes['UserStatistics']
> = {
    chart?: Resolver<ResolversTypes['Charts'], ParentType, ContextType>
    records?: Resolver<ResolversTypes['Records'], ParentType, ContextType>
    streak?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
    stressAvg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DateStressRecordResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['dateStressRecord'] = ResolversParentTypes['dateStressRecord']
> = {
    record?: Resolver<
        Maybe<ResolversTypes['StressRecordData']>,
        ParentType,
        ContextType
    >
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
    BodyInfo?: BodyInfoResolvers<ContextType>
    Charts?: ChartsResolvers<ContextType>
    LanguageType?: LanguageTypeResolvers<ContextType>
    MealCommit?: MealCommitResolvers<ContextType>
    MealLine?: MealLineResolvers<ContextType>
    MealRecord?: MealRecordResolvers<ContextType>
    MealRecordData?: MealRecordDataResolvers<ContextType>
    Mutation?: MutationResolvers<ContextType>
    Notifications?: NotificationsResolvers<ContextType>
    PlannedMeal?: PlannedMealResolvers<ContextType>
    Query?: QueryResolvers<ContextType>
    Records?: RecordsResolvers<ContextType>
    ShoppingList?: ShoppingListResolvers<ContextType>
    ShoppingListItem?: ShoppingListItemResolvers<ContextType>
    ShoppingListSettings?: ShoppingListSettingsResolvers<ContextType>
    StressRecordData?: StressRecordDataResolvers<ContextType>
    StressRecords?: StressRecordsResolvers<ContextType>
    TipItem?: TipItemResolvers<ContextType>
    User?: UserResolvers<ContextType>
    UserStatistics?: UserStatisticsResolvers<ContextType>
    dateStressRecord?: DateStressRecordResolvers<ContextType>
}
