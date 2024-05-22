import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Text, View } from "./Themed";
import { Link, LinkProps } from "expo-router";
import { Pressable } from "react-native";
import Colors from "constants/Colors";
import { Image } from "expo-image";
import { useColorScheme } from "react-native";
import { coustomTheme } from "./coustomTheme";

export default function Categories() {
  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);

  const categoriesLeft = [
    {
      name: "Rechtsfragen",
      image: require("assets/images/Rechtsfragen.png"),
      path: "(renderNestedCategories)/[renderNestedCategories]",
    },
    {
      name: "Glaubensfragen",
      image: require("assets/images/Glaubensfragen.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Quran",
      image: require("assets/images/Quran.png"),
      path: "(renderCategory)/[renderCategory]",
    },
  ];
  const categoriesRight = [
    {
      name: "Ethik",
      image: require("assets/images/Ethik.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Historie",
      image: require("assets/images/Historie.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Ratschläge",
      image: require("assets/images/Ratschlaege.png"),
      path: "(renderCategory)/[renderCategory]",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.leftElements}>
        {categoriesLeft.map((category, index) => (
          <View style={[styles.element, themeStyles.categorieBackground]}>
            <Link
              key={`${index}-left`}
              href={
                {
                  pathname: category.path,
                  params: {
                    category: category.name,
                  },
                } as any
              }
              asChild
            >
              <Pressable>
                <Image
                  style={styles.elementIcon}
                  source={category.image}
                  contentFit='contain'
                />
                <View style={[styles.textContainer, themeStyles.border]}>
                  <Text style={[styles.elementText, themeStyles.categorieText]}>
                    {category.name}
                  </Text>
                </View>
              </Pressable>
            </Link>
          </View>
        ))}
      </View>
      <View style={styles.rightElements}>
        {categoriesRight.map((category, index) => (
          <View style={[styles.element, themeStyles.categorieBackground]}>
            <Link
              key={`${index}-right`}
              href={
                {
                  pathname: category.path,
                  params: {
                    category: category.name,
                  },
                } as any
              }
              asChild
            >
              <Pressable>
                <Image
                  style={styles.elementIcon}
                  source={category.image}
                  contentFit='contain'
                />
                <View style={[styles.textContainer, themeStyles.border]}>
                  <Text style={[styles.elementText, themeStyles.categorieText]}>
                    {category.name}
                  </Text>
                </View>
              </Pressable>
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end", // Align children to the bottom
    backgroundColor: "transparent",
  },
  leftElements: {
    height: "98%",
    width: "50%",
    backgroundColor: "green",
    alignItems: "center",
  },
  rightElements: {
    height: "98%",
    width: "50%",
    backgroundColor: "blue",
    alignItems: "center",
  },

  element: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "33%",
    width: "90%",
    margin: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#eff8fc",
    justifyContent: "flex-end",
    paddingHorizontal: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  elementIcon: {
    width: "90%",
    height: "60%",
    alignSelf: "center",
  
  },
  textContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 5,
  },
  elementText: {
    fontSize: 11,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
    paddingHorizontal: 5,
  },
});
