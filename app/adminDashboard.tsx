import { StyleSheet } from "react-native";
import { View, SafeAreaView, Text } from "components/Themed";
import Colors from "constants/Colors";
import { useEffect, useState } from "react";
import { TextInput, Pressable } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function adminDashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [storageURL, setStorageURL] = useState("");

  const uploadText = async (imagePath?: string) => {
    if (content == "") {
      Toast.show({
        type: "error",
        text1: "Ein leerer Beitrag kann nicht erstellt werden!",
      });
    } else {
      const { error } = await supabase
        .from("News")
        .insert({ title: title, content: content, imagePath: imagePath });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Fehler beim Erstellen eines Beitrags!",
          text2: "Versuch es später nochmal!",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Beitrag erfolgreich erstellt!",
        });
        setContent("");
        router.navigate("/");
      }
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    const fileExt = uri.split(".").pop();
    const fileName = `images/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("News_bucket")
      .upload(fileName, arrayBuffer, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      Toast.show({
        type: "error",
        text1: "Fehler beim Erstellen eines Beitrags!",
        text2: "Versuch es später nochmal!",
      });
    } else {
      const { data } = supabase.storage
        .from("News_bucket")
        .getPublicUrl(fileName);

      if (data) {
        setStorageURL(data.publicUrl);
      }
      Toast.show({
        type: "success",
        text1: "Beitrag erfolgreich erstellt!",
      });
      return data.publicUrl;
    }
  };

  const submitPost = async () => {
    if (content != "" && !image) {
      uploadText();
    } else if (content == "" && image) {
      uploadImage(image);
    } else if (content != "" && image) {
      try {
        const imageUrl = await uploadImage(image);

        if (imageUrl) {
          await uploadText(imageUrl);

          setContent("");
          router.navigate("/");
          Toast.show({
            type: "success",
            text1: "Beitrag erfolgreich erstellt!",
          });
        }
      } catch (error) {
        console.log("Error uploading post:", error);
        Toast.show({
          type: "error",
          text1: "Fehler beim Erstellen eines Beitrags!",
          text2: "Versuch es später nochmal!",
        });
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Submit button */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerButtons}>
              <Pressable onPress={pickImage}>
                <FontAwesome name='image' size={24} color='green' />
              </Pressable>

              <Pressable onPress={submitPost}>
                <Text style={styles.submitButtonText}>Erstellen</Text>
              </Pressable>
            </View>
          ),
        }}
      />

      <View style={styles.inputFieldsContainer}>
        <TextInput
          style={styles.headerInput}
          onChangeText={setTitle}
          value={title}
          placeholder='Title (optional)'
          editable
        />

        <TextInput
          style={styles.ContentInput}
          onChangeText={setContent}
          value={content}
          placeholder='Beitrag'
          multiline
          editable
        />
      </View>
      <View style={styles.imagesContainer}>
        {image && (
          <Pressable style={styles.deleteImage} onPress={deleteImage}>
            <FontAwesome name='remove' size={21} color='red' />
          </Pressable>
        )}
        <Image
          key={image}
          style={styles.image}
          source={{ uri: image }}
          contentFit='cover'
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "transparent",
    marginRight: -5,
  },
  submitButtonText: {
    fontSize: 20,
    color: Colors.light.link,
  },
  inputFieldsContainer: {
    flex: 1,
  },
  headerInput: {
    marginHorizontal: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
  },
  ContentInput: {
    flex: 1,
    maxHeight: "90%",
    marginHorizontal: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    paddingTop: 8,
    paddingBottom: 15,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    textAlignVertical: "top",
    lineHeight: 30,
  },
  imagesContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  deleteImage: {
    marginTop: 5,
    marginLeft: 110,
  },
});
