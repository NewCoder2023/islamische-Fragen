import { StyleSheet, Pressable, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Categories from "@/components/Categories";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerImage}
          source='/Users/hadielali/mustahab_app/mustahab/assets/images/headerImage2.jpeg'
          contentFit='cover'
          transition={1000}
        />
      </View>

      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.elementsContainer}
          contentContainerStyle={styles.scrollViewElements}
        >
          <Categories
            category={"bittgebete"}
            categoryDescriptions={"Bittgebet"}
          />
          <Categories
            category={"ziyarat"}
            categoryDescriptions={"Ziyarat (Audienzen)"}
          />
          <Categories
            category={"imamMahdi"}
            categoryDescriptions={"Imam Mahdi"}
          />
          <Categories category={"ashura"} categoryDescriptions={"Ashura"} />
          <Categories category={"gebete"} categoryDescriptions={"Gebete"} />
          <Categories
            category={"tashibat"}
            categoryDescriptions={"Tasbihat (Lobpreisungen)"}
          />
          <Categories
            category={"munajat"}
            categoryDescriptions={"Munajat (Anrufungen)"}
          />
          <Categories
            category={"heiligeMonate"}
            categoryDescriptions={"Heilige Monate"}
          />
          <Categories
            category={"salawat"}
            categoryDescriptions={"Salawat (Segenswünsche)"}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: "34%",
    marginTop: 1,
  },
  headerImage: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  elementsContainer: {
    flex: 1,
    marginTop: 12,
  },
  scrollViewElements: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 8,
    marginLeft: 8,
    gap: 10,
  },
});
