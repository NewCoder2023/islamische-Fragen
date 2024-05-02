import { StyleSheet, Platform, ImageBackground } from "react-native";
import { View } from "components/Themed";
import CategoryLinks from "components/CategoryLinks";
import { LinearGradient } from "expo-linear-gradient";

export default function Category() {
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <CategoryLinks />
      </View>
    </View>
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
