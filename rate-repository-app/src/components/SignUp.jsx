import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

import FormikTextInput from "./FormikTextInput";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required. It's missing"),
  password: yup.string().required("Password is required. It's missing"),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "It should match the password above")
    .required("Password is required"),
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

const SignUp = () => {
  const [createUser] = useSignUp();
  const [signIn] = useSignIn()
  const history = useHistory();

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({username, password})
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    username: "jenni",
    password: "password",
    verifyPassword: "password",
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
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
            />
            <FormikTextInput
              name="verifyPassword"
              placeholder="Verify password"
              secureTextEntry={true}
              style={styles.textInput}
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

export default SignUp;
