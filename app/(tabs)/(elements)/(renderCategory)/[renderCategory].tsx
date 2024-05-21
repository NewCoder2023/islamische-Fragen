import { View } from "components/Themed";
import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import RenderItems from "components/RenderItems";
import fetchTable from "components/fetchTable";
import { Stack } from "expo-router";
import RenderCategoryInformation from "components/RenderCategoryInformation";

export default function renderCategory() {
  const { category } = useLocalSearchParams<{
    category: string;
  }>();

  const { items, fetchError, table } = fetchTable(category);
  return (
    <View style={styles.container}>
      {/* Change header Title */}

      <Stack.Screen options={{ headerTitle: category }} />

      <RenderItems items={items} fetchError={fetchError} table={table} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
