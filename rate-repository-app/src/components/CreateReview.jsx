import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import useCreateReview from "../hooks/useCreateReview";

import FormikTextInput from "./FormikTextInput";

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required("Repository Name is required. It's missing"),
  ownerName: yup.string().required("Owner Name is required. It's missing"),
  rating: yup.number().required("Rating is required and should be a number").min(0, 'The minimum rating can be 0')
  .max(100, 'The maximum rating can be 100'),
  text: yup.string(),
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

export const CreateReview = () => {
  const [createReview] = useCreateReview();
  let history = useHistory();

  const handleSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const { data } = await createReview({
        repositoryName,
        ownerName,
        rating,
        text,
      });
      const itemID = data?.createReview?.repositoryId;
      history.push(`/repository/${itemID}`);
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    repositoryName: "lombok",
    ownerName: "rzwitserloot",
    rating: 68,
    text: "awesome work!",
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
              name="repositoryName"
              placeholder="Repository Name"
              style={styles.textInput}
            />
            <FormikTextInput
              name="ownerName"
              placeholder="Owner Name"
              style={styles.textInput}
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating"
              style={styles.textInput}
            />
            <FormikTextInput
              name="text"
              placeholder="Write review here"
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

export default CreateReview;
