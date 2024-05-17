import { View, Text } from "components/Themed";
import { StyleSheet, Pressable, Appearance } from "react-native";
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

  const { text, fetchError } = fetchText(id, table);

  const key = `text-${id}-${table}`;
  const appColor = Appearance.getColorScheme();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const { bookmarks, toggleBookmark } = useBookmarks();
  const { favorites, toggleFavorite, isInFavorites } = useFavorites();
  const { isDownloaded, downloadedText, loadDownloadedText, toggleDownload } =
    useDownload(key, text);

  const flashListRef = useRef<any>(null);

  useLayoutEffect(() => {
    loadDownloadedText();
  }, [id, table]);

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeTextStyle =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  const textContentPerPage = useMemo(() => {
    if (!text && !downloadedText) return [];
    const content = downloadedText || text;
    return content.split("\n\n\n").filter((t) => t.trim() !== "");
  }, [text, downloadedText]);

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
      {fetchError && !isDownloaded && (
        <View style={styles.renderError}>
          <Text style={styles.errorText}>{fetchError}</Text>
        </View>
      )}
      {textContentPerPage.length < 0 && (
        <View style={styles.renderError}>
          <Text style={styles.errorText}>{fetchError}</Text>
        </View>
      )}
      {textContentPerPage.length > 0 && (
        <View style={styles.FlashContainer}>
          {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
            <Feather
              name='arrow-up-circle'
              size={35}
              color={colorScheme == "dark" ? "#45CE30" : "#009432"}
              style={styles.toTopButton}
              onPress={() => {
                flashListRef.current.scrollToOffset(true, 0);
              }}
            />
          )}
          <FlashList
            data={textContentPerPage}
            extraData={[appColor, bookmarks]}
            ref={flashListRef}
            onScroll={(event) => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
            renderItem={({ item, index }) => (
              <Pressable
                onLongPress={() => toggleBookmark(index)}
                style={[
                  {
                    backgroundColor: bookmarks[index]
                      ? "lightgreen"
                      : "transparent",
                  },
                  styles.bookmark,
                ]}
              >
                <View style={[styles.textContainer, themeContainerStyle]}>
                  <Markdown
                    style={{
                      body: {
                        ...themeTextStyle,
                        fontSize: 20,
                        lineHeight: 40,
                      },
                      heading1: { fontSize: 25, lineHeight: 40 },
                      heading2: {
                        ...themeTextStyle,
                        fontSize: 30,
                        lineHeight: 40,
                        textAlign: "center",
                      },
                      heading3: {
                        ...themeTextStyle,
                        fontSize: 30,
                        lineHeight: 40,
                        fontWeight: "bold",
                      },
                      heading4: {
                        ...themeTextStyle,
                        fontSize: 30,
                        lineHeight: 40,
                        textAlign: "center",
                        fontWeight: "bold",
                      },
                      heading5: {
                        ...themeTextStyle,
                        fontSize: 20,
                        lineHeight: 40,
                        textAlign: "center",
                      },
                    }}
                  >
                    {item}
                  </Markdown>

                  <Text style={styles.index}>{index + 1}</Text>
                </View>
              </Pressable>
            )}
            estimatedItemSize={100}
          />
        </View>
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
  textContainer: {
    flex: 1,
    marginBottom: 7,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
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
  text: {},
  index: {
    marginTop: 10,
    textAlign: "center",
  },
  pageNumber: {},
  separator: {},
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
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
  lightText: {
    color: Colors.light.text,
  },
  darkText: {
    color: Colors.dark.text,
  },
});
