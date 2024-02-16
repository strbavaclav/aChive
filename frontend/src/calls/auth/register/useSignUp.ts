import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

export const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($authData: SignUpInput!) {
    signUp(authData: $authData) {
      email
      password
      token
    }
  }
`);
