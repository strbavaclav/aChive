import { gql } from "gql/gql";

export const GET_USER_STATISTICS = gql(/* GraphQL */ `
  query Records {
    getStatistics {
      records {
        stress
        meal
      }
      chart {
        commit {
          date
          count
        }
        line {
          labels
          counts
        }
      }
      stressAvg
      streak
    }
  }
`);
