import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";

interface Item {
  id: number;
  title: string;
  table: string;
}

interface RenderSearchProps {
  items: Item[];
  table: string;
}

const RenderSearch: React.FC<RenderSearchProps> = ({ items, table }) => {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const encodeTitle = (title: string) => {
    // Clean the title by trimming and removing new lines
    // Encode all characters with encodeURIComponent and manually encode parentheses since the cause trouble in the url
    const cleanedTitle = title.trim().replace(/\n/g, "");
    return encodeURIComponent(cleanedTitle)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
  };
  return (
    <View style={styles.container}>
      {items && (
        <View style={[styles.itemsContainer]}>
          {items.map((item) => (
            <Link
              style={styles.FlashListItems}
              key={`${item.table}-${item.id}`}
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
                <View style={[styles.renderItem, themeContainerStyle]}>
                  <Text style={styles.itemText}>{item.title.trim()}</Text>
                  <Feather
                    name='arrow-right-circle'
                    size={25}
                    color={colorScheme == "light" ? "black" : "white"}
                  />
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemsContainer: {
    flex: 1,
  },

  FlashListItems: {
    paddingTop: 15,
  },
  renderItem: {
    flexDirection: "row",
    padding: 20,
    borderWidth: 0.2,
    alignItems: "center",
  },

  itemText: {
    flex: 1,
    paddingRight: 20,
    lineHeight: 25,
    fontSize: 16,
    fontWeight: "bold",
  },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
});

export default RenderSearch;
