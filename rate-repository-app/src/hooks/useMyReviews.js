import { useQuery } from "@apollo/react-hooks";

import { GET_REVIEWS } from "../graphql/queries";

const useSingleRepository = () => {
  const { data, refetch } = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
  });

  const reviews = data?.authorizedUser?.reviews;

  return {
    reviews, refetch
  };
};

export default useSingleRepository;
