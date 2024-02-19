import { gql } from "gql/gql";

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($authData: SignInInput!) {
    signIn(authData: $authData) {
      email
      token
      onboarded
      username
      firstName
      lastName
      gender
      bornDate
      body {
        height
        weight
      }
      eatHabitGoal
      plan {
        mealName
        mealSize
        startTime
        endTime
      }
    }
  }
`);
