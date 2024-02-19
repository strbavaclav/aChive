import { gql } from "gql/gql";

export const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($authData: SignUpInput!) {
    signUp(authData: $authData) {
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
