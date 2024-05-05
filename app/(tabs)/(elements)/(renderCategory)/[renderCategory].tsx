import { View, Text } from "components/Themed";
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
      <View style={styles.headerContainer}>
        <Stack.Screen options={{ headerTitle: category }} />
        <RenderCategoryInformation category={category} />
      </View>
      <View style={styles.itemContainer}>
        <RenderItems items={items} fetchError={fetchError} table={table} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.25,
  },
  itemContainer: {
    flex: 0.75,
  },
});
