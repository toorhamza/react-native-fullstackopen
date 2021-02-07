import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { useHistory } from "react-router-dom";

import useDeleteReview from "../hooks/useDeleteReview";

import Text from "./Text";

const ReviewItem = ({ review, type, refetch }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 20,
    },
    flexView: {
      display: "flex",
      flexDirection: "row",
      margin: 10,
    },
    rating: {
      marginRight: 20,
      borderWidth: 1,
      borderColor: "#0366d6",
      position: "relative",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    rightBlock: {
      marginTop: 10,
    },
    review: {
      marginRight: 70,
    },
  });

  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  if (!review) return null;

  const { item } = review;
  const { node } = item;

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete it?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteReview({ id: node.id });
            refetch();
          },
        },
      ],
      { cancelable: false }
    );

  const parseDate = new Date(node.createdAt);
  const formattedDate = `${parseDate.getDate()}.${parseDate.getMonth()}.${parseDate.getFullYear()}`;
  return (
    <View style={styles.container}>
      <View style={styles.flexView}>
        <View style={styles.rating}>
          <Text
            style={{ position: "absolute", top: 14, left: 14 }}
            color="primary"
          >
            {node.rating}
          </Text>
        </View>
        <View>
          {type === "myReview" ? (
            <Text fontWeight="bold">{node.repository?.fullName}</Text>
          ) : (
            <Text fontWeight="bold">{node.user?.username}</Text>
          )}
          <Text color="textSecondary">{formattedDate}</Text>
          <View style={styles.review}>
            <Text>{node.text}</Text>
          </View>

          {type === "myReview" && (
            <View style={styles.flexView}>
              <Button
                onPress={() => history.push(`/repository/${node.repositoryId}`)}
                title="View Repository"
              />
              <Button
                onPress={createTwoButtonAlert}
                color="rgb(217, 39, 39)"
                title="Delete Review"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
