import { gql } from 'apollo-boost';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    url
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    description
    language
  }
`;
