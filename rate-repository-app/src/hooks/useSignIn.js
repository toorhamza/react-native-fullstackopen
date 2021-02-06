import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useContext } from "react";

import { LOGIN } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();


  const signIn = async ({ username, password }) => {
    const loginResponse = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(loginResponse.data.authorize.accessToken);

    apolloClient.resetStore();
    return loginResponse;
  };

  return [signIn, result];
};

export default useSignIn;
