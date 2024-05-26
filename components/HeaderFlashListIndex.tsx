import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import React from "react";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { coustomTheme } from "./coustomTheme";

const HeaderFlashListIndex = ({ isLoggedIn }: any) => {

  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme)
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Neuigkeiten</Text>
      {isLoggedIn ? (
        <Link href='/adminDashboard' asChild>
          <Pressable>
            <MaterialIcons
              name='add-circle-outline'
              size={34}
              style={themeStyles.addNewsButton}
            />
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
};

export default HeaderFlashListIndex;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 14,
  },
  headerTitle: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
  },
});
