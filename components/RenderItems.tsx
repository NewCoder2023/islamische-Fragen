import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Appearance } from "react-native";
import { coustomTheme } from "./coustomTheme";

interface Item {
  id: number;
  title: string;
}

interface RenderItemsProps {
  items: Item[];
  fetchError?: string;
  table: string;
}

export default function RenderItems({
  items,
  fetchError,
  table,
}: RenderItemsProps) {
  const encodeTitle = (title: string) => {
    // Clean the title by trimming and removing new lines
    // Encode all characters with encodeURIComponent and manually encode parentheses since the cause trouble in the url
    const cleanedTitle = title.trim().replace(/\n/g, "");
    console.log(cleanedTitle);
    return encodeURIComponent(cleanedTitle)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
  };

  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);
  
  ;
 

  console.log(table);

  const appColor = Appearance.getColorScheme();
  return (
    <View style={styles.container}>
      {fetchError && (
        <View style={styles.renderError}>
          <Text style={[styles.errorText, themeStyles.error]}>{fetchError}</Text>
        </View>
      )}
      {items && (
        <View style={styles.itemsContainer}>
          <FlashList
            data={items}
            extraData={appColor}
            estimatedItemSize={63}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Link
                style={styles.FlashListItems}
                href={{
                  pathname: `/(text)/${encodeTitle(item.title)}`,
                  params: {
                    id: item.id,
                    table: table,
                    title: `${encodeTitle(item.title)}`,
                  },
                }}
                asChild
              >
                <Pressable>
                  <View style={[styles.renderItem, themeStyles.containerContrast]}>
                    <Text style={styles.itemText}>{item.title.trim()}</Text>
                    <Feather
                      name='arrow-right-circle'
                      size={25}
                      color={colorScheme == "light" ? "black" : "white"}
                    />
                  </View>
                </Pressable>
              </Link>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },

  itemsContainer: {
    flex: 1,
  },
  FlashListItems: {
    paddingTop: 15,
  },
  renderItem: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    borderWidth: 0.2,
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 20,
    lineHeight: 25,
  },
  renderError: {
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
    textAlign: "center",
  },
  
});
