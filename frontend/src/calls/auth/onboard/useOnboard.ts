import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation Onboard($onboardData: OnboardData!) {
    onboard(onboardData: $onboardData) {
      _id
      email
      onboarded
      language
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
      shopping {
        prepDays
        prepStartTime
        prepEndTime
        shopDays
        shopStartTime
        shopEndTime
      }
      notifications {
        plannerMealTime
        logMealTime
        listCreationTime
        shoppingTime
        logStressTime
      }
    }
  }
`);

export const useOnboard = () => {
  const [onboardMutation, onboardResult] = useMutation(SIGN_IN_MUTATION);
  return { onboardMutation, onboardResult };
};
