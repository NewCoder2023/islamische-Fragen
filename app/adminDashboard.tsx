import { StyleSheet } from "react-native";
import { View, SafeAreaView, Text } from "components/Themed";
import Colors from "constants/Colors";
import { useState } from "react";
import { TextInput, Pressable } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function adminDashboard() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (image) {
      const { data, error } = await supabase.storage
        .from("news_bucket")
        .upload(`IMAGE_${uuid.v4()}`, image);

      if (error) {
        console.error("Fehler beim Hochladen:", error);
      } else {
        console.log("Bild erfolgreich hochgeladen:", data);
      }
    }
  };

  const uploadTextFile = async () => {
    if (text) {
      const textBlob = new Blob([text], { type: "text/plain" });

      const { data, error } = await supabase.storage
        .from("news_bucket")
        .upload(`TXT_${uuid.v4()}.txt`, textBlob);

      if (error) {
        console.error("Fehler beim Hochladen:", error);
      } else {
        console.log("Textdatei erfolgreich hochgeladen:", data);
      }
    }
  };

  const uploadPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.type !== "cancel") {
      const fileUri = result.uri;

      const { data, error } = await supabase.storage
        .from("news_bucket")
        .upload(`PDF_${uuid.v4()}.pdf`, fileUri);

      if (error) {
        console.error("Fehler beim Hochladen:", error);
      } else {
        console.log("PDF-Datei erfolgreich hochgeladen:", data);
      }
    } else {
      console.log("PDF-Auswahl abgebrochen.");
    }
  };

  const post = async () => {
    await Promise.all([uploadTextFile(), uploadImage()]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectContainer}>
        <View style={styles.selectImage}>
          <EvilIcons name='image' size={50} color='black' onPress={pickImage} />
        </View>
        <View style={styles.selectData}>
          <AntDesign
            name='addfile'
            size={35}
            color='black'
            onPress={uploadPDF}
          />
        </View>
        <View style={styles.postContainer}>
          <Pressable style={styles.postButton}>
            <Text style={styles.postButtonText}>Posten</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={text}
          multiline
        />
      </View>
      <View style={styles.displaySelectedContainer}>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              contentFit='cover'
            />
          )}
        </View>
        <View style={styles.dataContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              contentFit='cover'
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 0.65,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: Colors.light.white,
    fontSize: 18,
    lineHeight: 28,
  },
  selectContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingRight: 20,
    marginHorizontal: 10,
    backgroundColor: "transparent",
  },
  postContainer: {
    marginLeft: 190,
  },
  postButton: {
    padding: 5,
    backgroundColor: "transparent",
  },
  postButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.link,
  },
  selectData: {
    backgroundColor: "transparent",
  },
  selectImage: {
    backgroundColor: "transparent",
  },
  displaySelectedContainer: {
    flex: 0.25,
  },
  dataContainer: {
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
  },
  image: {
    height: 130,
    width: 130,
    alignSelf: "center",
  },
});
