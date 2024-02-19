import { gql } from "gql/gql";

export const GET_USER_DATA_QUERY = gql(/* GraphQL */ `
  query GetUserData {
    getUserData {
      email
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
