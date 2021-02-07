import { useMutation } from "@apollo/react-hooks";

import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ id }) => {
      console.log(id)
    const delReview = await mutate({ variables: { id } });
    console.log(delReview)

    return delReview;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
