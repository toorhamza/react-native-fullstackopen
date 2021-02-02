import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
    padding: 10,
  },
});

const AppBarTab = ({ link, text }) => {
  return (
    <Link to={link} component={TouchableWithoutFeedback}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Link>
  );
};

export default AppBarTab;
