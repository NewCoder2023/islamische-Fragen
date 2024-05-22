import { View, Text } from "components/Themed";
import {
  StyleSheet,
  Pressable,
  Appearance,
  Platform,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import fetchText from "components/fetchText";
import Colors from "constants/Colors";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useIsChanging } from "components/favStore";
import Markdown from "react-native-markdown-display";
import { FlashList } from "@shopify/flash-list";
import { storeFavorites, getFavorites } from "components/manageFavorites";
import { useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import useBookmarks from "components/useBookmarks";
import useFavorites from "components/useFavorites";
import useDownload from "components/useDownload";
import { coustomTheme } from "components/coustomTheme";
import { Image } from "expo-image";
import Checkbox from "expo-checkbox";

export default function renderText() {
  const { id, table, title } = useLocalSearchParams<{
    id: string;
    table: string;
    title: string;
  }>();

  interface FavoriteItem {
    id: string;
    title: string;
    table: string;
    isFavorite: boolean;
  }

 

  const { question, answers, fetchError } = fetchText(id, table);
  const key = `text-${id}-${table}`;
  const appColor = Appearance.getColorScheme();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const { bookmarks, toggleBookmark } = useBookmarks(key);
  const { toggleFavorite, isInFavorites } = useFavorites();
  const {
    updateDownload,
    isDownloaded,
    downloadedText,
    loadDownloadedText,
    toggleDownload,
  } = useDownload(key, answers);
  const [marja, setMarja] = useState<string[]>([]);

  const flashListRef = useRef<any>(null);

  useLayoutEffect(() => {
    updateDownload();
    loadDownloadedText();
  }, [id, table]);

  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);


  const images = {
    sistani: require("assets/images/sistani.png"),
    khamenei: require("assets/images/khamenei.png"),
  };

  const marjaOptions = [
    { label: "Sayid al-Khamenei", value: "khamenei" },
    { label: "Sayid as-Sistani", value: "sistani" },
  ];

  const handleCheckboxChange = (value: string) => {
    setMarja((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };


  const filteredAnswers = marja.length
    ? answers.filter((answer) => marja.includes(answer.name))
    : [];

  return (
    <View style={styles.container}>
      {/* Change header Title */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.buttonsHeaderContainer}>
              {isDownloaded ? (
                <MaterialCommunityIcons
                  name='file-remove-outline'
                  size={24}
                  color={colorScheme == "dark" ? "white" : "black"}
                  onPress={toggleDownload}
                />
              ) : (
                <Feather
                  name='download'
                  size={24}
                  color={colorScheme == "dark" ? "white" : "black"}
                  onPress={toggleDownload}
                />
              )}

              <AntDesign
                name={isInFavorites(id, table) ? "star" : "staro"}
                size={24}
                color={Colors.light.star}
                onPress={() => toggleFavorite(id, table, title)}
              />
            </View>
          ),
          headerTitle: title,
        }}
      />
      {!answers.length ? (
        <View style={styles.renderError}>
          <Text style={styles.errorText}>{fetchError || "Loading..."}</Text>
        </View>
      ) : (
        <ScrollView style={styles.answerContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
          </View>
          <View style={styles.marjaChoiceContainer}>
            {marjaOptions.map((option) => (
              <View key={option.value} style={styles.marjaChoice}>
                <Checkbox
                  style={styles.marjaCheckbox}
                  value={marja.includes(option.value)}
                  onValueChange={() => handleCheckboxChange(option.value)}
                />
                <Text style={styles.marjaLable}>{option.label}</Text>
              </View>
            ))}
          </View>
          {filteredAnswers.map((answer, index) => (
            <View key={index} style={styles.answers}>
              <View style={styles.headerContainer}>
                <View style={styles.headerImage}>
                  <Image
                    source={images[answer.name]}
                    style={styles.image}
                    contentFit='cover'
                  />
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.marjaText}>{answer.marja}</Text>
                </View>
              </View>
              <Markdown
                style={{
                  body: {
                    ...themeStyles.text,
                    fontSize: 20,
                    lineHeight: 40,
                    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
                  },
                  heading1: {
                    fontSize: 25,
                  },
                  heading2: {
                    ...themeStyles.text,
                    fontSize: 30,
                    textAlign: "center",
                  },
                  heading3: {
                    ...themeStyles.text,
                    fontSize: 30,
                    fontWeight: "bold",
                  },
                  heading4: {
                    ...themeStyles.text,
                    fontSize: 30,
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                  heading5: {
                    ...themeStyles.text,
                    fontSize: 30,
                  },
                  heading6: {
                    ...themeStyles.text,
                    fontSize: 20,
                    textAlign: "center",
                  },
                }}
              >
                {answer.answer}
              </Markdown>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsHeaderContainer: {
    flexDirection: "row",
    gap: 15,
    backgroundColor: "transparent",
    marginLeft: 5,
  },
  FlashContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
  answerContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  questionContainer: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  questionText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  answers: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 15,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
  marjaChoiceContainer: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-around",
  },
  marjaChoice: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  marjaCheckbox: {},
  marjaLable: {
    marginTop: 5,
    paddingLeft: 5,
  },
  headerImage: {},
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  headerText: {},
  marjaText: {
    fontSize: 20,

    fontWeight: "bold",
  },

  bookmark: {
    paddingTop: 7,
  },
  toTopButton: {
    position: "absolute",
    top: 300,
    right: 10,
    zIndex: 1,
  },
  index: {
    marginTop: 10,
    textAlign: "center",
  },
  renderError: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
    color: Colors.light.error,
    textAlign: "center",
  },
});
