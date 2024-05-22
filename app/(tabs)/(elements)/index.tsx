import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import QuestionLinks from "components/QuestionLinks";
import { SafeAreaView } from "react-native-safe-area-context";
import { coustomTheme } from "components/coustomTheme";
import { useColorScheme } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Colors from "constants/Colors";
import { Dimensions } from "react-native";

export default function index() {
  const colorscheme = useColorScheme();
  const themeStyles = coustomTheme(colorscheme);

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, themeStyles.borderIndex]}>
        <View style={[styles.header, themeStyles.backgroundIndex]}>
          <View style={styles.headerElements}>
            <View style={styles.headerImageContainer}>
              <Image
                style={styles.headerImage}
                source={require("assets/images/logo.png")}
                contentFit='contain'
              />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerText, themeStyles.inverseText]}>
                Islam-Fragen
              </Text>
              <Text style={styles.headerDash}>__________</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <QuestionLinks />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "transparent",
  },
  headerContainer: {
    height: "40%",
    borderBottomWidth: 3,
  },
  header: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerElements: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerTextContainer: {
    marginTop: -30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  headerImageContainer: {
    height: "75%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerDash: {
    fontSize: 20,
    marginTop: -10,
  },
  headerText: {
    fontSize: 40,
  },

  headerImage: {
    width: "100%", // Take full width of the container
    height: "100%",
  },
  searchContainer: {
    width: "100%",
    position: "absolute",
    top: "70%",
    backgroundColor: "transparent",
  },
  search: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "blue",
  },
  searchIcon: {
    paddingLeft: 12,
  },
  border: {
    color: Colors.dark.border,
    fontSize: 25,
    paddingLeft: 3,
    paddingBottom: 5,
    fontWeight: "100",
    alignSelf: "center",
  },
  seachText: {
    paddingLeft: 5,
    fontSize: 16,
  },
  searchField: {},
  categoryContainer: {
    height: "60%",
    
  },
});
