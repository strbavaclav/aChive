import { gql } from "gql/gql";

export const RESET_USER_RECORDS_MUTATION = gql(/* GraphQL */ `
  mutation ResetUserRecords {
    resetUserRecords
  }
`);
