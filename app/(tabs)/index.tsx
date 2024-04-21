import { StyleSheet, Platform, ImageBackground } from "react-native";
import { View, SafeAreaView, Text } from "components/Themed";
import { Image } from "expo-image";
import Colors from "constants/Colors";

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Neuigkeiten</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.newsContainer}>
          <View style={styles.newsHeader}>
            <Image
              style={styles.newsImage}
              source={require("assets/images/maher.jpg")}
              contentFit='cover'
            />
            <Text style={styles.newsHeaderText}>Sayyid Maher El Ali</Text>
          </View>
          <View style={styles.newsContentTextContainer}>
            <Text style={styles.newsContentText}>Morgen ist Ramadan</Text>
          </View>
          <View style={styles.newsContentDataContainer}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  headerContainer: {
    backgroundColor: "green",
    marginTop: 20,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "blue",
  },
  newsContainer: {
    flex: 1,
    borderWidth: 2,
    marginHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  newsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  newsImage: {
    height: 30,
    width: 30,
  },
  newsHeaderText: {
    fontSize: 15,
    fontWeight: "600",
  },
  newsContentTextContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  newsContentText: {},
  newsContentDataContainer: {},
});
