import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ sortBy, searchKeyword }) => {

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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {...orderVariables, searchKeyword},
    fetchPolicy: "cache-and-network",
  });

  const repositories = data?.repositories;
  /*  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    const response = await fetch('http://87.92.208.50:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories }; */
  return { repositories };
};

export default useRepositories;
