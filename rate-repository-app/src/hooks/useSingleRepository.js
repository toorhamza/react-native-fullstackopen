import { useQuery } from "@apollo/react-hooks";

import { SINGLE_REPO } from "../graphql/queries";

const useSingleRepository = ({ id, first }) => {
  const variables = { id, first };
  const { data, loading, fetchMore, ...result } = useQuery(SINGLE_REPO, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const pageInfo = data && data.repository.reviews.pageInfo
    const canFetchMore =!loading && data && pageInfo.hasNextPage;


    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: SINGLE_REPO,
      variables: {
        after: pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    ...result,
  };
};


export default useSingleRepository;
