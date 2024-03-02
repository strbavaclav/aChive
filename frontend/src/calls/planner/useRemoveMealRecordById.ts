import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const REMOVE_MEAL_RECORD_BY_ID_MUTATION = gql(`
mutation RemoveMealRecordById($recordId: String!, $userId: String!) {
  removeMealRecordById(recordId: $recordId, userId: $userId)
}
`);

export const useRemoveMealRecordById = () => {
  const [removeMealRecordByIdMutation, removeMealRecordByIdResult] =
    useMutation(REMOVE_MEAL_RECORD_BY_ID_MUTATION);
  return { removeMealRecordByIdMutation, removeMealRecordByIdResult };
};
