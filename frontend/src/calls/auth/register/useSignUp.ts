import { gql } from "gql/gql";

export const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($authData: SignUpInput!) {
    signUp(authData: $authData) {
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
