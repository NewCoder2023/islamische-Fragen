import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchText(title: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [text, SetText] = useState<String[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      // Reset Error
      setFetchError("");
      const { data, error } = await supabase.from("*").select("title");

      // Error checking

      if (error) {
        setFetchError(
          "Elemente konnten nicht geladen werden.\n Überprüfen Sie bitte Ihre Internet Verbindung!"
        );
        SetText([]);
      }

      if (data) {
        const titles = data.map((item) => item.title);
        SetText(titles);
        setFetchError("");
      }
    };

    fetchItems();
  }, [title]);
  return {
    fetchError,
    text,
  };
}
