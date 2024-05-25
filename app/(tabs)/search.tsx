import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { View, Text, SafeAreaView } from "components/Themed";
import { TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "constants/Colors";
import { useColorScheme } from "react-native";
import { useState } from "react";
import ItemSearch from "components/ItemSearch";
import { Feather } from "@expo/vector-icons";
import { coustomTheme } from "components/coustomTheme";
import { useRef, useEffect } from "react";

export default function TabOneScreen() {
  const [search, setSearch] = useState("");

  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SafeAreaView style={styles.container}>
        <View style={[styles.searchContainer, themeStyles.container]}>
          <AntDesign
            name='search1'
            size={20}
            color='grey'
            style={styles.searchIcon}
          />
          <Text style={styles.border}>|</Text>
          <TextInput
            style={[styles.searchField, themeStyles.text]}
            placeholder='Suche'
            placeholderTextColor={themeStyles.text.color}
            keyboardType='default'
            editable
            value={search}
            ref={searchInputRef}
            onChangeText={setSearch}
            onBlur={Keyboard.dismiss}
          />
          {search && (
            <Pressable onPress={() => setSearch("")}>
              <Feather
                name='x-circle'
                size={20}
                style={[styles.deleteIcon, themeStyles.text]}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.renderSearchContainer}>
          <ItemSearch search={search} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 15,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: Colors.dark.contrast,
  },
  searchIcon: {
    paddingLeft: 12,
  },
  deleteIcon: {
    paddingRight: 11,
    paddingVertical: 10,
  },
  border: {
    color: Colors.light.border,
    fontSize: 25,
    paddingLeft: 3,
    paddingBottom: 5,
    fontWeight: "100",
    alignSelf: "center",
  },
  searchField: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 12,
  },

  renderSearchContainer: {
    flex: 1,
 
  },
});
