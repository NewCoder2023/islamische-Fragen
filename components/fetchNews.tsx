import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  // weitere Felder je nach Schema Ihrer News-Tabelle
}


export default function fetchNews() {
  const [fetchError, setFetchError] = useState<string>("");
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchItems = async () => {
    try {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("News")
        .select("*")
        .order("id", { ascending: false });
        if (data) {
          setPosts(data as NewsItem[]); 
        } else {
          setPosts([]); 
        }
        setFetchError("");
    } catch (error) {
      setFetchError(
        "Neuigkeiten konnten nicht geladen werden.\n Überprüfen Sie bitte Ihre Internetverbindung!"
      );
      setPosts([]);
    } finally {
      setIsFetching(false);
    
    }
  };

  useEffect(() => {
    fetchItems();

    const subscription = supabase
      .channel("News")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "News" },
        (payload) => {
          setUpdateAvailable(true);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "News" },
        (payload) => {
          setUpdateAvailable(true);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const applyUpdates = () => {
    setUpdateAvailable(false);
  };

  return {
    fetchError,
    posts,
    refetch: fetchItems,
    updateAvailable,
    applyUpdates,
    isFetching,
  };
}
