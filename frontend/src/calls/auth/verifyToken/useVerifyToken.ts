import { gql } from "gql/gql";

export const VERIFY_TOKEN_MUTATION = gql(/* GraphQL */ `
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token)
  }
`);
