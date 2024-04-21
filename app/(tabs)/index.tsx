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
              contentFit='contain'
            />
            <Text style={styles.newsHeaderText}>Sayyid Maher El Ali</Text>
          </View>
          <View style={styles.newsContentTextContainer}>
            <Text style={styles.newsContentText}>
              Morgen ist Ramadan Morgen ist Ramadan Morgen ist Ramadan Morgen
              ist Ramadan Morgen ist Ramadan Morgen ist Ramadan Morgen ist
              Ramadan
            </Text>
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
    backgroundColor: Colors.light.background,
  },
  headerContainer: {
    flex: 0.1,
    marginTop: 20,
    marginHorizontal: 14,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 0.9,
    backgroundColor: Colors.light.background,
  },
  newsContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.light.white,
  },
  newsHeader: {
    backgroundColor: "transparent",
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
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  newsContentText: {
    backgroundColor: "transparent",
    fontSize: 18,
  },
  newsContentDataContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "transparent",
  },
});
