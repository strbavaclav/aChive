import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation Onboard($onboardData: OnboardData!) {
    onboard(onboardData: $onboardData) {
      email
      password
      token
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

export const useOnboard = () => {
  const [onboardMutation, onboardResult] = useMutation(SIGN_IN_MUTATION);
  return { onboardMutation, onboardResult };
};
