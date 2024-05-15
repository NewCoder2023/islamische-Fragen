import { StyleSheet, Platform, ImageBackground } from "react-native";
import { View } from "components/Themed";
import CategoryLinks from "components/CategoryLinks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.categoryContainer}>
        <CategoryLinks />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#177245",
    justifyContent: "center",
    alignItems: "center",
  },

  categoryContainer: {
    marginRight: 5,
    marginLeft: 5,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderRadius: 30,
  },
});
