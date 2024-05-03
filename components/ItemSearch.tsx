import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import RenderSearch from "./RenderSearch";
import { useColorScheme } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Appearance } from "react-native";

const fetchAllTables = async () => {
  const { data, error } = await supabase.from("AllTables").select("tableName");

  if (error) {
    console.error("Error fetching tables:", error.message);
    return [];
  }
  return data;
};

const appColor = Appearance.getColorScheme();

const ItemSearch = ({ search }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (search === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const searchTables = async () => {
      const tables = await fetchAllTables();

      const results = await Promise.all(
        tables.map(async (table) => {
          const { data, error } = await supabase
            .from(table.tableName)
            .select("*")
            .ilike("title", `%${search}%`);

          if (error) {
            console.error(
              `Error searching in ${table.tableName}:`,
              error.message
            );
            return null;
          }

          if (data && data.length > 0) {

            return {
              table: table.tableName,
              items: data,
            };
          }

          return null;
        })
      );

      const filteredResults = results.filter((result) => result !== null);

      setSearchResults(filteredResults);
      setIsLoading(false);
    };

    setIsLoading(true);
    searchTables();
  }, [search]);

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Suche...</Text>
        </View>
      ) : search === "" ? null : searchResults.length > 0 ? (
        <View style={styles.searchContainer}>
          <FlashList
            data={searchResults}
            estimatedItemSize={63}
            extraData={appColor}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <RenderSearch items={item.items} table={item.table} />
            )}
          />
        </View>
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Leider konnten wir nichts finden!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    marginTop: 10,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 12,
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 12,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ItemSearch;
