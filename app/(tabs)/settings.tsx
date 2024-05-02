import { StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import Colors from "constants/Colors";
import { Link } from "expo-router";
import { Switch } from "react-native";
import { Appearance } from "react-native";
import { useState } from "react";

export default function settings() {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme == "dark");

  const toggleSwitch = () => {
    const changeColor = isDarkMode ? "light" : "dark";
    Appearance.setColorScheme(changeColor);
    setIsDarkMode(!isDarkMode);
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Dunkelmodus:</Text>
        <Switch
          trackColor={{ false: "#3e3e3e", true: "#4dd964" }}
          thumbColor={isDarkMode ? "#000000" : "#f4f3f4"}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
      <View style={styles.linkContainer}>
        <Link style={styles.linkText} href='/impressum'>
          Impressum
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 30,
  },
  switchText: {
    fontSize: 20,
    fontWeight: "700",
  },
  linkContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  linkText: {
    color: Colors.light.link,
    fontSize: 20,
    marginBottom: 20,
  },
});
