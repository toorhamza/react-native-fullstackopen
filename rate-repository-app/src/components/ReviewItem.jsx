import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "./Text";

const ReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 20,
    },
    flexView: {
      display: "flex",
      flexDirection: "row",
    },
    rating: {
      marginRight: 20,
      borderWidth: 1,
      borderColor: "#0366d6",
      position: "relative",
      width:50,
      height:50,
      borderRadius: 25
    },
    rightBlock: {
      marginTop: 10,
    },
    review: {    
        marginRight: 70
    }
  });

  if (!review) return null;

  const { item } = review;
  const { node } = item;

  const parseDate = new Date(node.createdAt);
  const formattedDate = `${parseDate.getDate()}.${parseDate.getMonth()}.${parseDate.getFullYear()}`;
  return (
    <View style={styles.container}>
      <View  style={styles.flexView} >
        <View  style={styles.rating} >
          <Text  style={{position:"absolute", top: 14, left: 14} } color="primary">{node.rating}</Text>
        </View>
        <View>
          <Text  fontWeight="bold">{node.user?.username}</Text>
          <Text color="textSecondary">{formattedDate}</Text>
          <View style={styles.review}>
          <Text>{node.text}</Text>
          </View>

        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
