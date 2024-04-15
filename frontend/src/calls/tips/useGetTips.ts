import { gql } from "gql/gql";

export const GET_TIPS = gql(/* GraphQL */ `
  query GetTips {
    getTips {
      id
      cs {
        name
        description
        content
      }
      en {
        name
        description
        content
      }
      date
    }
  }
`);
