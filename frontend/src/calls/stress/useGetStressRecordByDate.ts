import { gql } from "gql/gql";

export const GET_STRESS_RECORD_BY_DATE = gql(/* GraphQL */ `
  query GetStressRecordsByDate($date: String!) {
    getStressRecordsByDate(date: $date) {
      record {
        timestamp
        value
        note
      }
    }
  }
`);
