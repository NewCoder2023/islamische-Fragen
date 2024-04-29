import { StyleSheet } from "react-native";
import { Text, View, SafeAreaView } from "components/Themed";
import { TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "constants/Colors";
import { useColorScheme } from "react-native";
import { useState } from "react";
import ItemSearch from "components/ItemSearch";

export default function TabOneScreen() {
  const [search, setSearch] = useState("");

  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeInputText =
    colorScheme === "light" ? styles.lightInputText : styles.darkInputText;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.searchContainer, themeContainerStyle]}>
        <AntDesign
          name='search1'
          size={20}
          color='grey'
          style={styles.searchIcon}
        />
        <Text style={styles.border}>|</Text>
        <TextInput
          style={[styles.searchField, themeInputText]}
          placeholder='Suche'
          keyboardType='default'
          editable
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.renderSearchContainer}>
        <ItemSearch search={search} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 15,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: Colors.dark.contrast,
  },
  searchIcon: {
    paddingLeft: 12,
    paddingVertical: 10,
  },
  border: {
    color: Colors.light.border,
    fontSize: 25,
    paddingLeft: 3,
    paddingBottom: 4,
    fontWeight: "100",
    alignSelf: "center",
  },
  searchField: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 5,
    paddingVertical: 10,
  },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
  lightInputText: {
    color: Colors.light.text,
  },
  darkInputText: {
    color: Colors.dark.text,
  },
  renderSearchContainer: {
    flex: 1,
  },
});
