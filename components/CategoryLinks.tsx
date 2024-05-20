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
      name: "Bittgebete",
      image: require("assets/images/bittgebete.png"),
      path: "(renderNestedCategories)/[renderNestedCategories]",
    },
    {
      name: "Aschura",
      image: require("assets/images/aschura.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Munajat",
      image: require("assets/images/munajat.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Gebete",
      image: require("assets/images/gebete.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Ziyarat",
      image: require("assets/images/ziyarat.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Imam Mahdi",
      image: require("assets/images/imamMahdi.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Tasbihat",
      image: require("assets/images/tasbihat.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Salawat",
      image: require("assets/images/salawat.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Heilige Monate",
      image: require("assets/images/heiligeMonate.png"),
      path: "(renderNestedCategories)/[renderNestedCategories]",
    },
  ];

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  element: {
    width: 90,
    height: 90,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingTop: 10,
    paddingBottom: 10,

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
    fontSize: 14,
    fontWeight: "bold",
  },
  lightContainer: {
    backgroundColor: Colors.light.white,
  },
  darkContainer: {
    backgroundColor: Colors.dark.contrast,
  },
});
