import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const ADD_STRESS_RECORD_MUTATION = gql(`
mutation AddStressRecord($stressRecordData: StressRecordDataInput!) {
  addStressRecord(stressRecordData: $stressRecordData) {
    stressRecords {
      timestamp
      value
      note
    }
  }
}
`);

export const useAddStressRecord = () => {
  const [AddStressRecordMutation, AddStressRecordResult] = useMutation(
    ADD_STRESS_RECORD_MUTATION
  );
  return { AddStressRecordMutation, AddStressRecordResult };
};
