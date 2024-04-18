import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DisplayText from "components/DisplayText";
import { useLocalSearchParams } from "expo-router";

export default function renderText() {
  
  const title = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <DisplayText title={title}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
