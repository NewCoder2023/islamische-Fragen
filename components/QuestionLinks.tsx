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
      name: "Rechtsfragen",
      image: require("assets/images/Recht.png"),
      path: "(renderNestedCategories)/[renderNestedCategories]",
    },
    {
      name: "Glaubensfragen",
      image: require("assets/images/Glaube.png"),
      path: "(renderCategory)/[renderCategory]",
    },
    {
      name: "Quran",
      image: require("assets/images/Quran.png"),
      path: "(renderCategory)/[renderCategory]",
    },
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  element: {
    width: 110,
    height: 110,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
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
  }
});
