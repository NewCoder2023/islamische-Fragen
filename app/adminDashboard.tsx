import { StyleSheet } from "react-native";
import { View, SafeAreaView } from "components/Themed";
import Colors from "constants/Colors";
import { Button } from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { v4 as uuidv4 } from "uuid";

export default function adminDashboard() {
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      // upload to Supabase
      const { data, error } = await supabase.storage
        .from("news_bucket")
        .upload(`IMAGE_${uuidv4()}`, result.assets[0].uri);

      if (error) {
        console.error("Fehler beim Hochladen:", error);
      } else {
        console.log("Bild erfolgreich hochgeladen:", data);
      }
    }
  };

  const uploadTextFile = async () => {
    // Textinhalt
    const textContent = "Hallo, Supabase!";

    // Konvertiere Text in ein Blob-Objekt
    const textBlob = new Blob([textContent], { type: "text/plain" });

    // Lade die Textdatei in Supabase Storage hoch
    const { data, error } = await supabase.storage
      .from("news_bucket") // Ersetze mit deinem Bucket-Namen
      .upload(`TXT_${uuidv4()}.txt`, textBlob);

    if (error) {
      console.error("Fehler beim Hochladen:", error);
    } else {
      console.log("Textdatei erfolgreich hochgeladen:", data);
    }
  };

  // Funktion zum Hochladen einer PDF-Datei
  const uploadPDF = async () => {
    // Wähle eine PDF-Datei aus
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf", // Der Mime-Typ für PDFs
      copyToCacheDirectory: true, // Die Datei wird in das Cache-Verzeichnis kopiert
    });

    if (result.type !== "cancel") {
      // Überprüfe, ob der Benutzer nicht abgebrochen hat
      const fileUri = result.assets[0].uri;

      // Lade die PDF-Datei in Supabase hoch
      const { data, error } = await supabase.storage
        .from("news_bucket") // Ersetze mit dem Bucket-Namen
        .upload(`PDF_${uuidv4()}.pdf`, fileUri); // Eindeutiger Dateiname

      if (error) {
        console.error("Fehler beim Hochladen:", error);
      } else {
        console.log("PDF-Datei erfolgreich hochgeladen:", data);
      }
    } else {
      console.log("PDF-Auswahl abgebrochen.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}></View>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
