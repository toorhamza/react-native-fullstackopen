import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const registerResponse = await mutate({
      variables: { username, password },
    });
    return registerResponse;
  };

  return [createUser, result];
};

export default useSignUp;
