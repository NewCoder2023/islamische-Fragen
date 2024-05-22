import { View } from "components/Themed";
import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import RenderItems from "components/RenderItems";
import fetchTable from "components/fetchTable";
import { Stack } from "expo-router";

export default function renderCategory() {
  const { category } = useLocalSearchParams<{
    category: string;

  }>();

  const endcodeTable = (title: string) => {
    // Clean the title by trimming and removing new lines
    // Encode all characters with encodeURIComponent and manually encode parentheses since the cause trouble in the url
    const cleandTable = title.trim().replace(/\n/g, "");
    return encodeURIComponent(cleandTable)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
  };

  const { items, fetchError, table } = fetchTable(category);
  console.log(items)
  return (
    <View style={styles.container}>
      {/* Change header Title */}

      <Stack.Screen options={{ headerTitle: category }} />

      <RenderItems items={items} fetchError={fetchError} table={endcodeTable(table)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});