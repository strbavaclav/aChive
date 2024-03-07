import { gql } from "gql/gql";

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($authData: SignInInput!) {
    signIn(authData: $authData) {
      _id
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
        _id
        mealName
        mealSize
        startTime
        endTime
      }
      shopping {
        prepDays
        prepStartTime
        prepEndTime
        shopDays
        shopStartTime
        shopEndTime
      }
    }
  }
`);
