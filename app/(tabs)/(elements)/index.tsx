import { StyleSheet, Platform, ImageBackground } from "react-native";
import { View } from "components/Themed";
import Categories from "components/Categories";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("assets/images/indexBackgroundImage.jpeg")}
        resizeMode='cover'
        style={styles.imageBackground}
      >
        {/* Main */}
        <View style={styles.categoryContainer}>
          <Categories />
        </View>
      </ImageBackground>
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
