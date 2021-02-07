import { gql } from "apollo-boost";

import { REPOSITORY_DETAILS,PAGE_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      pageInfo {
        ...PageDetails
      }
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
    }
  }
  ${PAGE_DETAILS}
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
  query getSingleRepo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews(first: $first, after: $after) {    
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
          cursor
        }
        pageInfo {
          ...PageDetails
        }
      }
    }
  }
  ${PAGE_DETAILS}
  ${REPOSITORY_DETAILS}
`;

export const GET_REVIEWS =  gql` {
  authorizedUser {
    id
    username
    reviews {
      edges {
        node {
          id
          rating
          text
          createdAt
          repositoryId
          repository {
            id
            fullName
          }
        }
      }
    }
  }
}

`;

