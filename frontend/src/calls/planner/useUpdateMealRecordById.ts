import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const UPDATE_MEAL_RECORD_BY_ID_MUTATION = gql(`
mutation UpdateMealRecordById($userId: String!, $recordId: String!, $updatedRecord: InputMealRecord!) {
  updateMealRecordById(userId: $userId, recordId: $recordId, updatedRecord: $updatedRecord) {
    userId
    records {
      _id
      mealId
      loggedDateTime
      size
      description
      cooked
    }
  }
}
`);

export const useUpdateMealRecordById = () => {
  const [updateMealRecordByIdMutation, updateMealRecordByIdResult] =
    useMutation(UPDATE_MEAL_RECORD_BY_ID_MUTATION);
  return { updateMealRecordByIdMutation, updateMealRecordByIdResult };
};
