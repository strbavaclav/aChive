import { gql } from "gql/gql";

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($authData: SignInInput!) {
    signIn(authData: $authData) {
      username
      email
      password
      token
    }
  }
`);
