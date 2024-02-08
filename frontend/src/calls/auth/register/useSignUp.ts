import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($authData: SignUpInput!) {
    signUp(authData: $authData) {
      username
      email
      password
    }
  }
`);

export const useSignUp = () => {
  const [signUpMutation, signUpResult] = useMutation(SIGN_UP_MUTATION);
  return { signUpMutation, signUpResult };
};
