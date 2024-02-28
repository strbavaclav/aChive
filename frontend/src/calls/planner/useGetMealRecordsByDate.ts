import { gql } from "gql/gql";

export const GET_MEAL_RECORDS_BY_DATE = gql(/* GraphQL */ `
  query GetMealRecordsByDate($userId: String!, $date: String!) {
    getMealRecordsByDate(userId: $userId, date: $date) {
      mealId
      loggedDateTime
      size
      description
      cooked
    }
  }
`);
