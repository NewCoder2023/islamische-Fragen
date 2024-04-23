import { StyleSheet, Platform, ImageBackground } from "react-native";
import { View, SafeAreaView, Text } from "components/Themed";
import { Image } from "expo-image";
import Colors from "constants/Colors";
import fetchNews from "components/fetchNews";
import { FlatList } from "react-native";
import fetchNewsImages from "components/fetchNewsImages";

export default function index() {
  const { items, fetchError } = fetchNews();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Neuigkeiten</Text>
      </View>

      <View style={styles.mainContainer}>
        {fetchError ? (
          <View style={styles.renderError}>
            <Text style={styles.errorText}>{fetchError}</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.newsContainer}>
                <View style={styles.newsHeader}>
                  <Image
                    style={styles.newsImageMaher}
                    source={require("assets/images/maher.jpg")}
                    contentFit='contain'
                  />
                  <Text style={styles.newsHeaderText}>Sayyid Maher El Ali</Text>
                </View>
                <View style={styles.newsContentTextContainer}>
                  {item.title && (
                    <Text style={styles.newsTitleText}>{item.title}</Text>
                  )}
                  {item.content && (
                    <Text style={styles.newsContentText}>{item.content}</Text>
                  )}
                  {item.imagePath && (
                    <View style={styles.newsImageContainer}>
                      <Image
                        style={styles.newsImage}
                        source={{
                          uri: item.imagePath,
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        )}
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
  newsImageMaher: {
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
  newsTitleText: {
    fontSize: 25,
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingBottom: 20,
  },
  newsContentText: {
    backgroundColor: "transparent",
    fontSize: 18,
  },
  newsImageContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "transparent",
  },
  newsImage: {
    width: "100%", // Beispielbreite in einer reaktionsfähigen Einheit
    height: undefined,
    aspectRatio: 0.8,
  },

  renderError: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
    color: Colors.light.error,
    textAlign: "center",
  },
});
