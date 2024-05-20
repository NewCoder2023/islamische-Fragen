//dasboard-neu:
import { Keyboard, StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import Colors from "constants/Colors";
import { TouchableWithoutFeedback } from "react-native";

import { Stack } from "expo-router";

import { useColorScheme } from "react-native";

import { coustomTheme } from "components/coustomTheme";
export default function adminDashboard() {
  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);

  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Submit button */}
        <Stack.Screen options={{ headerTitle: "Neue Frage stellen" }} />
        <View style={styles.contactContainer}></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactContainer:{},
});
