import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DisplayText from "components/DisplayText";

export default function renderText(title, text) {
  return (
    <View style={styles.container}>
      <DisplayText title={title} text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
