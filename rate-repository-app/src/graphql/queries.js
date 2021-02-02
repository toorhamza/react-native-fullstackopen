import { gql } from "apollo-boost";

import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories($orderBy: AllRepositoriesOrderBy) {
    repositories(orderBy: $orderBy) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;