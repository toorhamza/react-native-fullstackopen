import React, { useContext } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/react-hooks";

import AppBarTab from "./AppBarTab";
import { IS_LOGGED_IN } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(IS_LOGGED_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const LogOutButton = () => (
      <TouchableWithoutFeedback onPress={handleSignOut}><Text style={{color:"white", padding: 10}}>Sign Out</Text></TouchableWithoutFeedback>
  )

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" text="Repositories" />
        {data?.authorizedUser !== null && <AppBarTab link="/create-review" text="Create Review" />}

        {data?.authorizedUser === null ? <AppBarTab link="/login" text="Sign In" /> : <LogOutButton />}
        {data?.authorizedUser === null && <AppBarTab link="/sign-up" text="Sign Up" />}


      </ScrollView>
    </View>
  );
};

export default AppBar;
