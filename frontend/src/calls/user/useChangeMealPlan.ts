import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const CHANGE_MEAL_PLAN_MUTATION = gql(`
mutation ChangeMealPlanMutation($newPlan: [ChangedMealInput!]) {
  changeMealPlan(newPlan: $newPlan) {
    plan {
      _id
      mealName
      mealSize
      startTime
      endTime
    }
  }
}
`);

export const useChangeMealPlan = () => {
  const [changeMealPlanMutation, changeMealPlanResult] = useMutation(
    CHANGE_MEAL_PLAN_MUTATION
  );
  return { changeMealPlanMutation, changeMealPlanResult };
};
