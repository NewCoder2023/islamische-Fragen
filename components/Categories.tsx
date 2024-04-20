import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import Colors from "constants/Colors";
import { Image } from "expo-image";
import { Platform } from "react-native";

export default function Categories() {
  return (
    <View>
      <View style={styles.container}>
        <Link href='/bittgebete' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Bittgebete</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/bittgebete.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/ashura' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Ashura</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/ashura.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/munajat' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Munajat</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/munajat.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/gebete' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Gebete</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/gebete.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/ziyarat' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Ziyarat</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/ziyarat.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/imamMahdi' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Imam Mahdi</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/imamMahdi.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/tasbihat' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Tashibat</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/tasbihat.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/salawat' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Salawat</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/salawat.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>

        <Link href='/heiligeMonate' asChild>
          <Pressable>
            <View style={styles.element}>
              <Text style={styles.elementText}>Heilige Monate</Text>
              <Image
                style={styles.elementIcon}
                source={require("assets/images/heiligeMonate.png")}
                contentFit='cover'
                transition={1000}
              />
            </View>
          </Pressable>
        </Link>
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
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        backgroundColor: "#fff",
      },
    }),
  },
  elementIcon: {
    width: 50,
    height: 50,
  },
  elementText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
