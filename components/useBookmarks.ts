import { useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useBookmarks = (key: any) => {
  const [bookmarks, setBookmarks] = useState<{ [key: number]: boolean }>({});

  useLayoutEffect(() => {
  
    const getBookmarks = async () => {
      try {
        const savedBookmarks = await AsyncStorage.getItem(`Bookmarks: ${key}`);
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getBookmarks();
  }, [key]);

  const toggleBookmark = async (index: number) => {
    const updatedBookmarks = { ...bookmarks, [index]: !bookmarks[index] };
    setBookmarks(updatedBookmarks);
    await AsyncStorage.setItem(`Bookmarks: ${key}`, JSON.stringify(updatedBookmarks));
  };

  return { bookmarks, toggleBookmark };
};

export default useBookmarks;
