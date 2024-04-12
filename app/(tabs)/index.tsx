import { StyleSheet, Platform, ImageBackground } from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/Categories";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [fetchError, setFetchError] = useState("");
  const [citations, setCitations] = useState<any[]>([]);
  const [citationIndex, setCitationIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("Citations").select();

      // Error checking

      if (error) {
        setFetchError(
          "Elemente konnten nicht geladen werden.\n Überprüfen Sie bitte, ob sie mit dem Internet verbunden sind!"
        );
        setCitations([]);
      }

      if (data) {
        setCitations(data);
        setFetchError("");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (citations && citationIndex < citations.length) {
      const timer = setInterval(() => {
        setCitationIndex((prevValue) => (prevValue + 1) % citations.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [citations.length]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/indexBackgroundImage.jpeg")}
        resizeMode='cover'
        style={styles.imageBackground}
      >
        <View style={styles.headerContainer}>
          {citations && citations.length > 0 ? (
            <View style={styles.citationContainer}>
              <Text style={styles.citationTextContent}>
                {citations[citationIndex].content}
              </Text>
              <Text style={styles.citationTextAuthor}>
                {citations[citationIndex].author}
              </Text>
            </View>
          ) : (
            <View style={styles.citationContainer}>
              <Text style={styles.citationTextContent}>
                Keine Zitate gefunden.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.categoryContainer}>
            <Categories
              category={"dua"}
              categoryDescriptions={"Dua"}
              imageSource={require("@/assets/images/dua.png")}
            />

            <Categories
              category={"ziyarat"}
              categoryDescriptions={"Ziyarat"}
              imageSource={require("@/assets/images/ziyarat.png")}
            />

            <Categories
              category={"imamMahdi"}
              categoryDescriptions={"Imam Mahdi (a.)"}
              imageSource={require("@/assets/images/imamMahdi.png")}
            />

            <Categories
              category={"ashura"}
              categoryDescriptions={"Ashura"}
              imageSource={require("@/assets/images/ashura.png")}
            />

            <Categories
              category={"gebete"}
              categoryDescriptions={"Gebete"}
              imageSource={require("@/assets/images/gebete.png")}
            />

            <Categories
              category={"tashibat"}
              categoryDescriptions={"Tasbihat"}
              imageSource={require("@/assets/images/tasbih.png")}
            />

            <Categories
              category={"munajat"}
              categoryDescriptions={"Munajat"}
              imageSource={require("@/assets/images/munajat.png")}
            />

            <Categories
              category={"heiligeMonate"}
              categoryDescriptions={"Heilige Monate"}
              imageSource={require("@/assets/images/heiligeMonate.png")}
            />

            <Categories
              category={"salawat"}
              categoryDescriptions={"Salawat"}
              imageSource={require("@/assets/images/salawat.png")}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    flex: 1,
  },

  headerContainer: {
    flex: 0.3,
    backgroundColor: "transparent",
  },
  citationContainer: {
    height: "auto",
    borderWidth: 1,
    padding: 10,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    maxHeight: "90%",
    borderRadius: 18,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        backgroundColor: "#fff",
      },
    }),
  },
  citationTextContent: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  citationTextAuthor: {
    marginTop: 30,
    paddingLeft: 5,
  },
  mainContainer: {
    flex: 0.7,
    backgroundColor: "transparent",
  },
  categoryContainer: {
    flex: 1,
    marginTop: 30,
    paddingTop: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
  },
});
