import { StyleSheet, Platform, ImageBackground } from "react-native";
import { View, SafeAreaView, Text } from "components/Themed";
import { Image } from "expo-image";
import Colors from "constants/Colors";

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}></View>

      <View style={styles.textContent}></View>
      <View style={styles.dataContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  titleContainer: {},

  textContent: {},
  dataContainer: {},
});
