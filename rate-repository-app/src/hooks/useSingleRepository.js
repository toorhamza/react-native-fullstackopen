import { useQuery } from "@apollo/react-hooks";

import { SINGLE_REPO } from "../graphql/queries";

const useSingleRepository = ({ id }) => {
  const variables = { id };
  const { data, error, loading } = useQuery(SINGLE_REPO, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const repository = !loading ? data : null;

  return { repository };
};

export default useSingleRepository;
