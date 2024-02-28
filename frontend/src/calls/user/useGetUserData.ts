import { gql } from "gql/gql";

export const GET_USER_DATA_QUERY = gql(/* GraphQL */ `
  query GetUserData {
    getUserData {
      _id
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
        _id
        mealName
        mealSize
        startTime
        endTime
      }
    }
  }
`);
