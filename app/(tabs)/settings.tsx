import { StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import Colors from "constants/Colors";
import { Link } from "expo-router";
import { Switch } from "react-native";
import { Appearance } from "react-native";
import { useLayoutEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { useSetFontSize } from "components/fontSizeStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function settings() {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme == "dark");
  const [selectSize, setSelectSize] = useState<number>();
  const { fontSize, setLineHeigth, setFontSize } = useSetFontSize();

  // Save Font mode and Color mode in Asyncstorage
  useLayoutEffect(() => {
    const getColorMode = async () => {
      const colorMode = await AsyncStorage.getItem("ColorMode");
      if (colorMode) {
        setIsDarkMode(colorMode === "dark");
      } else {
        setIsDarkMode(colorMode === "dark");
      }
    };

    const getFontSetting = async () => {
      const storedFontSize = await AsyncStorage.getItem("fontSize");

      if (storedFontSize) {
        setSelectSize(Number(storedFontSize));
      }
    };
    getFontSetting();
    getColorMode();
  }, []);

  const toggleSwitchColor = () => {
    const changeColor = isDarkMode ? "light" : "dark";
    Appearance.setColorScheme(changeColor);
    saveSwitchStatus(changeColor);
    setIsDarkMode(!isDarkMode);
  };

  const toggleSwitchFont = async (lineHeight, fontSize) => {
    setLineHeigth(lineHeight);
    setSelectSize(fontSize);
    setFontSize(fontSize);
    await AsyncStorage.setItem("lineHeigth", JSON.stringify(lineHeight));
    await AsyncStorage.setItem("fontSize", JSON.stringify(fontSize));
  };

  const saveSwitchStatus = async (colorMode) => {
    await AsyncStorage.setItem("ColorMode", colorMode);
  };

  const SizeOptions = [
    { label: "Groß", fontSize: 25, lineHeight: 40 },
    { label: "Mittel", fontSize: 20, lineHeight: 40 },
    { label: "Klein", fontSize: 16, lineHeight: 30 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Dunkelmodus:</Text>
        <Switch
          trackColor={{ false: "#3e3e3e", true: "#4dd964" }}
          thumbColor={isDarkMode ? "#000000" : "#f4f3f4"}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitchColor}
          value={isDarkMode}
        />
      </View>

      <View style={styles.textSizeContainer}>
        <Text style={styles.textSizeText}>Schriftgröße: </Text>
        <View style={styles.textSizeElements}>
          {SizeOptions.map((option) => (
            <View
              key={option.fontSize}
              style={styles.textSizeCheckboxContainer}
            >
              <Checkbox
                style={styles.textSizeCheckbox}
                value={fontSize === option.fontSize}
                onValueChange={() => {
                  toggleSwitchFont(option.lineHeight, option.fontSize);
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
    alignItems: "flex-start",
    paddingLeft: 20,
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
    marginTop: 25,
  },
  textSizeText: {
    fontSize: 20,
    fontWeight: "700",
  },
  textSizeElements: {
    flexDirection: "row",
  },
  textSizeCheckbox: {
    marginBottom: 15,
  },
  textSizeCheckboxContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  checboxLable: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "700",
  },
  spacer: {
    flexGrow: 1,
  },
  informationContainer: {
    alignSelf: "center",
  },
  impressumContainer: {
    alignSelf: "center",
  },
  linkText: {
    color: Colors.light.link,
    fontSize: 20,
    marginBottom: 20,
  },
});
