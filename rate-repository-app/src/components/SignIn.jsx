import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

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
    borderWidth: 1
  },
  buttonSubmit: {
    padding: 1,
    marginTop: 7,
  },
});

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
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
            <View style={styles.buttonSubmit}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
