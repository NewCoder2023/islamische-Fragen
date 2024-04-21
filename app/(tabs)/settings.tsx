import { StyleSheet } from "react-native";
import { View, SafeAreaView } from "components/Themed";
import Colors from "constants/Colors";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.linkContainer}>
        <Link style={styles.linkText} href='/adminDashboard'>
          Admin Loggin
        </Link>
        <Link style={styles.linkText} href='/modal'>
          Impressum
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linkContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  linkText: {
    color: Colors.light.link,
    fontSize: 20,
    marginBottom: 20,
  },
});
