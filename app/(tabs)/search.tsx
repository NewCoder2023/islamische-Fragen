import { StyleSheet } from "react-native";
import { Text, View, SafeAreaView } from "components/Themed";
import { TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "constants/Colors";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign
          name='search1'
          size={20}
          color='grey'
          style={styles.searchIcon}
        />
        <Text style={styles.border}>|</Text>
        <TextInput
          style={styles.searchField}
          placeholder='Suche'
          keyboardType='default'
          editable
        />
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
    backgroundColor: Colors.light.white,
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
});
