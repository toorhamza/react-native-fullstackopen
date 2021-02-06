import React, { useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useHistory } from "react-router-native";
import RNPickerSelect from "react-native-picker-select";

import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(item) => (
        <TouchableOpacity
          onPress={() => history.push(`/repository/${item.item.id}`)}
        >
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latestReview");
  const { repositories } = useRepositories({sortBy});

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => setSortBy(value)}
        items={[
          { label: "Highest Rated", value: "highestRated" },
          { label: "Lowest Rated", value: "lowestRated" },
          { label: "Latest Review", value: "latestReview" },
        ]}
      />
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
