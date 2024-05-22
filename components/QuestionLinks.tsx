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
          <Link
            key={index}
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
              <View style={[styles.element, themeStyles.categorieBackground]}>
                <Image
                  style={styles.elementIcon}
                  source={category.image}
                  contentFit='cover'
                />
                <View style={[styles.textContainer, themeStyles.border]}>
                  <Text style={[styles.elementText, themeStyles.categorieText]}>
                    {category.name}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
      <View style={styles.rightElements}>
        {categoriesRight.map((category, index) => (
          <Link
            key={index}
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
              <View style={[styles.element, themeStyles.categorieBackground]}>
                <Image
                  style={styles.elementIcon}
                  source={category.image}
                  contentFit='cover'
                />
                <View style={[styles.textContainer, themeStyles.border]}>
                  <Text style={[styles.elementText, themeStyles.categorieText]}>
                    {category.name}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  leftElements: {},
  rightElements: {},

  element: {
    width: 110,
    height: 98,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#eff8fc",
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
    width: 40,
    height: 40,
  },
  textContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 8,
  },
  elementText: {
    fontSize: 11,
    fontWeight: "bold",
    padding: 5,
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 5,
  },
});
