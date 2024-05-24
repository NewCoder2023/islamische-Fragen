import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useDownload(
  key: string,
  headerTitle: string,
  question: string,
  answers?: any[],
  singleAnswer?: string
) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadedText, setDownloadedText] = useState<{
    question: string;
    headerTitle: string;
    singleAnswer?: string;
    answers?: string[];
  } | null>(null);

  // Load all Text from Storage
  useEffect(() => {
    loadDownloadedText();
  }, [key]);

   // Update if the data is different
   const updateDownload = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const currentData = { headerTitle, question, singleAnswer, answers };
      const currentDataString = JSON.stringify(currentData);
      
      // If exisiting and not the same then update!
      if (jsonValue && jsonValue !== currentDataString) {
        await AsyncStorage.setItem(key, currentDataString);
        console.log("Data updated successfully");
      }
    } catch (e) {
      console.error("Failed to update data:", e);
    }
  };
  

  const loadDownloadedText = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        setDownloadedText(JSON.parse(jsonValue));
        setIsDownloaded(true);
      } else {
        setDownloadedText(null);
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
        setIsDownloaded(false);
        setDownloadedText(null);
      } else {
        await AsyncStorage.setItem(
          key,
          JSON.stringify({ question, singleAnswer, answers })
        );
        Toast.show({
          type: "success",
          text1: "Text wird heruntergeladen!",
        });
        setIsDownloaded(true);
        setDownloadedText({ headerTitle, question, singleAnswer, answers });
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Fehler, bitte versuchen Sie es später erneut!",
      });
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
