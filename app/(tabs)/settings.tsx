import { StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import Colors from "constants/Colors";
import { Link } from "expo-router";
import { Switch } from "react-native";
import { Appearance } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { useSetFontSize } from "components/fontSizeStore";

export default function settings() {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme == "dark");
  const [selectSize, setSelectSize] = useState<number>();
  const { fontSize, setFontSize } = useSetFontSize();

  const toggleSwitch = () => {
    const changeColor = isDarkMode ? "light" : "dark";
    Appearance.setColorScheme(changeColor);
    setIsDarkMode(!isDarkMode);
  };

  const SizeOptions = [
    { label: "Groß", value: 25 },
    { label: "Mittel", value: 20 },
    { label: "Klein", value: 16 },
  ];

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

      <View style={styles.textSizeContainer}>
        <Text style={styles.textSizeText}>Schriftgröße: </Text>
        <View style={styles.textSizeElements}>
          {SizeOptions.map((option) => (
            <View key={option.value} style={styles.textSizeCheckboxContainer}>
              <Checkbox
                style={styles.textSizeCheckbox}
                value={fontSize === option.value}
                onValueChange={() => {
                  setSelectSize(option.value);
                  setFontSize(option.value);
                }}
              />
              <Text style={styles.checboxLable}>{option.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.spacer} />
      <View style={styles.informationContainer}>
        <Link style={styles.linkText} href='/information'>
          Über die App
        </Link>
      </View>
      <View style={styles.impressumContainer}>
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
  textSizeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
  },
  textSizeText: {
    fontSize: 20,
    fontWeight: "700",
  },
  textSizeElements: {},
  textSizeCheckbox: {
    marginBottom: 15,
  },
  textSizeCheckboxContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  checboxLable: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "700",
  },
  spacer: {
    flexGrow: 1,
  },
  informationContainer: {},
  impressumContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  linkText: {
    color: Colors.light.link,
    fontSize: 20,
    marginBottom: 20,
  },
});
