import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchNews() {
  const [fetchError, setFetchError] = useState<string>("");
  const [items, SetItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("News")
        .select("*")
        .order("created_at");

      // Error checking

      if (error) {
        setFetchError(
          "Neuigkeiten konnten nicht geladen werden.\n Überprüfen Sie bitte Ihre Internetverbindung!"
        );
        SetItems([]);
      }

      if (data) {
        SetItems(data);
        setFetchError("");
      }
    };

    fetchItems();
  }, []);
  return {
    fetchError,
    items,
  };
}
