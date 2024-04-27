import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchNews() {
  const [fetchError, setFetchError] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("News")
      .select("*")
      .order("id", { ascending: false });

    // Error checking

    if (error) {
      setFetchError(
        "Neuigkeiten konnten nicht geladen werden.\n Überprüfen Sie bitte Ihre Internetverbindung!"
      );
      setPosts([]);
    }

    if (data) {
      setPosts(data);
      setFetchError("");
    }
  };
  useEffect(() => {
    fetchItems();

    const subscription = supabase
      .channel("News")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "News",
        },
        (payload) => {
          setPosts((prevPosts) => [payload.new, ...prevPosts]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe(); // Clean up subscription on component unmount
    };
  }, []);

  return {
    fetchError,
    posts,
  };
}
