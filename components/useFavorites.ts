import { useLayoutEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useIsChanging } from "components/favStore";
import { storeFavorites, getFavorites } from "components/manageFavorites";

export default function useFavorites() {
  interface FavoriteItem {
    id: string;
    title: string;
    table: string;
    isFavorite: boolean;
  }

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const { change } = useIsChanging();

  useLayoutEffect(() => {
    const loadFavorites = async () => {
      const fav = await getFavorites();
      setFavorites(fav);
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (id: string, table: string, title: string) => {
    if (
      favorites.some(
        (item) => item.table == table && item.id == id && item.isFavorite
      )
    ) {
      Toast.show({
        type: "error",
        text1: "Von Favoriten entfernt!",
      });

      const newFavorites = favorites.map((item) =>
        item.table == table && item.id == id
          ? { ...item, isFavorite: false }
          : item
      );
      setFavorites(newFavorites);
      await storeFavorites(newFavorites, change);
    } else {
      Toast.show({
        type: "success",
        text1: "Zu Favoriten hinzugefügt!",
      });

      const newFavorites = [
        ...favorites,
        {
          id: id,
          title: title,
          table: table,
          isFavorite: true,
        },
      ];
      setFavorites(newFavorites);
      await storeFavorites(newFavorites, change);
    }
  };

  const isInFavorites = (id: string, table: string) => {
    return favorites.some(
      (item) => item.table === table && item.id === id && item.isFavorite
    );
  };
  return {
    favorites,
    toggleFavorite,
    isInFavorites,
  };
}
