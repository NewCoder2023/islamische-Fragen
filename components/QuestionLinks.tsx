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

  const categories = [
    {
      name: "Recht",
      image: require("assets/images/rechtsfragen.png"),
      path: "(renderNestedCategories)/[renderNestedCategories]",
    },
    {
      name: "Glaube",
      image: require("assets/images/glaubensfragen.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Quran",
      image: require("assets/images/quran.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Ethik",
      image: require("assets/images/ethischeFragen.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Historie",
      image: require("assets/images/historischeFragen.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Ratschläge",
      image: require("assets/images/ratschlaege.png"),
      path: "(renderCategory)/[renderCategory]",
    },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
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
            <View style={[styles.element, themeStyles.container]}>
              <Text style={styles.elementText}>{category.name}</Text>
              <Image
                style={styles.elementIcon}
                source={category.image}
                contentFit='cover'
              />
            </View>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  element: {
    width: 80,
    height: 80,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    margin: 10,
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
  elementText: {
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
