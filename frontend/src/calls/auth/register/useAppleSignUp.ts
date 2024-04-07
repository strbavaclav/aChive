import { gql } from "gql/gql";

export const APPLE_SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation AppleSignUp($token: String!) {
    appleSignUp(token: $token) {
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
      notifications {
        plannerMealTime
        logMealTime
        listCreationTime
        shoppingTime
        logStressTime
      }
    }
  }
`);
