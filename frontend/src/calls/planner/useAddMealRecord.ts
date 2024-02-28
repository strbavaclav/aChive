import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const ADD_MEAL_RECORD_MUTATION = gql(`
mutation Mutation($userId: String!, $mealRecord: InputMealRecord!) {
  addMealRecord(userId: $userId, mealRecord: $mealRecord) {
    userId
    records {
      mealId
      loggedDateTime
      size
      description
      cooked
    }
  }
}
`);

export const useAddMealRecord = () => {
  const [addMealRecordMutation, addMealRecordResult] = useMutation(
    ADD_MEAL_RECORD_MUTATION
  );
  return { addMealRecordMutation, addMealRecordResult };
};
