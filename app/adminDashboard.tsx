//dasboard-neu:
import { Keyboard, StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import Colors from "constants/Colors";
import { useState } from "react";
import { TextInput, Pressable, TouchableWithoutFeedback } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useIsUpLoading } from "components/uploadingStore";
import { useColorScheme } from "react-native";
import { ScrollView } from "react-native";

export default function adminDashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const { startLoading, finishLoading } = useIsUpLoading();
  const colorScheme = useColorScheme();
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;

  const uploadText = async (imageUrls) => {
    const { error } = await supabase
      .from("News")
      .insert({ title: title, content: content, imagePaths: imageUrls });

    if (error) {
      setContent("");
      return false;
    } else {
      setContent("");
      return true;
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
      return false;
    } else {
      const { data: urlData } = supabase.storage
        .from("News_bucket")
        .getPublicUrl(fileName);

      if (!urlData) {
        return false;
      } else {
        return urlData.publicUrl;
      }
    }
  };

  const submitPost = async () => {
    if (images.length === 0 && !content.trim()) {
      Toast.show({
        type: "error",
        text1: "Ein leerer Beitrag kann nicht erstellt werden!",
      });
      return;
    }
    startLoading();
    router.navigate("/");

    const uploadedImageUrls = await Promise.all(
      images.map((image) => uploadImage(image))
    );

    const validImageUrls = uploadedImageUrls.filter((url) => url != null);

    const textUploaded = await uploadText(validImageUrls);

    if (uploadedImageUrls && textUploaded) {
      Toast.show({
        type: "success",
        text1: "Beitrag erfolgreich hochgeladen!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Fehler beim erstellen des Beitrags!",
        text2: "Versuchen Sie es später nochmal!",
      });
    }
    finishLoading();
  };

  const pickImage = async () => {
    Keyboard.dismiss();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const deleteImage = (uri) => {
    setImages((currentImages) =>
      currentImages.filter((image) => image !== uri)
    );
  };

  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            style={[styles.headerInput, themeInputStyle]}
            onChangeText={setTitle}
            value={title}
            placeholder='Title (optional)'
            editable
            onSubmitEditing={Keyboard.dismiss}
          />

          <TextInput
            style={[styles.ContentInput, themeInputStyle]}
            onChangeText={setContent}
            value={content}
            placeholder='Beitrag'
            multiline
            editable
            autoCapitalize='none'
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>

        <View style={styles.imagesContainer}>
          <ScrollView
            contentContainerStyle={styles.imagesScrollViewContent}
            horizontal
          >
            {images.map((img, index) => (
              <View
                key={index.toString()}
                style={styles.images}
                onStartShouldSetResponder={() => true}
              >
                <Pressable
                  style={styles.deleteImage}
                  onPress={() => deleteImage(img)}
                >
                  <FontAwesome name='remove' size={21} color='red' />
                </Pressable>

                <Image
                  style={styles.image}
                  source={{ uri: img }}
                  contentFit='cover'
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    flex: 0.82,
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
    flex: 0.18,
    marginBottom: 20,
    marginTop: 15,
  },

  imagesScrollViewContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingEnd: 20,
  },
  images: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  deleteImage: {
    marginLeft: 100,
  },
  lightInput: {
    color: Colors.light.text,
  },
  darkInput: {
    color: Colors.dark.text,
  },
});
