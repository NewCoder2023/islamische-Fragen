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
        <Citations />
        <View style={styles.mainContainer}>
          <View style={styles.categoryContainer}>
            <Categories
              category={"dua"}
              categoryDescriptions={"Dua"}
              imageSource={require("assets/images/dua.png")}
            />

            <Categories
              category={"ziyarat"}
              categoryDescriptions={"Ziyarat"}
              imageSource={require("assets/images/ziyarat.png")}
            />

            <Categories
              category={"imamMahdi"}
              categoryDescriptions={"Imam Mahdi (a.)"}
              imageSource={require("assets/images/imamMahdi.png")}
            />

            <Categories
              category={"ashura"}
              categoryDescriptions={"Ashura"}
              imageSource={require("assets/images/ashura.png")}
            />

            <Categories
              category={"gebete"}
              categoryDescriptions={"Gebete"}
              imageSource={require("assets/images/gebete.png")}
            />

            <Categories
              category={"tashibat"}
              categoryDescriptions={"Tasbihat"}
              imageSource={require("assets/images/tasbih.png")}
            />

            <Categories
              category={"munajat"}
              categoryDescriptions={"Munajat"}
              imageSource={require("assets/images/munajat.png")}
            />

            <Categories
              category={"heiligeMonate"}
              categoryDescriptions={"Heilige Monate"}
              imageSource={require("assets/images/heiligeMonate.png")}
            />

            <Categories
              category={"salawat"}
              categoryDescriptions={"Salawat"}
              imageSource={require("assets/images/salawat.png")}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    flex: 1,
  },
  mainContainer: {
    flex: 0.65,
    backgroundColor: "transparent",
  },
  categoryContainer: {
    flex: 1,
    marginTop: 30,
    paddingTop: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
  },
});
