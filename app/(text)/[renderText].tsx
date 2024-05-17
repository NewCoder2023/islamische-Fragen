import { View, Text } from "components/Themed";
import { StyleSheet, Pressable, Appearance } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import fetchText from "components/fetchText";
import Colors from "constants/Colors";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";
import { useIsChanging } from "components/favStore";
import Markdown from "react-native-markdown-display";
import { FlashList } from "@shopify/flash-list";
import { storeFavorites, getFavorites } from "components/manageFavorites";
import { useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";

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

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { text, fetchError } = fetchText(id, table);
  const { change } = useIsChanging();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadedText, setDownloadedText] = useState("");
  const key = `text-${id}-${table}`;
  const appColor = Appearance.getColorScheme();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const [bookmarks, setBookmarks] = useState({});

  const flashListRef = useRef<any>(null);

  useLayoutEffect(() => {
    const loadFavorites = async () => {
      const fav = await getFavorites();
      setFavorites(fav);
    };
    const loadDownloadedText = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue) {
          setDownloadedText(JSON.parse(jsonValue));
          setIsDownloaded(true);
        } else {
          setIsDownloaded(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const getBookmarks = async () => {
      try {
        const savedBookmarks = await AsyncStorage.getItem("Bookmarks");
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks));
        } else {
          setBookmarks({});
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadDownloadedText();
    loadFavorites();
    getBookmarks();
  }, [id, table]);

  const changeFavourite = async () => {
    if (
      favorites.some(
        (item) => item.table == table && item.id == id && item.isFavorite
      )
    ) {
      Toast.show({
        type: "error",
        text1: "Von Favoriten entfernt!",
      });

      const newFavorites = favorites.map((item) =>
        item.table == table && item.id == id
          ? { ...item, isFavorite: false }
          : item
      );
      setFavorites(newFavorites);
      await storeFavorites(newFavorites, change);
    } else {
      Toast.show({
        type: "success",
        text1: "Zu Favoriten hinzugefügt!",
      });

      const newFavorites = [
        ...favorites,
        {
          id: id,
          title: title,
          table: table,
          isFavorite: true,
        },
      ];
      setFavorites(newFavorites);
      await storeFavorites(newFavorites, change);
    }
  };

  const isInFavorites = useMemo(() => {
    return favorites.some(
      (item) => item.table === table && item.id === id && item.isFavorite
    );
  }, [favorites, table, id]);

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

  const download = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        await AsyncStorage.removeItem(key);
        Toast.show({
          type: "success",
          text1: "Text wurde aus dem Speicher entfernt!",
        });
        setIsDownloaded((prev) => !prev);
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(text));
        Toast.show({
          type: "success",
          text1: "Text wird heruntergeladen!",
        });
        setIsDownloaded((prev) => !prev);
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Fehler, bitte versuchen Sie es später erneut!",
      });
      console.log(e);
    }
  };

  const addToBookmark = async (index) => {
    
    const updatedBookmarks = { ...bookmarks, [index]: !bookmarks[index] };
    setBookmarks(updatedBookmarks);

    await AsyncStorage.setItem("Bookmarks", JSON.stringify(updatedBookmarks));
  };

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
                  onPress={download}
                />
              ) : (
                <Feather
                  name='download'
                  size={24}
                  color={colorScheme == "dark" ? "white" : "black"}
                  onPress={download}
                />
              )}

              <AntDesign
                name={isInFavorites ? "star" : "staro"}
                size={24}
                color={Colors.light.star}
                onPress={changeFavourite}
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
                onLongPress={() => addToBookmark(index)}
                style={[{
                  backgroundColor: bookmarks[index] ? "lightgreen" : "transparent",
                }, styles.bookmark]}
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
