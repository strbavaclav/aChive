import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const EDIT_STRESS_RECORD_MUTATION = gql(`

mutation EditStressRecord($date: String!, $updatedRecord: StressRecordDataInput!) {
  editStressRecord(date: $date, updatedRecord: $updatedRecord) {
    timestamp
    value
    note
  }
}
`);

export const useEditStressRecord = () => {
  const [EditStressRecordMutation, EditStressRecordResult] = useMutation(
    EDIT_STRESS_RECORD_MUTATION
  );
  return { EditStressRecordMutation, EditStressRecordResult };
};
