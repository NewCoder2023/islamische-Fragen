import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import EditScreenInfo from "components/EditScreenInfo";
import { Text, View } from "components/Themed";

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  return (
    <View style={styles.container}>
      {!isPresented && <Link href='../'>Dismiss</Link>}
      <View style={styles.impressumContainer}>
        <Text style={styles.impressumText}>
          Maher El Ali {"\n"}
          Straße {"\n"}
          Libanon {"\n"}
        </Text>
      </View>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  impressumContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  impressumText: {
    fontSize: 30,
    textAlign: "center",
  },
});
