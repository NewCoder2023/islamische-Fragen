import { View, Text } from "components/Themed";
import { StyleSheet, Pressable, Appearance } from "react-native";
import React, { useLayoutEffect, useState } from "react";
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
import useBookmarks from "components/useBookmarks";
import useFavorites from "components/useFavorites"; // Import the custom hook

export default function useDownload(key: string, text: string) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadedText, setDownloadedText] = useState("");

  const loadDownloadedText = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        setDownloadedText(JSON.parse(jsonValue));
        setIsDownloaded(true);
      } else {
        setDownloadedText("");
        setIsDownloaded(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleDownload = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        await AsyncStorage.removeItem(key);
        Toast.show({
          type: "info",
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
  return { isDownloaded, downloadedText, loadDownloadedText, toggleDownload };
}
