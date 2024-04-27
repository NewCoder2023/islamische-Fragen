import { StyleSheet, Pressable } from "react-native";
import { View, SafeAreaView, Text } from "components/Themed";
import { Image } from "expo-image";
import Colors from "constants/Colors";
import fetchNews from "components/fetchNews";
import { FlatList, useColorScheme } from "react-native";
import { useAuthStore } from "components/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function index() {
  const { posts, fetchError } = fetchNews();

  const colorScheme = useColorScheme();

  const themeErrorStyle =
    colorScheme === "light" ? styles.lightThemeError : styles.darkThemeErro;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const { isLoggedIn } = useAuthStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Neuigkeiten</Text>
        {isLoggedIn ? (
          <Link href='/adminDashboard' asChild>
            <Pressable>
              <MaterialIcons
                name='add-circle-outline'
                size={34}
                color='black'
              />
            </Pressable>
          </Link>
        ) : null}
      </View>

      <View style={styles.mainContainer}>
        {fetchError ? (
          <View style={styles.renderError}>
            <Text style={[styles.errorText, themeErrorStyle]}>
              {fetchError}
            </Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.newsContainer, themeContainerStyle]}>
                <View style={styles.newsHeader}>
                  <Image
                    style={styles.newsImageMaher}
                    source={require("assets/images/indexIconMaher.jpg")}
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
  },
  headerContainer: {
    flexDirection: "row",
    flex: 0.1,
    marginTop: 20,
    marginHorizontal: 14,
  },
  headerTitle: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 0.9,
  },
  newsContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
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

  lightThemeError: { color: Colors.light.error },
  darkThemeErro: { color: Colors.light.error },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
});
