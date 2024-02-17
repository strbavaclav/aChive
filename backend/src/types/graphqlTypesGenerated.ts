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
    height?: Maybe<Scalars['Float']['output']>
    weight?: Maybe<Scalars['Float']['output']>
}

export type Mutation = {
    __typename?: 'Mutation'
    _empty?: Maybe<Scalars['String']['output']>
    addStressRecord: StressRecords
    onboard: OnboardedUser
    signIn: User
    signOut: User
    signUp: User
    verifyToken: Scalars['Boolean']['output']
}

export type Mutation_EmptyArgs = {
    nothing?: InputMaybe<Scalars['String']['input']>
}

export type MutationAddStressRecordArgs = {
    stressRecordData: StressRecordDataInput
}

export type MutationOnboardArgs = {
    onboardData: OnboardData
}

export type MutationSignInArgs = {
    authData: SignInInput
}

export type MutationSignOutArgs = {
    email: Scalars['String']['input']
    password: Scalars['String']['input']
}

export type MutationSignUpArgs = {
    authData: SignUpInput
}

export type MutationVerifyTokenArgs = {
    token: Scalars['String']['input']
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

export type OnboardedUser = {
    __typename?: 'OnboardedUser'
    body: BodyInfo
    bornDate: Scalars['String']['output']
    eatHabitGoal: Scalars['String']['output']
    email: Scalars['String']['output']
    firstName: Scalars['String']['output']
    gender: Scalars['String']['output']
    lastName: Scalars['String']['output']
    onboarded: Scalars['Boolean']['output']
    password: Scalars['String']['output']
    plan?: Maybe<Array<PlannedMeal>>
    token?: Maybe<Scalars['String']['output']>
    username: Scalars['String']['output']
}

export type PlannedMeal = {
    __typename?: 'PlannedMeal'
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
    getUser?: Maybe<User>
}

export type QueryGetUserArgs = {
    id: Scalars['ID']['input']
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

export type StressRecords = {
    __typename?: 'StressRecords'
    stressRecords?: Maybe<Array<StressRecordData>>
    userEmail: Scalars['String']['output']
}

export type User = {
    __typename?: 'User'
    email: Scalars['String']['output']
    onboarded: Scalars['Boolean']['output']
    password: Scalars['String']['output']
    token?: Maybe<Scalars['String']['output']>
}

export type StressRecordData = {
    __typename?: 'stressRecordData'
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
    Int: ResolverTypeWrapper<Scalars['Int']['output']>
    Mutation: ResolverTypeWrapper<{}>
    OnboardData: OnboardData
    OnboardedUser: ResolverTypeWrapper<OnboardedUser>
    PlannedMeal: ResolverTypeWrapper<PlannedMeal>
    PlannedMealInput: PlannedMealInput
    Query: ResolverTypeWrapper<{}>
    SignInInput: SignInInput
    SignUpInput: SignUpInput
    StressRecords: ResolverTypeWrapper<StressRecords>
    String: ResolverTypeWrapper<Scalars['String']['output']>
    User: ResolverTypeWrapper<User>
    stressRecordData: ResolverTypeWrapper<StressRecordData>
    stressRecordDataInput: StressRecordDataInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    BodyDataInput: BodyDataInput
    BodyInfo: BodyInfo
    Boolean: Scalars['Boolean']['output']
    Float: Scalars['Float']['output']
    ID: Scalars['ID']['output']
    Int: Scalars['Int']['output']
    Mutation: {}
    OnboardData: OnboardData
    OnboardedUser: OnboardedUser
    PlannedMeal: PlannedMeal
    PlannedMealInput: PlannedMealInput
    Query: {}
    SignInInput: SignInInput
    SignUpInput: SignUpInput
    StressRecords: StressRecords
    String: Scalars['String']['output']
    User: User
    stressRecordData: StressRecordData
    stressRecordDataInput: StressRecordDataInput
}

export type BodyInfoResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['BodyInfo'] = ResolversParentTypes['BodyInfo']
> = {
    height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
    weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
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
    addStressRecord?: Resolver<
        ResolversTypes['StressRecords'],
        ParentType,
        ContextType,
        RequireFields<MutationAddStressRecordArgs, 'stressRecordData'>
    >
    onboard?: Resolver<
        ResolversTypes['OnboardedUser'],
        ParentType,
        ContextType,
        RequireFields<MutationOnboardArgs, 'onboardData'>
    >
    signIn?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationSignInArgs, 'authData'>
    >
    signOut?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationSignOutArgs, 'email' | 'password'>
    >
    signUp?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationSignUpArgs, 'authData'>
    >
    verifyToken?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<MutationVerifyTokenArgs, 'token'>
    >
}

export type OnboardedUserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['OnboardedUser'] = ResolversParentTypes['OnboardedUser']
> = {
    body?: Resolver<ResolversTypes['BodyInfo'], ParentType, ContextType>
    bornDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    eatHabitGoal?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    onboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    plan?: Resolver<
        Maybe<Array<ResolversTypes['PlannedMeal']>>,
        ParentType,
        ContextType
    >
    token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PlannedMealResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['PlannedMeal'] = ResolversParentTypes['PlannedMeal']
> = {
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
    getUser?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetUserArgs, 'id'>
    >
}

export type StressRecordsResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['StressRecords'] = ResolversParentTypes['StressRecords']
> = {
    stressRecords?: Resolver<
        Maybe<Array<ResolversTypes['stressRecordData']>>,
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
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    onboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type StressRecordDataResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['stressRecordData'] = ResolversParentTypes['stressRecordData']
> = {
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
    BodyInfo?: BodyInfoResolvers<ContextType>
    Mutation?: MutationResolvers<ContextType>
    OnboardedUser?: OnboardedUserResolvers<ContextType>
    PlannedMeal?: PlannedMealResolvers<ContextType>
    Query?: QueryResolvers<ContextType>
    StressRecords?: StressRecordsResolvers<ContextType>
    User?: UserResolvers<ContextType>
    stressRecordData?: StressRecordDataResolvers<ContextType>
}
