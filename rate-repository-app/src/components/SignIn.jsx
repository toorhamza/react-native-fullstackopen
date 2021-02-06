import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import useSignIn from "../hooks/useSignIn";

import FormikTextInput from "./FormikTextInput";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required. It's missing"),
  password: yup.string().required("Password is required. It's missing"),
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 5,
    borderWidth: 1,
  },
  buttonSubmit: {
    padding: 1,
    marginTop: 7,
  },
});

export const LoginContainer = ({ handleSubmit }) => {
  const initialValues = {
    username: "kalle",
    password: "password",
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput
              name="username"
              placeholder="Username"
              style={styles.textInput}
              testID="usernameField"
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              testID="passwordField"
            />
            <View style={styles.buttonSubmit}>
              <Button
                testID="submitButton"
                onPress={handleSubmit}
                title="Submit"
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const Login = () => {
  const [signIn] = useSignIn();
  let history = useHistory();

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      history.push("/");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return <LoginContainer handleSubmit={handleSubmit} />;
};

export default Login;
