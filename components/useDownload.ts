import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useDownload(key: string, text: string) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadedText, setDownloadedText] = useState("");

  // Load all Text from Storage
  useEffect(() => {
    loadDownloadedText();
  }, [key]);

  // If current text is in storage update it to make sure changes are in storage
  const updateDownload = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        await AsyncStorage.setItem(key, JSON.stringify(text));
      }
    } catch (e) {
      console.log(e);
    }
  };

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
  return {
    isDownloaded,
    downloadedText,
    loadDownloadedText,
    toggleDownload,
    updateDownload,
  };
}
