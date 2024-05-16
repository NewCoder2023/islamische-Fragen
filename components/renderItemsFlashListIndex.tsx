import React from "react";
import { FlatList } from "react-native";
import { View, Text } from "./Themed";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { deletePosts } from "components/deletePosts";
import { Dimensions } from "react-native";
import Colors from "constants/Colors";
import { StyleSheet } from "react-native";

interface RenderItemsFlashListProps {
  item: any;
  isLoggedIn: boolean;
  themeContainerStyle: object;
  colorScheme: "light" | "dark" | undefined | null;
}

export const RenderItemsFlashList = ({
  item,
  isLoggedIn,
  themeContainerStyle,
  colorScheme,
}: RenderItemsFlashListProps) => {
  const screenWidth = Dimensions.get("window").width;

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
            onPress={() => deletePosts(item.id)}
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
              contentFit='cover'
              style={styles.newsImageSingel}
              source={{ uri: item.imagePaths[0] }}
              recyclingKey={`${item.imagePaths[0]}`}
            />
          </View>
        ) : item.imagePaths && item.imagePaths.length > 1 ? (
          (() => {
            const repeatCount = item.imagePaths ? item.imagePaths.length : 0;

            const characterCurrent = (
              <FontAwesome
                name='circle'
                size={10}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            );
            const characterNext = (
              <FontAwesome
                name='circle-o'
                size={10}
                color={colorScheme == "dark" ? "white" : "black"}
              />
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
                        contentFit='cover'
                        style={styles.newsImageSeveral}
                        source={{ uri: item }}
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
    backgroundColor: "transparent",
    paddingLeft: 3.5,
  },
  ImageContainer: {
    marginTop: 20,
    marginBottom: 10,
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
    marginRight: 10,
    aspectRatio: 0.8,
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
