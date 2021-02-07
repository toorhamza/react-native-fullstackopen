import React from "react";
import { ScrollView, View, FlatList, StyleSheet } from "react-native";

import useMyReviews from "../hooks/useMyReviews";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews, refetch } = useMyReviews();

  const myReviews = reviews?.edges;

  if (!myReviews) return null;
  return (
    <ScrollView>
      <FlatList
        data={myReviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(item) => <ReviewItem review={item} type="myReview" refetch={refetch} />}
      />
    </ScrollView>
  );
};

export default MyReviews;
