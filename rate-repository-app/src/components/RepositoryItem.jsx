import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 20,
    },
    flexView: {
      display: "flex",
      flexDirection: "row",
    },
    topRight: {
      flexShrink: 1,
      marginLeft: 20,
    },
    languageBlue: {
      color: "white",
      backgroundColor: "rgb(3, 102, 214)",
      borderRadius: 5,
      alignSelf: "flex-start",
      padding: 4,
      margin: 5,
    },
    itemBlock: {
      padding: 20
    }
  });
  const repo = item.item;
  return (
    <View style={styles.container}>
      <View style={styles.flexView}>
        <Image
          style={{ height: 50, width: 50 }}
          source={{ uri: repo.ownerAvatarUrl }}
        />
        <View style={styles.topRight}>
          <Text fontWeight="bold">{repo.fullName}</Text>
          <Text color="textSecondary">{repo.description}</Text>
          <Text color="primary" style={styles.languageBlue}>
            {repo.language}
          </Text>
        </View>
      </View>

      <View style={styles.flexView}>
        <View style={styles.itemBlock}>
          <Text fontWeight="bold">{repo.stargazersCount}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>

        <View style={styles.itemBlock}>
          <Text fontWeight="bold">{repo.forksCount}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>

        <View style={styles.itemBlock}>
          <Text fontWeight="bold">{repo.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>

        <View style={styles.itemBlock}>
          <Text fontWeight="bold">{repo.ratingAverage}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
