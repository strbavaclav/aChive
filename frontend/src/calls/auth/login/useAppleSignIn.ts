import { gql } from "gql/gql";

export const APPLE_SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation AppleSignIn($token: String!) {
    appleSignIn(token: $token) {
      _id
      email
      token
      onboarded
      language
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
