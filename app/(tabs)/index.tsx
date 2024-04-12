import { StyleSheet, Platform, ImageBackground } from "react-native";
import { Text, View } from "components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "components/Categories";
import Citations from "components/Citations";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("assets/images/indexBackgroundImage.jpeg")}
        resizeMode='cover'
        style={styles.imageBackground}
      >
        {/* Header */}

        <View style={styles.headerContainer}>
          <Citations />
        </View>

        {/* Main */}
        <View style={styles.categoryContainer}>
          <Categories />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.35,
    backgroundColor: "transparent",
  },
  imageBackground: {
    width: "100%",
    flex: 1,
  },
  categoryContainer: {
    flex: 0.65,
    backgroundColor: "white",
    marginTop: 30,
    paddingTop: 30,
    borderWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
});
