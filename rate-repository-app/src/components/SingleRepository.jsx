import React from "react";
import { useParams } from "react-router-native";
import { ScrollView, View, FlatList, StyleSheet } from "react-native";

import RepositoryItem from "./RepositoryItem";
import useSingleRepository from "../hooks/useSingleRepository";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useSingleRepository({ id: id, first: 3 });

  const reviews = repository?.reviews?.edges;

  const onEndReach = () => {
    fetchMore();
  };

  if (!repository) return null;
  return (
    <ScrollView>
      <RepositoryItem repository={repository} />
      <View style={styles.separator}></View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(item) => <ReviewItem review={item} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </ScrollView>
  );
};

export default SingleRepository;
