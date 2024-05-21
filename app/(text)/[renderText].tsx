import { View, Text } from "components/Themed";
import { StyleSheet, Pressable, Appearance, Platform } from "react-native";
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

  const { answers, fetchError } = fetchText(id, table);
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

  const flashListRef = useRef<any>(null);

  useLayoutEffect(() => {
    updateDownload();
    loadDownloadedText();
  }, [id, table]);

  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);

  console.log(answers);
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
        answers.map((answer, index) => (
          <View key={index} style={styles.answerContainer}>
            <View style={styles.marjaContainer}>
              <Text>{answer.marja}</Text>
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
        ))
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
    marginBottom: 7,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
  },
  marjaContainer: {},
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
