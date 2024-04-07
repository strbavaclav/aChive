import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const UPDATE_USER_DATA_MUTATION = gql(`
mutation UpdateUserData($newUserData: NewUserDataInput!) {
  updateUserData(newUserData: $newUserData) {
    email
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
    _id
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

export const useUpdateUserData = () => {
  const [updateUserDataMutation, updateUserDataResult] = useMutation(
    UPDATE_USER_DATA_MUTATION
  );
  return { updateUserDataMutation, updateUserDataResult };
};
