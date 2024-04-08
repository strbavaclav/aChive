import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const DELETE_STRESS_RECORD_MUTATION = gql(`

mutation DeleteStressRecord($date: String!) {
    deleteStressRecord(date: $date)
  }
`);

export const useDeleteStressRecord = () => {
  const [DeleteStressRecordMutation, DeleteStressRecordResult] = useMutation(
    DELETE_STRESS_RECORD_MUTATION
  );
  return { DeleteStressRecordMutation, DeleteStressRecordResult };
};
