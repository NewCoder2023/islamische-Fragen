import { StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { View, SafeAreaView, Text } from "components/Themed";
import { Image } from "expo-image";
import Colors from "constants/Colors";
import fetchNews from "components/fetchNews";
import { useColorScheme } from "react-native";
import { useAuthStore } from "components/authStore";
import { supabase } from "@/utils/supabase";
import Toast from "react-native-toast-message";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useRef, useMemo, memo } from "react";
import { useIsUpLoading } from "components/uploadingStore";
import { FlashList } from "@shopify/flash-list";
import { Appearance } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";

interface Post {
  id: number;
  title?: string;
  content?: string;
  imagePaths?: string;
}

export default function index() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    posts,
    fetchError,
    refetch,
    updateAvailable,
    applyUpdates,
    isFetching,
  } = fetchNews();
  const { isLoading } = useIsUpLoading();
  const { isLoggedIn } = useAuthStore();
  const scrollRef = useRef<any>();
  const colorScheme = useColorScheme();
  const appColor = Appearance.getColorScheme();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD_NEW_UPDATE = 5;
  const CONTENT_OFFSET_THRESHOLD_UP = 300;

  // Darkmode style change
  const themeErrorStyle = useMemo(
    () =>
      colorScheme === "light" ? styles.lightThemeError : styles.darkThemeError,
    [colorScheme]
  );

  const themeContainerStyle = useMemo(
    () =>
      colorScheme === "light" ? styles.lightContainer : styles.darkContainer,
    [colorScheme]
  );

  const themeButtonStyle = useMemo(
    () => (colorScheme === "light" ? styles.lightButton : styles.darkButton),
    [colorScheme]
  );

  const deletePost = (id: number) => {
    Alert.alert("Beitrag wirklich löschen?", "", [
      {
        text: "Abbrechen",
        style: "cancel",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Ja",
        onPress: () => removePost(id),
      },
    ]);

    const removePost = async (id: number) => {
      const { error } = await supabase.from("News").delete().eq("id", id);

      if (error) {
        Toast.show({
          type: "error",
          text1: "Fehler beim löschen eines Beitrags!",
          text2: "Versuch es später nochmal!",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Beitrag erfolgreich gelöscht!",
        });
      }
    };
  };

  // Update News on either reloading or pressing "Aktualisieren" button
  const updateNews = useCallback(() => {
    setRefreshing(true);

    if (contentVerticalOffset > CONTENT_OFFSET_THRESHOLD_NEW_UPDATE) {
      scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
    refetch()
      .then(() => applyUpdates())
      .catch((error) => {
        // Log error or set error state here
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [applyUpdates]);

  const renderItemsFlashList = ({ item }: { item: Post }) => {
    return (
      <View style={[styles.newsContainer, themeContainerStyle]}>
        <View style={styles.newsHeader}>
          <Image
            style={styles.newsImageMaher}
            source={require("assets/images/indexIconMaher.png")}
            contentFit='contain'
          />
          <Text style={styles.newsHeaderText}>Sayyid Maher El Ali</Text>
          {isLoggedIn ? (
            <FontAwesome
              name='trash-o'
              size={24}
              color={colorScheme == "dark" ? "#D63031" : "#BA2F16"}
              onPress={() => deletePost(item.id)}
            />
          ) : null}
        </View>
        <View style={styles.newsContentTextContainer}>
          {item.title && <Text style={styles.newsTitleText}>{item.title}</Text>}
          {item.content && (
            <Text style={styles.newsContentText}>{item.content}</Text>
          )}
          {item.imagePaths && item.imagePaths.length == 1 ? (
            <View style={styles.ImageContainer}>
              <Image
                style={styles.newsImageSingel}
                source={{
                  uri: item.imagePaths[0],
                }}
                recyclingKey={`${item}-${index}`}
              />
            </View>
          ) : item.imagePaths && item.imagePaths.length > 1 ? (
            (() => {
              const repeatCount = item.imagePaths ? item.imagePaths.length : 0;

              const characterCurrent = (
                <FontAwesome name='circle' size={10} color='black' />
              );
              const characterNext = (
                <FontAwesome name='circle-o' size={10} color='black' />
              );

              let displayImageCounter = new Array(repeatCount).fill(
                characterNext
              );
              return (
                <FlatList
                  horizontal
                  style={styles.FlatListImageStyle}
                  pagingEnabled
                  disableIntervalMomentum
                  showsHorizontalScrollIndicator={false}
                  decelerationRate='fast'
                  keyExtractor={(item, index) => `${item}-${index}`}
                  snapToInterval={screenWidth - 40} // Set this to the width of your images or adjusted width
                  snapToAlignment={"start"}
                  data={item.imagePaths}
                  renderItem={({ item, index }) => {
                    displayImageCounter.fill(characterNext);
                    displayImageCounter[index] = characterCurrent;

                    return (
                      <View style={styles.ImageContainer}>
                        <Image
                          style={styles.newsImageSeveral}
                          source={{
                            uri: item,
                          }}
                          recyclingKey={`${item}-${index}`}
                        />
                        {repeatCount > 1 ? (
                          <View style={styles.ImageContainerFooter}>
                            {displayImageCounter.map((icon, index) => (
                              <Text
                                key={index}
                                style={styles.ImageContainerFooterIcons}
                              >
                                {icon}
                              </Text>
                            ))}
                          </View>
                        ) : null}
                      </View>
                    );
                  }}
                />
              );
            })()
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Neuigkeiten</Text>
        {isLoggedIn ? (
          <Link href='/adminDashboard' asChild>
            <Pressable>
              <MaterialIcons
                name='add-circle-outline'
                size={34}
                style={themeButtonStyle}
              />
            </Pressable>
          </Link>
        ) : null}
      </View>

      <View style={styles.mainContainer}>
        {isLoading ? (
          <View style={styles.activityContainer}>
            <Text style={styles.activityText}>
              Neuer Beitrag wird hochgeladen!
            </Text>
            <ActivityIndicator size='large' color='#009432' />
          </View>
        ) : null}
        {updateAvailable && (
          <View style={styles.updateContainer}>
            <Pressable style={styles.updateButton} onPress={() => updateNews()}>
              <Text style={styles.updateButtonText}>Aktualisieren</Text>
            </Pressable>
          </View>
        )}
        {posts.length == 0 && !fetchError ? (
          <View style={styles.renderError}>
            <Text style={styles.emptyText}>
              Es gibt derzeit noch keine {"\n"} Neugikeiten!
            </Text>
          </View>
        ) : null}

        {fetchError ? (
          <View style={styles.renderError}>
            <Text style={[styles.errorText, themeErrorStyle]}>
              {fetchError}
            </Text>
          </View>
        ) : (
          <View style={styles.FlashContainer}>
            {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD_UP && (
              <Pressable
                style={styles.toTopButton}
                onPress={() => {
                  scrollRef.current.scrollToOffset(true, 0);
                }}
              >
                <Feather
                  name='arrow-up-circle'
                  size={35}
                  color={colorScheme == "dark" ? "#45CE30" : "#009432"}
                />
              </Pressable>
            )}
            <FlashList
              ref={scrollRef}
              data={posts}
              extraData={[appColor, isLoggedIn]}
              renderItem={renderItemsFlashList}
              estimatedItemSize={118}
              keyExtractor={(item) => item.id.toString()}
              onRefresh={updateNews}
              refreshing={refreshing}
              onScroll={(event) => {
                setContentVerticalOffset(event.nativeEvent.contentOffset.y);
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    flex: 0.1,
    marginTop: 20,
    marginHorizontal: 14,
  },
  headerTitle: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
  },
  activityContainer: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activityText: {
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 0.9,
  },
  newsContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  newsHeader: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  newsImageMaher: {
    height: 30,
    width: 30,
  },
  newsHeaderText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  newsContentTextContainer: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  newsTitleText: {
    fontSize: 25,
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingBottom: 15,
  },
  newsContentText: {
    backgroundColor: "transparent",
    fontSize: 18,
    lineHeight: 28,
  },
  toTopButton: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 200,
    right: 10,
    zIndex: 1,
  },
  FlatListImageStyle: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "transparent",
    paddingLeft: 3.5,
  },
  ImageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  ImageContainerFooter: {
    marginTop: 15,
    padding: 5,
    flexDirection: "row",
    borderRadius: 30,
  },
  ImageContainerFooterIcons: {
    padding: 5,
  },
  newsImageSeveral: {
    width: screenWidth - 50,
    height: "auto",
    aspectRatio: 0.8,
    marginRight: 10,
  },
  newsImageSingel: {
    width: screenWidth - 50,
    height: "auto",
    aspectRatio: 0.8,
  },
  renderError: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  FlashContainer: {
    flex: 1,
  },
  emptyText: {
    fontSize: 25,
    lineHeight: 35,
    textAlign: "center",
    fontWeight: "bold",
  },
  updateContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  updateButton: {
    backgroundColor: "#2ecc71",
    borderWidth: 1,
    borderRadius: 30,
  },
  updateButtonText: {
    fontSize: 16,
    padding: 6,
    fontWeight: "bold",
    color: Colors.light.black,
  },
  lightThemeError: {
    color: Colors.light.error,
  },
  darkThemeError: {
    color: Colors.light.error,
  },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
  lightButton: {
    color: Colors.light.adButton,
  },
  darkButton: {
    color: Colors.dark.adButton,
  },
});
