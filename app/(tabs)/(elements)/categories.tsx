import { StyleSheet, Platform, ImageBackground } from "react-native";
import { View } from "components/Themed";
import CategoryLinks from "components/CategoryLinks";
import { Image } from "expo-image";
export default function Category() {
  return (
    <View style={styles.container}>
      <Image
        source={require("assets/images/categoryBackgroundImage.jpeg")}
        style={styles.imageBackground}
        contentFit='cover'
      >
        {/* Main */}
        <View style={styles.categoryContainer}>
          <CategoryLinks />
        </View>
      </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    width: "100%",
    flex: 1,
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
