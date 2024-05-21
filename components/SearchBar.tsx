import {
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
  } from "react-native";
  import { View, Text } from "components/Themed";
  import { TextInput } from "react-native";
  import { AntDesign } from "@expo/vector-icons";
  import Colors from "constants/Colors";
  import { useColorScheme } from "react-native";
  import { useState } from "react";
  import ItemSearch from "components/ItemSearch";
  import { Feather } from "@expo/vector-icons";
  import { coustomTheme } from "components/coustomTheme";
  
  export default function SearchBar() {
    const [search, setSearch] = useState("");
  
    const colorScheme = useColorScheme();
    const themeStyles = coustomTheme(colorScheme);
  
    return (
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
      backgroundColor: "tranparent",
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
      paddingVertical: 10,
    },
  
  });
  