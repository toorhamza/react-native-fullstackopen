import { gql } from "apollo-boost";

import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword:$searchKeyword) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const IS_LOGGED_IN = gql`
query {
  authorizedUser {
    id
  username
  }
}
`;

export const SINGLE_REPO = gql`
query getSingleRepo($id: ID!) {
  repository(id: $id) {
    ...RepositoryDetails
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
  
}
${REPOSITORY_DETAILS}
`;