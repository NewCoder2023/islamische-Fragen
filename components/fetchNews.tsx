import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchNews() {
  const [fetchError, setFetchError] = useState<string>("");
  const [posts, SetPosts] = useState<any[]>([]);

  useEffect(() => {
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
        SetPosts([]);
      }

      if (data) {
        SetPosts(data);
        setFetchError("");
      }
    };

    fetchItems();
  }, []);
  return {
    fetchError,
    posts,
  };
}
