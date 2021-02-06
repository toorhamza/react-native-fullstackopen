import { useMutation } from "@apollo/react-hooks";

import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const newReview = await mutate({ variables: {repositoryName, ownerName, rating, text} });

    return newReview;
  };

  return [createReview, result];
};

export default useCreateReview;
