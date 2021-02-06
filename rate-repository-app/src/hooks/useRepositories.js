import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ sortBy, searchKeyword, first }) => {
  const latestReview = { orderBy: "CREATED_AT", orderDirection: "DESC" };
  const highestRated = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
  const lowestRated = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };

  const orderVariables =
    sortBy === "latestReview"
      ? latestReview
      : sortBy === "highestRated"
      ? highestRated
      : sortBy === "lowestRated"
      ? lowestRated
      : null;

  const variables = { ...orderVariables, searchKeyword, first };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;


    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
